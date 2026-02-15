import * as api from '../api';
import { COMMENT,FETCH_POST,CREATE,FETCH_ALL,FETCH_BY_SEARCH,UPDATE,DELETE,START_LOADING,END_LOADING } from '../constants/actionTypes.js';

export const getPost=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const { data }=await api.fetchpost(id);
        dispatch({type:FETCH_POST,payload:data});
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

export const getPosts=(page)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}=await api.fetchposts(page);
        dispatch({type:FETCH_ALL,payload:data});
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostBySearch=(searchQuery)=>async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const { data:{data} } =await api.fetchPostBySearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH,payload:data});
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const createPost=(post)=>async(dispatch)=>{
    try {
        const {data}=await api.createPost(post);
        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
    try {
        const { data }=await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}
export const deletePost=(id)=>async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error);
    }
}
export const likePost=(id)=>async(dispatch)=>{
    try {
        const { data }=await api.likePost(id);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const commentPost=(value,id)=>async(dispatch)=>{
    try {
        const { data }=await api.comment(value,id);
        dispatch({type:COMMENT,payload:data});
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}