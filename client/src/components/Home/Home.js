import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form.js';
import Pagination from '../Pagination';
import useStyles from './style';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home=()=>{
    const classes = useStyles();
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    const query=useQuery();
    const history=useHistory();
    const searchQuery=query.get('searchQuery');
    const page=query.get('page') || 1;
    const [search, setSearch]=useState('');
    const [tags,setTags]=useState([]);

    const handleKeyPress=(e)=>{
        if(e.keyCode===13){
            //search post
            searchPost();
        }
    };

    const searchPost=()=>{
        if(search.trim() || tags){
            // dispatch-> fetch search post
            dispatch(getPostBySearch({search,tags:tags.join(',')}));
            history.push(`/posts/search?searchQuery=${ search || 'none' }&tags=${tags.join(',')}`);
        }
        else{
            history.push('/');
        }
    }

    const handleAdd=(tag)=>setTags([...tags,tag]);
    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

    return(
        <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories" 
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => {setSearch(e.target.value)}} 
                                />
                                <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                                />
                                <Button  onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper>
                                <Pagination page={page} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
        </Grow>
    );
}
export default Home;