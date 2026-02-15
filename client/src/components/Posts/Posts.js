import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post.js'
import useStyles from './style.js';

const Posts=({setCurrentId})=>{
    const { posts,isLoading }= useSelector((state)=>{
        return state.posts;
    });
    const classes=useStyles();

    if(!posts.length && !isLoading){
      return 'NO POSTS';
    }
    return(
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
        )
    );
}
export default Posts;