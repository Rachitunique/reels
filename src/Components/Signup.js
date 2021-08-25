import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from '../firebase';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import style from './Signup.Module.css';
import Insta from './Instaheading.PNG'
import backgroundr from './backgroundr.PNG'

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


function Signup() {
    const classes = useStyles();
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const [file,setFile] = useState(null)
    const {signup,currentUser} =useContext(AuthContext);
    const handleSignup =async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        //ye promise return karda hai jisme users ka folder bna hota hai
        let res = await signup(email,password);
        let uid = res.user.uid;
        console.log(uid); 
        const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
        // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        // fn 1 -> progress tracking
        // fn2 -> error
        // fn3 -> success
        uploadTaskListener.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
        }
        async function fn3(){
            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            console.log(downloadUrl);
          await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[]
            })
            setLoading(false);
            console.log('User has Signed up');
            history.push('/')
        }
    
      
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }
    //if current user already available than render that perticular user's page
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    


 
      return (
                <div>
                    <div style={{position: "absolute", left: "200px", top: "20px"}}>
                        <img src= {backgroundr}/>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div style={{position: "absolute", left : "800px", top : "20px"}}>
                            <img src = {Insta}/>
                        </div>
                        <div style={{position: "absolute", top : "70px", left : "700px"}}>
                        <Paper className={classes.paper} >
                            <Grid container wrap="nowrap">
                                <Grid item xs>
                                    <TextField  style={{width : "400px"}} id="outlined-basic" label="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} type='email' variant="outlined" />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs>
                                    <TextField  style={{width : "400px"}} id="outlined-password-input" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" variant="outlined" />   
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs>                                   
                                   <TextField style={{width : "400px"}} id="outlined-basic" label="Full Name" value={name} onChange={(e)=>setName(e.target.value)} type='text' variant="outlined" />   
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs>
                                    <div className={classes.root2}>
                                        <input type='file' style={{left: '200px'}} className={classes.input} accept='image/*' id="contained-button-file" multiple onChange={handleFileSubmit}/>  
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                <CloudUploadIcon/>Upload Image
                                            </Button>
                                        </label>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <div className={classes.root3}>
                                    <button type='submit' style={{left: '200px'}} className={classes.input} disabled={loading} id="contained-button-file1" multiple>Sign up</button>
                                    <label htmlFor="contained-button-file1">
                                        <Button variant="contained" color="primary" component="span">
                                            Sign up
                                        </Button>
                                    </label>
                                </div>
                            </Grid>
                        </Grid>
                        </Paper>
                       </div>
                    </form>
                </div>
            )
}

export default Signup














//return (
//    <div>
//        <form onSubmit={handleSignup} >
//            <div>
//                <label htmlFor=''>UserName</label>
//                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

//            </div>
//            <div>
//            <label htmlFor=''>Email</label>
//                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
//            </div>
//            <div>
//            <label htmlFor=''>Password</label>
//                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//            </div>
//            <div>
//                <label htmlFor='profile'>Profile image</label>
//                <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
//            </div>
//            <button type='submit' disabled={loading}>SignUp</button>
//        </form>
//    </div>
//)


















//import React, { useState, useEffect, useContext } from 'react'
//import { AuthContext } from '../Context/AuthProvider';
//import { storage, database } from '../firebase';
//import Paper from '@material-ui/core/Paper';
//import { makeStyles } from '@material-ui/core/styles';
//import Grid from '@material-ui/core/Grid';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
//import TextField from '@material-ui/core/TextField';
//import Icon from '@material-ui/core/Icon';
//import Button from '@material-ui/core/Button';
//import style from './Signup.Module.css';

//const useStyles = makeStyles((theme) => ({
//  root: {
//    flexGrow: 1,
//    overflow: 'hidden',
//    padding: theme.spacing(0, 3),
//  },
//  hallo: {
//    width: 350,
//  },
//  paper: {
//    maxWidth: 400,
//    margin: `${theme.spacing(1)}px auto`,
//    padding: theme.spacing(2),
//  },
//}));

//const message = `Truncation should be conditionally applicable on this long line of text
// as this is a much longer line than what the container can support. `;
//const m = `      upload Image`
//const m1 = 'Instagram'
//const m2 = 'Sign up to see latest photos and videos'
//function Signup() {
//    const classes = useStyles();
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [name, setName] = useState('');
//    const [error, setError] = useState('');
//    const [loading, setLoading] = useState(false);
//    const [file, setFile] = useState(null)
    //signup function authprovider se jo value return ho rhi thi provider ke through hame yha mil jayegi lekin signup page me sirf signup chahiye 
    //to destucturing use karke signup mangwa liya
//    const { signup } = useContext(AuthContext);
//    console.log(signup);
    //is function me hame event milta hai submit ka jo hmare page ko reloade kara deta hai
    //async isliye banaya kyuki signup promise hai to uspe await lagana padega aur await karne ke liye handleSingnup ko asyn banana padega
//    const handleSignup = async (e) => {
        //form submit hora hota hai to page ko reload hone se rokne ke liye
//        e.preventDefault();
//        try {
//            setLoading(true);
//            let res = await signup(email, password);
//            let uid = res.user.uid;
//            console.log(uid);
            // storage (authenticetion wale page pe hai firebase ke) users naam ka folder ban jaye
            //us user ke under ja ke jis bhi unique id ka picture upload kar rha hu uska folder 
            //ban jaye us folder ke under ja ke profile image naam ki file ban jaye jiska jo data hai
            //vo us file ke equvilant ho jo data hamne upload kiya hai
//            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // fn1. 'state_changed' observer, called any time the state changes
            // fn2. Error observer, called on failure
            // fn3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
//            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            //snapshot se ham progress dekh(track) pate hai kitna hogya
//            function fn1(snapshot) {
//                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                console.log('Upload is ' + progress + '% done');
//            }
//            function fn2(error) {
                //error ki state set kra denge
//                setError(error);
                //koi agar chahe to ek time ke baad isko dubara se upload kar paye
//                setTimeout(() => {
//                    setError('')
//                }, 2000);
//                setLoading(false)
//            }
//            async function fn3() {
                //jo storage me upload hua tha uska url ka wait kro aur firestore pe daal denge
//                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
//                console.log(downloadUrl);
                //firestore ke line 34 pe jo hai use karne ke liye
                //uid is the unique id jo user ko mili thi
//                await database.users.doc(uid).set({
//                    email: email,
//                    userId: uid,
//                    username: name,
//                    createdAt: database.getCurrentTimeStamp(),
//                    profileUrl: downloadUrl,
//                    postIds: []
//                })
//                setLoading(false);
//                console.log('User has Signed up');
//            }
//        }
//        catch (err) {
//            setError(err)
//            setTimeout(() => setError(''), 2000);
//            setLoading(false)
//        }
//    }
//    const handleFileSubmit = (e) => {
        //ye file user ne dali hogi image type ki 
//        let file = e.target.files[0];
//        console.log(file);
//        if (file != null) {
            //is file ka state set karwa diya
//            setFile(file)
//        }
//    }
//    return (
//        <div>
//            <form onSubmit={handleSignup} >
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs zeroMinWidth>
//                            <Typography className={style.top12} variant="h3" component="h2">{m1}</Typography>
//                            <Typography className={style.top12} component="h8">{m2}</Typography>
//                            {/*<Typography noWrap>{message}</Typography>*/}
//                        </Grid>
//                    </Grid>
//                </Paper>
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs zeroMinWidth>
//                        <div>
//                            <label htmlFor=''>UserName</label>
//                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
//                        </div>
//                        </Grid>
//                    </Grid>
//                </Paper>
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs zeroMinWidth>
//                            <div>
//                                <label htmlFor=''>Email</label>
//                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                            </div>
//                        </Grid>
//                    </Grid>
//                </Paper>
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs zeroMinWidth>
//                            <div>
//                                <label htmlFor=''>Password</label>
//                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//                            </div>
//                        </Grid>
//                    </Grid>
//                </Paper>
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs>
//                            <div>
//                            <Typography className={style.top}><CloudUploadIcon className={style.top1}></CloudUploadIcon>{m}</Typography>
//                            <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
//                            </div>
//                        </Grid>
//                    </Grid>
//                </Paper>
//                <Paper className={classes.paper}>
//                    <Grid container wrap="nowrap" spacing={2}>
//                        <Grid item xs>
//                            <button type='submit' disabled={loading}>Login</button>
//                        </Grid>
//                    </Grid>
//                </Paper>
//            </form>
//        </div>
//    )
//}

//export default Signup









//                <div>
//                    <label htmlFor=''>UserName</label>
//                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

//                </div>
//                <div>
//                    <label htmlFor=''>Email</label>
//                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                </div>
//                <div>
//                    <label htmlFor=''>Password</label>
//                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//                </div>
//                <div>
//                    <label htmlFor='profile'>Profile image</label>
//                    <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
//                </div>
//{/*ek baar click karne ke baad baar baar loading pe click nhi karne dena hai*/ }
//                <button type='submit' disabled={loading}>Login</button>