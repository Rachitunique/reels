import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Insta from './Instaheading.PNG'
import backgroundr from './backgroundr.PNG'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      overflow: 'hidden',
     padding: theme.spacing(0, 3),
  },
  button: {
      margin: theme.spacing(1),
  },
  hallo: {
     width: 350,
  },
  paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  root1: {
      '& > *': {
        margin: theme.spacing(1),
        width: '45ch',
      },
  },
  root2: {
      '& > *': {
        margin: theme.spacing(14),
      },
  },
    input: {
      display: 'none',
    },
    root3: {
      '& > *': {
          margin: theme.spacing(18.5),
        },
    },
}));




function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    console.log('hi');
    //const kem = database.users('createdAt','desc')
    //let m = 
    e.preventDefault()
    try {
      console.log('Logging in user')
      setLoading(true)
      await login(email, password)
      setLoading(false)
      history.push('/')
    } catch {
      setError("Failed to log in")
      setTimeout(() => setError(''), 2000)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (currentUser) {
      history.push('/')
    }
  }, [])
  return (
    <div>
      <div style={{ position: "absolute", left: "200px", top: "20px" }}>
        <img src={backgroundr} />
      </div>
      <form onSubmit={handleSubmit} >
        <div style={{ position: "absolute", left: "800px", top: "100px" }}>
          <img src={Insta} />
        </div>
        <div style={{ position: "absolute", top: "170px", left: "700px" }}>
          <Paper className={classes.paper} >
            <Grid container wrap="nowrap">
              <Grid item xs>
                <TextField style={{ width: "400px" }} id="outlined-basic" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} type='email' variant="outlined" />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <TextField style={{ width: "400px" }} id="outlined-password-input" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" variant="outlined" />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <div className={classes.root3}>
                  <button type='submit' style={{ left: '200px' }} className={classes.input} disabled={loading} id="contained-button-file1" multiple>Sign up</button>
                  <label htmlFor="contained-button-file1">
                    <Button variant="contained" color="primary" component="span">
                      Log In
                    </Button>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {error ? <h1>{error}</h1> : <></>}
        </div>
      </form>
    </div>
  )
}

export default Login






















//import React,{useState,useContext, useEffect} from 'react'
//import { useHistory } from 'react-router-dom';
//import {AuthContext} from '../Context/AuthProvider';
//function Login() {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('')
//    const [error, setError] = useState("")
//    const [loading, setLoading] = useState(false);
//    const {login,currentUser} =useContext(AuthContext);
//    const history = useHistory();
//     const handleSubmit = async(e)=>{
//          console.log('hi');
//        e.preventDefault()
//        try {
//          console.log('Logging in user')
//          setLoading(true)
//          await login(email, password)
//          setLoading(false)
//          {/*after login push the feed component*/}
//          history.push('/')
//        } catch {
//          setError("Failed to log in")
//          setTimeout(()=>setError(''),2000)
//          setLoading(false)
//        }
//      }
      //agar mere pass currentuser hai(jo ki authprovider provide karta hai) use line 9 pe nikala to 
      //feed wala component render kar do(feed hi to / hai app.js pe hai) nhi to login ko hi dikhana hai
      //ab ye kaam ja ke jake signup pe bhi karna hai
//      useEffect(()=>{
//        if(currentUser)
//        {
          //redirect ek component ko phekta hai history ek function hai stack me stored / ko phekta hai in dono me bahut minute sa difference hota hai
          //mai localhost:3000/login karke jata tha login pe , ye kaam mera usehistory kar de rha hai
//          history.push('/')
//        }
//      },[])
//    return (
//        <div>
//              <form onSubmit={handleSubmit} >
//             <div>
//                <label htmlFor=''>Email</label>
//                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
//                </div>
//                <div>
//                <label htmlFor=''>Password</label>
//                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//                </div>
//                <button type='submit' disabled={loading}>Login</button>
//                {error?<h1>{error}</h1>:<></>}
//                </form>

//        </div>
 //   )
//}

//export default Login