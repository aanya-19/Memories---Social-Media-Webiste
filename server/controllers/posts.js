import postMessage from '../models/postSchema.js';
import mongoose from 'mongoose';


export const getPost=async (req,res)=>{
    const { id }=req.params;
    try {
        const post=await postMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});

    }
}

export const getPosts=async (req,res)=>{
    const { page=1 }=req.query;
    try {
        const LIMIT=8;
        const total=await postMessage.countDocuments({});
        const startIndex=(Number(page)-1)*LIMIT;
        // sort by new post first - then put limit - and the no. of indexes to skip
        const posts= await postMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data:posts, numberOfPages:Math.ceil(total/LIMIT),currentPage:Number(page)});

    } catch (error) {
        res.status(404).json({message:error.message});

    }
}

// Query -> /posts?page=1 -> page=1
// PARAMS -> /posts/:id

export const getPostBySearch=async(req,res)=>{
    const { searchQuery, tags }=req.query;
    try {
        const title=new RegExp(searchQuery,'i');
        const posts=await postMessage.find({$or:[{title},{tags:{$in:tags.split(',')}} ]});
        res.json({data:posts});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const createPost=async (req,res)=>{
    const post= req.body;
    const newPost=new postMessage({...post, creator:req.userId,createdAt:new Date().toISOString()});
    console.log("Data received at backend:", post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const updatePost=async(req,res)=>{
    const { id:_id }=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');
    const updatePost =await postMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatePost);
}
export const deletePost=async (req,res)=>{
    const { id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that ID');
    await postMessage.findByIdAndDelete(id);
    res.json({message:'Post Deleted!'});
}
export const likePost=async(req,res)=>{
    const { id }=req.params;

    if(!req.userId)return res.status().json({message:'Unautheticated'});

    const post=await postMessage.findById(id);
    const index=post.likes.findIndex((id)=>id===String(req.userId));

    if(index===-1){
        // like the post
        post.likes.push(req.userId);
    }else{
        // dislike the post
        post.likes=post.likes.filter((id)=>id!==String(req.userId));
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that ID');


    const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);
}

export const commentPost=async(req,res)=>{
    const { id }=req.params;
    const { value }=req.body;

    const post=await postMessage.findById(id);
    post.comments.push(value);
    const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost);
}
