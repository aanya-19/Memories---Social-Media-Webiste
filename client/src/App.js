import React,{useEffect,useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Navbar from './components/navBar/navBar.js';
import Home from './components/Home/Home.js';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';

const App=()=>{
    const user=JSON.parse(localStorage.getItem('profile'));

    return(
        <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Switch>
                <Route path="/" exact component={()=><Redirect to="/posts"  />} />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" component={PostDetails} />
                <Route path="/auth" exact component={()=>(!user?<Auth/> :<Redirect to='/posts' />) } />
            </Switch>
            
        </Container>
        </BrowserRouter>
    );
}

export default App;