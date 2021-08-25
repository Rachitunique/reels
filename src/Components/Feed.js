import React,{useContext,useEffect,useState} from 'react'
import Header from './Header';
import {AuthContext} from '../Context/AuthProvider';
import {database} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import './Feed.css';
import Posts from './Posts';
function Feed() {
    const {currentUser} =useContext(AuthContext);
    const [userData,setUserData] = useState(null);
    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
        })
    },[currentUser])
    return (
        <>
        { userData==null ? <CircularProgress />:<>
        <Header userData={userData} />
        <div style={{height:'1.5vh'}}/>
        <div className='feed-container'>
            <div className='center'>
                <UploadFile userData={userData}/>
                <Posts userData={userData}/>
            </div>
        </div>

        </>
        }
        </>
    )
}

export default Feed














//import React,{useContext,useEffect,useState} from 'react'
//import Header from './Header';
//import {AuthContext} from '../Context/AuthProvider';
//import {database} from '../firebase'
//import CircularProgress from '@material-ui/core/CircularProgress';
//import UploadFile from './UploadFile';
//import './Feed.css'
//import Posts from './Posts';
//function Feed() {
//    const {currentUser} =useContext(AuthContext);
//    const [userData,setUserData] = useState(null);
//    useEffect(()=>{
        //jab maine user ka data change kiya to onSnapshot updated user ka doc la ke deda
        //firestore se la kar aur mai ab user ke data ko 
        //update kar dunga
//        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
//            setUserData(doc.data())
//        })
//    },[currentUser])
//    return (
//        <>
//        {/*user data null to loader ko dikhao jo ki circular progree hai material ui ka*/}
//        { userData==null ? <CircularProgress />:<>
//        {/*navbar(header) me user data pass kar diya*/}
//        <Header userData={userData} />
//        <div style={{height:'1.5vh'}}/>
//        <div className='feed-container'>
//            <div className='center'>
//                <UploadFile userData={userData}/>
//                <Posts userData={userData}/>
//            </div>
//        </div>

//        </>
//        }
//        </>
//    )
//}

//export default Feed