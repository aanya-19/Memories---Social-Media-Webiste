import React,{ useEffect } from 'react';
import { Pagination,PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style.js';
import { getPosts } from '../actions/posts.js';

const Paginate=({page})=>{
    const { numberOfPages }=useSelector((state)=>state.posts);
    const classes=useStyles();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(page)dispatch(getPosts(page));
    },[page])

    return(
        <Pagination
        classes={{ul:classes.ul}}
        variant="outlined"
        color="primary"
        count={numberOfPages}
        page={Number(page)}
        renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
    )}
    />
    )
}
export default Paginate;