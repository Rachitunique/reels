//isme comments jo post karte hai wo display hona handel karte hai
import React,{useState,useEffect} from 'react'
import {database} from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import './Comments.css';
const useStyles = makeStyles({
  da:{
      marginRight:'2%',
      marginTop:'2%'
  }
 })
function Comments(props) {
    const classes = useStyles();
    const [comments,setComments] =useState(null);
    //jaise likes wale array me [] nhi lgaya vhi logic ki wajah se yha bhi [] nhi lagaya comment ke comments array me
    //add hone ki wajah se snapshot call hua post ka state change hua aur vo rerender hua phir uske children bhi 
    //rerender hote hai useeffect ki dependency postdata pe hai to to posts change hua to useeffect dubara chalega
    // comment ki state change karega taki hamara comment bina refresh kiye visible ho
    //network call hone ki wjah se async bnate hai
    useEffect(async() => {
        let arr=[];
        //sare comments nikal ke post se data me push kar diye
        for(let i=0;i<props.postData.comments.length;i++)
        {
            let cid = props.postData.comments[i];
            let data = await database.comments.doc(cid).get();
            arr.push(data.data());
        }
        setComments(arr)
        
    }, [props.postData])
    return (
        <>
        {
            comments==null?<CircularProgress/>:
            comments.map((comment,index)=>(
                <div key={index} className='comment-div'>
                    {/*maine useeffect ke for loop me comment ki value arr set kari thi aur us arr me comment 
                    object jo ki addcomment.js me banaya tha vo pura daal diya tha data.data se to ab mai
                    us arr pe traverse karke hi har comment ki url uname uprofile nikal rha hu*/}
                    <Avatar src={comment.uUrl} className={classes.da}/>
                    {/*comment me aata hai photo, name and comment addcomment me object me sab pass kiya tha*/}
                    <p><span style={{fontWeight:'bold',display:'inline-block'}} >{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                </div>
            ))
        }
        </>
    )
}

export default Comments