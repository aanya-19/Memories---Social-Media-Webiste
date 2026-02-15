import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import useStyles from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes.js';
import { useHistory } from 'react-router-dom';
import { signup,signin } from '../../actions/auth.js';

const initialData={firstName:'', lastName:'', email:'', password:'',confirmPassword:''};

const Auth = () => {
    const classes = useStyles();
    const state=null;
    const dispatch=useDispatch();
    const history = useHistory();
    const [isSignup,setisSignup]=useState(true);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialData);

    const handleSubmit=(e)=>{
      e.preventDefault();
      // console.log(formData);
      if(isSignup){
        dispatch(signup(formData,history));
      }
      else{
        dispatch(signin(formData,history));
      }
    };

    const handleShowPassword=()=>{
        setShowPassword((prevState)=>!prevState);
    };

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    };

    const switchMode=()=>{
        setisSignup((prev)=>!isSignup);
        setShowPassword(false);
    };

    const googleSuccess=(credentialResponse)=>{
      const token =credentialResponse.credential;
      const result = jwtDecode(token);
      try {
        dispatch({ type: AUTH, data: { result, token } });
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    };

    return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
          onSuccess={googleSuccess}
          onError={() => {
            console.log('Google Login Failed');
          }}/>
          <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
          </Button>
          </form>
        </Paper>
    </Container>
  );
};

export default Auth;
