//props react router dom se mil raha hai
//agar mera mera current user hai to mai component ko render karta hu aur 
//props(match history) pass karta hu nhi to mai login page pe redirect kar deta hu
//normal route login aur signup ko render karata hu to props nhi bhej pata hu
//lekin ise props bhejna tha aur ek condition ke upar route ko rander karana tha 
//isliye render method use kiya ab mujhe history ke liye usehistory ka use nhi 
//karna padega component me
import React,{useContext} from 'react'
import { Route,Redirect } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider';
function PrivateRoute({component:Component,...rest}) {
    const {currentUser} = useContext(AuthContext);
    return (
        //localhost:3000(...rest) aane pe current user exist karta hai to Feed componenet render karo nhi to login page
       <Route {...rest} render={props=>{
           return currentUser?<Component {...props} />:<Redirect to='/login'/>
       }}/>
    )
}

export default PrivateRoute
















//private route ek component hai usme maine teen route pass kar diye exact,path aur component fir iske props
//ko destructure kar liya component ko capital c ke sath aur bakio ko exact ke sath
//ab mai route bna rha hu usme rest wale route pass kiya aur render ke props(location, history)etc bhi pass kar diye
//ab mujhe return me wo component bhejne honge jo us route pe render karana hai
//ab agar mera current user ek valid value hai to mai isi component ko render karaunga render ke porps ke sath
//aur null hai to wapis login page 
//pe jaunga
//import React,{useContext} from 'react'
//import { Route,Redirect } from 'react-router-dom';
//import {AuthContext} from '../Context/AuthProvider';
//exact path='/' component={Feed} these three props were passed we kept component prop in component and exact and path prop is stored as rest(which is a copy)
//function PrivateRoute({component:Component,...rest}) {
//    const {currentUser} = useContext(AuthContext);
//    return (
        //render method ek call back hota hai jisme prop pass hote hai route ke aur props ke alawa koi prop pass karna hai to iske side me likh dete hai {...} ___->yha
       //movies ka app.js dekho
//       <Route {...rest} render={props=>{
           //jsx me normal object pass nhi hoga isliye use spread kra ke pass kiya
//           return currentUser?<Component {...props} />:<Redirect to='/login'/>
//       }}/>
//    )
//}

//export default PrivateRoute