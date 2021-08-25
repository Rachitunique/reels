import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom';
function Video(props) {
    const handleMute = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    const handleAutoScroll= (e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next)
        {
            next.scrollIntoView({behaviour:'smooth'});
            e.target.muted = true;
        }
    }
    return (
        <>
        <video onEnded={handleAutoScroll} src={props.source} className='video-styles' onClick={handleMute} muted='muted' type='video/mp4' ></video>
        </>
    )
}

export default Video























//import React from 'react'
//import './video.css'
//import ReactDOM from 'react-dom';
//function Video(props) {
//    const handleMute = (e)=>{
//        e.preventDefault();
//        e.target.muted = !e.target.muted;
//    }
    /*jab koi video play hoke khatam ho jayegi to next video automatically aa jana chaida hai*/
//    const handleAutoScroll= (e)=>{
//        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
//        if(next)
//        {
//            next.scrollIntoView({behaviour:'smooth'});
//            e.target.muted = true;
//        }
//    }
//    return (
//        <>
//        <video onEnded={handleAutoScroll} src={props.source} className='video-styles' onClick={handleMute} muted='muted' type='video/mp4' ></video>
//        </>
//    )
//}

//export default Video


















//import React from 'react'

//function Video(props) {
//    const handleMute =(e)=>{
//        e.preventDefault();
        //e.target gives video
        //ab mai agr wo muted hai to unmuted kar du aur unmute hai to mute kar du
//        e.target.muted = !e.target.muted
//    }
//    return (
//        <>
//        <video className='video-styles' onClick={handleMute} controls muted='muted' type='video/mp4'>
//            {/*props.source is video[0] && video[1] && video[2] jo loa.js me pass kiya tha aise pahle projects me bhi pass kiya tha*/}
//            <source src={props.source} type='video/webm'/>
//        </video>
//        </>
//    )
//}

//export default Video