import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {v4 as uuidv4} from 'uuid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {storage,database} from '../firebase'
const useStyles = makeStyles((theme) => ({
    
  }));
  
function UploadFile(props) {
    const classes = useStyles();
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);
    const types =['video/mp4','video/webm','video/ogg'];
    const onChange=(e)=>{
        const file = e?.target?.files[0];
        console.log(file);
        if(!file){
            setError('Please select a file');
            setTimeout(()=>{setError(null)},2000)
            return;
        }

        if(types.indexOf(file.type)==-1)
        {
            setError('Please select a video file');
            setTimeout(()=>{setError(null)},2000)
            return;
        }

        if(file.size/(1024*1024)>100)
        {
            setError('The selected file is too big');
            setTimeout(()=>{setError(null)},2000)
            return;
        }
        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError(null)
            },2000);
            setLoading(false)
        }
        async function fn3(){
          setLoading(true);
          uploadTask.snapshot.ref.getDownloadURL().then(url=>{
              let obj  ={
                  comments:[],
                  likes:[],
                  pId:id,
                  pUrl:url,
                  uName:props?.userData?.username,
                  uProfile:props?.userData?.profileUrl,
                  userId:props?.userData?.userId,
                  createdAt:database.getCurrentTimeStamp()
              }
              console.log(obj);
              console.log(props.userData);
              database.posts.add(obj).then(async docRef=>{
                  console.log(docRef);
                  let res = await database.users.doc(props.userData.userId).update({
                      postIds:[...props.userData.postIds,docRef.id]
                  })
              }).then(()=>{
                  setLoading(false)
              }).catch(e=>{
                  setError(e);
                  setTimeout(()=>{
                      setError(null)
                  },2000);
                  setLoading(false)
              })
          })
        }
    }

    return (
        <>
        {
            error!=null? <Alert severity="error">{error}</Alert>:<>
            <input 
            color='primary'
            type='file'
            onChange={onChange}
            id='icon-button-file'
            style={{display:'none'}}
            />
            <label htmlFor='icon-button-file'>
            <Button disabled={loading} variant="outlined" component='span' className={classes.button} 
            size='medium' color="secondary">
                Upload Video
            </Button>

            </label>
            {loading?<LinearProgress color='secondary' style={{marginTop:'6%'}} />:<></>}
            </>

        }
        </>
    )
}

export default UploadFile






















//import React,{useState} from 'react'
//import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
//import Alert from '@material-ui/lab/Alert';
//npm i uuid for this for assigning unique ids posts ka pid isi se milti hai
//import {v4 as uuidv4} from 'uuid';
//import LinearProgress from '@material-ui/core/LinearProgress';
//import {storage,database} from '../firebase'
//const useStyles = makeStyles((theme) => ({
    
//  }));
  
//function UploadFile(props) {
//    const classes = useStyles();
//    const[loading,setLoading] = useState(false);
//    const[error,setError] = useState(null);
//    const types =['video/mp4','video/webm','video/ogg'];
//    const onChange=(e)=>{
        //agar ? nhi lagate e ke baad to agar e null hota to error aa jata ab agar e null hai to 
        //.target?.files[0] chalega hi nhi e par hi ruk jayega
//        const file = e?.target?.files[0];
//        console.log(file);
//        if(!file){
            //agar mere pass koi file nhi ayi to error ki state "please select a file set 
            //kri" fir 2s ke baad error ki state firse null select kri
//            setError('Please select a file');
//            setTimeout(()=>{setError(null)},2000)
//            return;
//        }
        //ab agar meri file ka type video hai ya nhi mai ye types arr se select kar rha hu  
//        if(types.indexOf(file.type)==-1)
//        {
//            setError('Please select a video file');
//           setTimeout(()=>{setError(null)},2000)
//            return;
//        }
        //files ka size by default bits me milta hai ab use /1024*1024 karte mb me change kiya ab agar 
        //file ka size 100 mb se zyada hai to error return karenge
//        if(file.size/(1024*1024)>100)
//        {
//            setError('The selected file is too big');
//            setTimeout(()=>{setError(null)},2000)
//            return;
//        }
//        const id = uuidv4();
        //props.userData me sara object pda hua hai(user wala) hamne feed.js me sare object ko dala tha userData me
        //hamne userData ki userID mangwali 
        //Hello.html me props me le liya tha jo hellos ko pass hua tha isme bhi feed ko jo pass hua wo props me le liya 
        //privateRoute me isliye props. karke use kar rhe hai
//        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
//        uploadTask.on('state_changed',fn1,fn2,fn3);
//        function fn1(snapshot){
//            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//            console.log('Upload is ' + progress + '% done');         
//        }
//        function fn2(error){
//            setError(error);
//            setTimeout(()=>{
//                setError(null)
//            },2000);
//            setLoading(false)
//        }
//        async function fn3(){
//          setLoading(true);
//          uploadTask.snapshot.ref.getDownloadURL().then(url=>{
//              let obj  ={
//                  comments:[],
//                  likes:[],
//                  pId:id,
//                  pUrl:url,
//                  uName:props?.userData?.username,
//                  uProfile:props?.userData?.profileUrl,
//                  userId:props?.userData?.userId,
//                  createdAt:database.getCurrentTimeStamp()
//              }
//              console.log(obj);
//              console.log(props.userData);
              //database ke post ke collection me object add kar rha hu copy me dekho
              //docRef me post wala collection ka pura object aata hai
//              database.posts.add(obj).then(async docRef=>{
//                  console.log(docRef);
                  //userdata se userid nikali usme postsid ko update kiya
//                  let res = await database.users.doc(props.userData.userId).update({
//                      postIds:[...props.userData.postIds,docRef.id]
//                  })
//              }).then(()=>{
//                  setLoading(false)
//              }).catch(e=>{
//                  setError(e);
//                  setTimeout(()=>{
//                      setError(null)
//                  },2000);
//                  setLoading(false)
//              })
//          })
//        }
//    }

//    return (
//        <>
//        {
//            error!=null? <Alert severity="error">{error}</Alert>:<>
//            <input 
//            color='primary'
//            type='file'
//            onChange={onChange}
//            id='icon-button-file'
//            style={{display:'none'}}
//            />
//            <label htmlFor='icon-button-file'>
//            <Button disabled={loading} variant="outlined" component='span' className={classes.button} 
//            size='medium' color="secondary">
//                Secondary
//            </Button>

//            </label>
//            {loading?<LinearProgress color='secondary' style={{marginTop:'6%'}} />:<></>}
//            </>

//        }
//        </>
//    )
//}

//export default UploadFile



















//koi user koi chiz upload karega to wo kaam uploadfile.js me hone wala hai
//import React,{useState} from 'react'
//import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
//import Alert from '@material-ui/lab/Alert';
//import LinearProgress from '@material-ui/core/LinearProgress';
//const useStyles = makeStyles((theme) => ({
    
//  }));
  
//function UploadFile() {
//    const classes = useStyles();
//    const[loading,setLoading] = useState(false);
//    const[error,setError] = useState(null);
    //kis kis type ki file acceptable hai (isliye taki user khi image na daal de video ki jagah) 
//    const types =['video/mp4','video/webm','video/ogg'];
//    const onChange=(e)=>{
        
//    }

//    return (
//        <>
//        {
            //input tag is like in signup.js jab input ke upar click kiya to mera dialog box khul gya 
            //iska display none kiya hao style me ab uske niche materialUI ka Button define kiya hai
            //to material UI ka button hi hame UI me dikhta hai aur uske niche input wala button hai aur'
            //since uska diaplay none hai to vo nhi dikhta 
//            error!=null? <Alert severity="error">{error}</Alert>:<>
//            <input 
//            color='primary'
//            type='file'
//            onChange={onChange}
//            id='icon-button-file'
//            style={{display:'none'}}
//            />
//            <label htmlFor='icon-button-file'>
//            <Button disabled={loading} variant="outlined" component='span' className={classes.button} 
//            size='medium' color="secondary">
//                Secondary
//            </Button>

//            </label>
//            {/*agar load ho rha hai dialog box to ek progression loader hota hai wo lga do button ke about*/}
//            {loading?<LinearProgress color='secondary' style={{marginTop:'6%'}} />:<></>}
//            </>

//        }
//        </>
//    )
//}

//export default UploadFile

