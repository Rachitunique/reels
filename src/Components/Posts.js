import React,{useState,useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import { database } from '../firebase';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';

const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e',
      cursor:'pointer'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'auto'
    },
    seeComments:{
      height:'54vh',
      overflowY:'auto'
    },
    ci:{
    
      color: 'white',
      left:'9%',
      cursor:'pointer'
    },
    mn:{
      color:'white',
      
     
    },
    tmn:{
      color:'white'
    }
  
  });
function Posts({userData=null}) {
  const classes = useStyles();
  const[posts,setPosts] = useState(null);
  const [openId, setOpenId] = useState(null);
  const handleClickOpen = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };
      const callback = entries=>{
        entries.forEach(element => {
            console.log(element);
            let el = element.target.childNodes[0];
            el.play().then(()=>{
                //if this video is not in viewport then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();                
                }
            })

        });
    }
    const observer = new IntersectionObserver(callback,{ threshold:0.85 });
    useEffect(()=>{
      let parr=[];
      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
        parr=[];
        querySnapshot.forEach((doc)=>{
          console.log(doc.data(),+"  "+doc.id);
          let data = {...doc.data(),postId:doc.id}
          parr.push(data)
        })
        setPosts(parr);
      })
      return unsub;
    }
    ,[])
    useEffect(()=>{
      let elements = document.querySelectorAll('.videos');
      elements.forEach(el=>{
        observer.observe(el);
      })
      return ()=>{
        observer.disconnect();
      }
    },[posts])
    return (
      <>
        <div className='place'>
        </div>
        {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
        <div className='video-container' id='video-container'>
          {
            posts.map((post)=>(
              <React.Fragment key={post.postId}>
                 <CssBaseline />
                 <Container maxWidth="sm">
                <div className='videos'>
                  <Video source={post.pUrl} id={post.pId}/>
                  <div className='fa' style={{display:'flex'}}>
                    <Avatar src={post.uProfile}></Avatar>
                    <h4>{post.uName}</h4>
                  </div>
                  <Likes userData={userData} postData={post}/>
                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                        <MuiDialogContent>
                          <div className='dcontainer'>
                            <div className='video-part'>
                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                <source src={post.pUrl} type="video/webm" />
                              </video>
                            </div>
                            <div className='info-part'>
                              <Card>
                                <CardHeader
                                  avatar={
                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                                    </Avatar>
                                  }
                                  action={
                                    <IconButton aria-label="settings">
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                  title={post?.uName}

                                />
                                
                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                <CardContent className={classes.seeComments}>
                                  
                                <Comments userData={userData} postData={post} />
                                </CardContent>
                                
                              </Card>
                              <div className='extra'>
                              <div className='likes'>
                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
                                </div>
                                <AddComment  userData={userData} postData={post}/> 
                                </div>
                            </div>
                          </div>
                        </MuiDialogContent>
                      </Dialog>
                </div>

                <div className='place'></div>
                </Container>
              </React.Fragment>
            ))
          }

        </div>
        }
        </>
    )
}

export default Posts


















//import React,{useState,useEffect} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import './Posts.css'
//import CircularProgress from '@material-ui/core/CircularProgress';
//import Dialog from '@material-ui/core/Dialog';
//import MuiDialogContent from '@material-ui/core/DialogContent';
//import Video from './Video';
//import { database } from '../firebase';
//import Likes from './Likes';
//import AddComment from './AddComment';
//import Comments from './Comments';
//const useStyles = makeStyles({
//    root: {
//      width: '100%',
//      padding: '0px'
//    },
//    loader: {
//      position: 'absolute',
//      left: '50%',
//      top: '50%'
//    },
//    typo: {
//      marginLeft: '2%'
//    },
//    vac: {
//      marginLeft: '3.5%',
//      color: '#8e8e8e',
//      cursor:'pointer'
//    },
//    dp: {
//      marginLeft: '2%'
//    },
//    cc: {
//      height: '50vh',
//      overflowY: 'auto'
//    },
//    seeComments:{
//      height:'54vh',
//      overflowY:'auto'
//    },
//    ci:{
    
//      color: 'white',
//      left:'9%',
//      cursor:'pointer'
//    },
//    mn:{
//      color:'white',
      
     
//    },
//    tmn:{
//      color:'white'
//    }
  
//  });
//function Posts({userData=null}) {
//  const classes = useStyles();
//  const[posts,setPosts] = useState(null);
//  const [openId, setOpenId] = useState(null);
//  const handleClickOpen = (id) => {
//    setOpenId(id);
//  };
//  const handleClose = () => {
//    setOpenId(null);
//  };
//      const callback = entries=>{
//        entries.forEach(element => {
//            console.log(element);
//            let el = element.target.childNodes[0];
//            el.play().then(()=>{
                //if this video is not in viewport then pause it
//                if(!el.paused && !element.isIntersecting)
//                {
//                    el.pause();                
//                }
//            })

//        });
//    }
//    const observer = new IntersectionObserver(callback,{ threshold:0.85 });
//    useEffect(()=>{
//      let parr=[];
//      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
//        parr=[];
//        querySnapshot.forEach((doc)=>{
//          console.log("hey there");
//          console.log(doc.data(),+"  "+doc.id);
//          let data = {...doc.data(),postId:doc.id}
//          parr.push(data)
//        })
//        setPosts(parr);

//      })
//      return unsub;
//    }
//    ,[])
//    useEffect(()=>{
//      let elements = document.querySelectorAll('.videos');
//      elements.forEach(el=>{
//        observer.observe(el);
//      })
//      return ()=>{
//        observer.disconnect();
//      }
//    },[posts])
//    return (
//      <>
//        <div className='place'>
//        </div>
//        {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
//        <div className='video-container' id='video-container'>
//          {
//            posts.map((post)=>(
//              <React.Fragment key={post.postId}>
//                <div className='videos'>
//                  <Video source={post.pUrl} id={post.pId}/>
//                  <div className='fa' style={{display:'flex'}}>
//                    <Avatar src={post.uProfile}></Avatar>
//                    <h4>{post.uName}</h4>
//                  </div>
//                  <Likes userData={userData} postData={post}/>
//                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
//                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
//                        <MuiDialogContent>
//                          <div className='dcontainer'>
//                            <div className='video-part'>
//                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
//                                <source src={post.pUrl} type="video/webm" />
//                              </video>
//                            </div>
//                            <div className='info-part'>
//                              <Card>
//                                <CardHeader
//                                  avatar={
//                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
//                                    </Avatar>
//                                  }
//                                  action={
//                                    <IconButton aria-label="settings">
//                                      <MoreVertIcon />
//                                    </IconButton>
//                                  }
//                                  title={post?.uName}

//                                />
                                
//                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
//                                <CardContent className={classes.seeComments}>
                                  
//                                <Comments userData={userData} postData={post} />
//                                </CardContent>
                                
//                              </Card>
//                              <div className='extra'>
//                              <div className='likes'>
//                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
//                                </div>
//                                <AddComment  userData={userData} postData={post}/> 
//                                </div>
//                            </div>
//                          </div>
//                        </MuiDialogContent>
//                      </Dialog>
//                </div>

//                <div className='place'></div>
//              </React.Fragment>
//            ))
//          }

//        </div>
//        }
//        </>
//    )
//}

//export default Posts
















//import React,{useState,useEffect} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import './Posts.css'
//import CircularProgress from '@material-ui/core/CircularProgress';
//import Dialog from '@material-ui/core/Dialog';
//import MuiDialogContent from '@material-ui/core/DialogContent';
//import Video from './Video';
//import { database } from '../firebase';
//import Likes from './Likes';
//import AddComment from './AddComment';
//import Comments from './Comments';
//const useStyles = makeStyles({
//    root: {
//      width: '100%',
//      padding: '0px'
//    },
//    loader: {
//      position: 'absolute',
//      left: '50%',
//      top: '50%'
//    },
//    typo: {
//      marginLeft: '2%'
//    },
//    vac: {
//      marginLeft: '3.5%',
//      color: '#8e8e8e',
//      cursor:'pointer'
//    },
//    dp: {
//      marginLeft: '2%'
//    },
//    cc: {
//      height: '50vh',
//      overflowY: 'auto'
//    },
//    seeComments:{
//      height:'54vh',
//      overflowY:'auto'
//    },
//    ci:{
    
//      color: 'white',
//      left:'9%',
//      cursor:'pointer'
//    },
//    mn:{
//      color:'white',
      
     
//    },
//    tmn:{
//      color:'white'
//    }
  
//  });
//function Posts({userData=null}) {
//  const classes = useStyles();
//  const[posts,setPosts] = useState(null);
//  const [openId, setOpenId] = useState(null);
//  const handleClickOpen = (id) => {
//    setOpenId(id);
//  };
//  const handleClose = () => {
//    setOpenId(null);
//  };
//      const callback = entries=>{
//        entries.forEach(element => {
            //console.log(element);
//            let el = element.target.childNodes[0];
            //console.log(el);
//            el.play().then(()=>{
                //if this video is not in viewport then pause it
//                if(!el.paused && !element.isIntersecting)
//                {
//                    el.pause();                
//                }
//            })
//        });
//    }
//    const observer = new IntersectionObserver(callback,{ threshold:0.85 });
//    useEffect(()=>{
//      let parr=[];
//      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
//        parr=[];
//        querySnapshot.forEach((doc)=>{
//          console.log(doc.data(),+"  "+doc.id);
//          let data = {...doc.data(),postId:doc.id}
//          parr.push(data)
//        })
//        setPosts(parr);

//      })
//      return unsub;
//    }
//    ,[])
//    useEffect(()=>{
//      let elements = document.querySelectorAll('.videos');
//      elements.forEach(el=>{
//        observer.observe(el);
//      })
//      return ()=>{
//        observer.disconnect();
//      }
//    },[posts])
//    return (
//      <>
//        <div className='place'>
//        </div>
//        {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
//        <div className='video-container' id='video-container'>
//          {
//            posts.map((post)=>(
//              <React.Fragment key={post.postId}>
//                <div className='videos'>
//                  <Video source={post.pUrl} id={post.pId}/>
//                  <div className='fa' style={{display:'flex'}}>
//                    <Avatar src={post.uProfile}></Avatar>
//                    <h4>{post.uName}</h4>
//                  </div>
//                  <Likes userData={userData} postData={post}/>
//                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
//                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
//                        <MuiDialogContent>
//                          <div className='dcontainer'>
//                            <div className='video-part'>
//                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
//                                <source src={post.pUrl} type="video/webm" />
//                              </video>
//                            </div>
//                            <div className='info-part'>
//                              <Card>
//                                <CardHeader
//                                  avatar={
//                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
//                                    </Avatar>
//                                  }
//                                  action={
//                                    <IconButton aria-label="settings">
//                                      <MoreVertIcon />
//                                    </IconButton>
//                                  }
//                                  title={post?.uName}

//                                />
                                
//                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
//                                <CardContent className={classes.seeComments}>
                                  
//                                <Comments userData={userData} postData={post} />
//                                </CardContent>
                                
//                              </Card>
//                              <div className='extra'>
//                              <div className='likes'>
//                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
//                                </div>
//                                <AddComment  userData={userData} postData={post}/> 
//                                </div>
//                            </div>
//                          </div>
//                        </MuiDialogContent>
//                      </Dialog>
//                </div>

//                <div className='place'></div>
//              </React.Fragment>
//            ))
//          }

//        </div>
//        }
//        </>
//    )
//}

//export default Posts



















//import React, { useState, useEffect } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import './Posts.css'
//import CircularProgress from '@material-ui/core/CircularProgress';
//import Dialog from '@material-ui/core/Dialog';
//import MuiDialogContent from '@material-ui/core/DialogContent';
//import Video from './Video';
//import { database } from '../firebase';
//import Likes from './Likes';
//import AddComment from './AddComment';
//import Comments from './Comments';
//const useStyles = makeStyles({
//  root: {
//    width: '100%',
//    padding: '0px'
//  },
//  loader: {
//    position: 'absolute',
//    left: '50%',
//    top: '50%'
//  },
//  typo: {
//    marginLeft: '2%'
//  },
//  vac: {
//    marginLeft: '3.5%',
//    color: '#8e8e8e',
//    cursor: 'pointer'
//  },
//  dp: {
//    marginLeft: '2%'
//  },
//  cc: {
//    height: '50vh',
//    overflowY: 'auto'
//  },
//  seeComments: {
//    height: '54vh',
//    overflowY: 'auto'
//  },
//  ci: {
//
//    color: 'white',
//    left: '9%',
//    cursor: 'pointer'
//  },
//  mn: {
//    color: 'white',


//  },
//  tmn: {
//    color: 'white'
//  }

//});
//function Posts({ userData = null }) {
//  const classes = useStyles();
//  {/*see in copy this helps in opening dialog resolve*/ }
//  const [posts, setPosts] = useState(null);
//  const [openId, setOpenId] = useState(null);
//  const handleClickOpen = (id) => {
//    setOpenId(id);
//  };
//  const handleClose = () => {
//    setOpenId(null);
//  };
//  const callback = entries => {
//    entries.forEach(element => {
//      console.log(element);
//      let el = element.target.childNodes[0];
//      el.play().then(() => {
        //if this video is not in viewport then pause it
//        if (!el.paused && !element.isIntersecting) {
//          el.pause();
//        }
//      })
//    });
//  }
//  const observer = new IntersectionObserver(callback, { threshold: 0.85 });
//  useEffect(() => {
//    let parr = [];
//    const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
//      parr = [];
//      querySnapshot.forEach((doc) => {
//        console.log(doc.data(), +"  " + doc.id);
//        let data = { ...doc.data(), postId: doc.id }
//        parr.push(data)
//      })
//      setPosts(parr);

//    })
//    return unsub;
//  }
//    , [])
//  useEffect(() => {
//    let elements = document.querySelectorAll('.videos');
//    elements.forEach(el => {
//      observer.observe(el);
//    })
//    return () => {
//      observer.disconnect();
//    }
//  }, [posts])
//  return (
//    <>
 //     <div className='place'>
 //     </div>
 //     {posts == null ? <CircularProgress className={classes.loader} color="secondary" /> :
 //       <div className='video-container' id='video-container'>
 //         {
 //           posts.map((post) => (
 //             <React.Fragment key={post.postId}>
//                <div className='videos'>
//                  <Video source={post.pUrl} id={post.pId} />
//                  <div className='fa' style={{ display: 'flex' }}>
//                    <Avatar src={post.uProfile}></Avatar>
//                    <h4>{post.uName}</h4>
//                  </div>
//                  {/*jis bhi user ne like kiya hoga us particular post ke like wale array me jakar us user ki uid push kar dunga ab likes.js ko post bhej rhe hai*/}
//                  <Likes userData={userData} postData={post} />
//                  {/*chat box ka icom material UI sde uthaya ispe click karne pe iche wale dialog ka icom khulta hai*/}
//                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
//                  {/*isme open ki value pID ke equal ye bhi copy me explain hai dialog resolve me*/}
//                  <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
//                    <MuiDialogContent>
//                      <div className='dcontainer'>
//                        {/*left wale part me video*/}
//                        <div className='video-part'>
//                          <video autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
//                            <source src={post.pUrl} type="video/webm" />
//                          </video>
//                        </div>
//                        {/*right wale part me comments made using material UI card, is card me user ka name and face jo upar dikhta hai wo dala*/}
//                        <div className='info-part'>
//                          <Card>
//                            {/*user ka naam aur profile photo isse aayi*/}
//                            <CardHeader
//                              avatar={
//                                <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
//                                </Avatar>
//                              }
//                              action={
//                                <IconButton aria-label="settings">
//                                  <MoreVertIcon />
//                                </IconButton>
//                              }
//                              title={post?.uName}
//
//                            />
//
//                            <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
//                            <CardContent className={classes.seeComments}>

//                              <Comments userData={userData} postData={post} />
//                            </CardContent>

//                          </Card>
//                          <div className='extra'>
//                            {/*yha likes aur comments dikha rakhe hai*/}
//                            <div className='likes'>
//                              <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
//                            </div>
//                            <AddComment userData={userData} postData={post} />
//                          </div>
//                        </div>
//                      </div>
//                    </MuiDialogContent>
//                  </Dialog>
//                </div>

//                <div className='place'></div>
//              </React.Fragment>
//            ))
//          }

//        </div>
//      }
//    </>
//  )
//}

//export default Posts






















//nya post add hua
//ab nya post add hone ki wajah e snapshot call hoga dubara se
//snapshot call hoga to querySnapshot dubara se chalega aur
//posts arr dubara se banega aur setposts ki state set hogi
//ab state change hone ki wajah se rerender hua aur UI pe
//nya post dikhne lga ab sabpe observer lga diya aur
//jinpe pahle se observer lga tha uspe se observer hta diya 
//import React,{useState,useEffect} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import './Posts.css'
//import CircularProgress from '@material-ui/core/CircularProgress';
//import Dialog from '@material-ui/core/Dialog';
//import MuiDialogContent from '@material-ui/core/DialogContent';
//import Video from './Video';
//import { database } from '../firebase';
//const useStyles = makeStyles({
//    root: {
//      width: '100%',
//      padding: '0px'
//    },
//    loader: {
//      position: 'absolute',
//      left: '50%',
//      top: '50%'
//    },
//    typo: {
//      marginLeft:'2%'
//    },
//    vac: {
//      marginLeft: '3.5%',
//      color: '#8e8e8e',
//      cursor:'pointer'
//    },
//    dp: {
//      marginLeft: '2%'
//    },
//    cc: {
//      height: '50vh',
//      overflowY: 'auto'
//    },
//    seeComments:{
//      height:'54vh',
//      overflowY:'auto'
//    },
//    ci:{

//      color: 'white',
//      left:'9%',
//      cursor:'pointer'
//    },
//    mn:{
//      color:'white',


//    },
//    tmn:{
//      color:'white'
//    }

//  });
//function Posts({userData=null}) {
//  const classes = useStyles();
//  const[posts,setPosts] = useState(null);
//  const [openId, setOpenId] = useState(null);
//  const handleClickOpen = (id) => {
//    setOpenId(id);
//  };
//  const handleClose = () => {
//    setOpenId(null);
//  };
      //ye callback Ioa.js me use kiya tha
//      const callback = entries=>{
//        entries.forEach(element => {
//            console.log(element);
//            let el = element.target.childNodes[0];
//            el.play().then(()=>{
                //if this video is not in viewport then pause it
//                if(!el.paused && !element.isIntersecting)
//                {
//                    el.pause();                
//                }
//            })

//        });
//    }
//    const observer = new IntersectionObserver(callback,{ threshold:0.85 });
//    useEffect(()=>{
      //parr is post arr
//      let parr=[];
      //jab bhi mai nya post karunga to posts collection me change aayega to snapshot function
      //us change ka snapshot leke use detect kar leta hai ab mai un posts ko desc order me(according 
      //to time of creation)sort kar lunga fir un sabki copy bna ke add karunga data me aur mere nye 
      //post ko bhi sath me add karunga fir in sabko parr me push kar dunga use empty rakha nhi 
      //to kai baar add ho jate pahle ke elements
//      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
//        parr=[];
//        querySnapshot.forEach((doc)=>{
//          console.log(doc.data(),+"  "+doc.id);
//          let data = {...doc.data(),postId:doc.id}
//          parr.push(data)
//        })
//        setPosts(parr);

//      })
      //jate time is listener ko unsuscribe kar dunga
//      return unsub;
//    }
//    ,[])
    //pahle ioa me hamne [] me hi observer add kiya lekin ab yha jab bhi mere posts me change 
    //aayegi to mai chahta hu observer lag jaye mere to ab posts ke upar depend karta hai 
    //observer lagana
//    useEffect(()=>{
      //ab sabpe video pe listener lga diya phir un sab se listener hta diya jinpe pahle se listener lga tha
//      let elements = document.querySelectorAll('.videos');
//      elements.forEach(el=>{
//        observer.observe(el);
//      })
//      return ()=>{
//        observer.disconnect();
//      }
//    },[posts])
//    return (
//      <>
//        <div className='place'>
//        </div>
//        {/*posts ki value null ke equal hai*/}
//        {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
//        <div className='video-container' id='video-container'>
//          {
            //har ek video ko render karane ke liye post ke upar map lagaya
//            posts.map((post)=>(
//              <React.Fragment key={post.postId}>
//                <div className='videos'>
//                  <Video source={post.pUrl} id={post.pId}/>
//                  <div className='fa' style={{display:'flex'}}>
//                    {/*user ko uski profile photo aur profile name dedi avatar se chhota circle aa jata hai*/}
//                    <Avatar src={post.uProfile}></Avatar>
//                    <h4>{post.uName}</h4>
//                  </div>
//                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
//                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
//                        <MuiDialogContent>
//                          <div className='dcontainer'>
//                            <div className='video-part'>
//                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
//                                <source src={post.pUrl} type="video/webm" />
//                              </video>
//                            </div>
//                            <div className='info-part'>
//                              <Card>
//                                <CardHeader
//                                  avatar={
//                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
//                                    </Avatar>
//                                  }
//                                  action={
//                                    <IconButton aria-label="settings">
//                                      <MoreVertIcon />
//                                    </IconButton>
//                                  }
//                                  title={post?.uName}

//                                />

//                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
//                                <CardContent className={classes.seeComments}>

//                                {/* <Comments userData={userData} postData={post} /> */}
//                                </CardContent>

//                              </Card>
//                              <div className='extra'>
//                              <div className='likes'>
//                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
//                                </div>
//                                {/* <AddComment  userData={userData} postData={post}/>  */}
//                                </div>
//                            </div>
//                          </div>
//                        </MuiDialogContent>
//                      </Dialog>
//                </div>

//                <div className='place'></div>
//              </React.Fragment>
//            ))
//          }
//        </div>
//        }
//        </>
//    )
//}

//export default Posts