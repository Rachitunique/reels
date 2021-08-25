 import React, { useEffect, useState } from 'react'
 import vid1 from './df.mp4';
 import vid2 from './frog.mp4';
 import vid3 from './dd.mp4';
 import vid4 from './ddd.mp4';
 import Video from './Video';
 function Ioa() {
     const[sources,setSources]=useState([{url:vid1},{url:vid2},{url:vid3},{url:vid4}])
    //enteries ek array hai
    //jab bhi koi element aayega ya jayega to ye loop chalega
     const callback = entries=>{
         entries.forEach(element => {
             console.log(element);
//             const array ke sare elements ko initially play kiya(play ek
//             asynchronous function hota hai aur wo ek promise return karta 
//             hai aur agar ek ek karke play aur pause karrenge to ho sakta hai 
//             kisi ka promise resolve hone se pahle pause kar de to error aayega 
//             isliye sabko initially play kar diya taki jab tak niche pahuche tab tak
//             sabka promise resolve ho gya hoga(pause synchronous hota hai wo pause karte hi pause kar deta hai video ko)
             let el = element.target.childNodes[0];
//             el.play ne sabko play kiya ab play ho rha hoga tabhi pause karunga
             el.play().then(()=>{
//                 //if this video is not in viewport then pause it
//                 //intersecting tab hai jab meri video 90% se upar screen pe visible hai lekin jab intersecting nhi hai to pause kro
                 if(!el.paused && !element.isIntersecting)
                 {
                     el.pause();                
                 }
             })

         });
     }
     const observer = new IntersectionObserver(callback,{
         threshold:0.9
     })
//     using this as component did mount
     useEffect(()=>{
         console.log('Effect');
//         sare video class wale elements ko laya aur unpe observer lga dia aur observer attach hote hi callback wala function call ho jata hai
         let elements = document.querySelectorAll('.videos')
         elements.forEach(el=>{
             observer.observe(el)
         })

     },[])
     return (
         <div className='video-container' >
             <div className='videos'>
                 <Video source={sources[0].url} />
             </div>
             <div className='videos'>
                 <Video source={sources[1].url} />
             </div>
             <div className='videos'>
                 <Video source={sources[2].url} />
             </div>
             <div className='videos'>
                 <Video source={sources[3].url} />
             </div>
            
         </div>
     )
 }

 export default Ioa