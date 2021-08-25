import React,{useEffect,useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles} from '@material-ui/core/styles';
import {database} from '../firebase'
const useStyles = makeStyles({
    like:{
        color:'#e74c3c',
        cursor:'pointer'
    },
    unlike:{
        color:'white',
        cursor:'pointer'
    }
})
function Likes({userData=null,postData=null}) {
    const [like,setLike] = useState(null);
    const classes = useStyles();
    {/*jab maine like kiya to posts ke likes wala array me user ki uid aayegi else wala chalega to ab posts ki state change ho chuki hai uska
      snapshot method chalega to post rerender hoga aur sare posts dubara laod honge aur likes posts ka child hai to likes bhi rerender hoga 
      lekin agar maine like ke useeffect me [] use kiya hota to useeffect dubara nhi chalta aur iske setLike wale state me kuchh nhi aata 
      mujhe referesh karne par effect dikhta lekin bina refresh kiye effect nhi dikhta isiye [] ki jagah [postData] use kiya*/}
    useEffect(()=>{
        //kya postdata(posts collection) ke likes wale array ke ander userData contain karta aur fir userid karta ya nhi karta
        //agar karta to check ki value true else false
        let check = postData.likes.includes(userData?.userId)?true:false;
        setLike(check);
    },[postData])
    const handleLike=async()=>{
        if(like==true)
        {
            //unlike
            let uarr = postData.likes.filter(el=>{
                return el!=userData.userId
            })
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
        else{
            //like
            //added new userId along with alredy existsing elements in like array by spread
            let uarr = [...postData.likes,userData.userId];
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
    }
 
    return (
        <div>
            {
                like!=null?<>
                {/*agar like false hai to red kro else red hatao*/}
                {like==false?<FavoriteIcon className={`${classes.unlike} icon-styling`} onClick={handleLike} />:
                <FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike} />}
                </>
                :<></>
            }
        </div>
    )
}

export default Likes