import React,{useState,useContext,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();
function AuthProvider({children}) {
    const[currentUser,setCurrentUser] =useState();
    const[loading,setLoading] =useState(true);
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }
    useEffect(()=>{
        const unsubscribe  = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            console.log(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


















//import React,{useState,useContext,useEffect} from 'react'
//mujhe yha authentication karni hai to yha auth import kra liya firebase se 
//import {auth} from '../firebase'
//jinke aage use lga hota hai jaise usestate usehistory wo hook hote hai , ye hook nhi hai
//export const AuthContext = React.createContext();
//jo bhi routes AuthProvider ke {} ke bich me hai wo uske children ko chale jayenge 
//https://stackoverflow.com/questions/56003891/react-props-vs-children-what-to-use-when
//copy me dekho
//function AuthProvider({children}) {
//    const[currentUser,setCurrentUser] =useState();
//    const[loading,setLoading] =useState(true);
//    function signup(email,password)
//    {
        //returning promise
//        return auth.createUserWithEmailAndPassword(email,password);
//    }
    //jab login kiya to login ne ek promise return kiya to mai us component ke andar await karunga jaise hi await khatam hua
    //ye jake onAuthStateChaned ko jake bta dega ki auth ki state change hua hai aur onAuth ko current user dega wo current user 
    //set karega ab cuurentuser change hua aur children component us user ke according rerender hoga
    //use context se run hota hai ye function dono email aur password ka input leke login ko dedeta hu
    //fir login apna kaam karta hai
//    function login(email,password)
//    {
        //returning promise
//        return auth.signInWithEmailAndPassword(email,password);
//    }
//    function logout()
//    {
//        return auth.signOut();
//    }
    //component did mount variation of useEffect
//    useEffect(()=>{
        //jab bhi authentication wale object me change karne wali request aayegi chahe wo signup ho , chahe login ho etc ho
        //onAuthStateChanged wala method chal jayega jaise hamne login kiya to just immediatly chal jayega ye method
        //agar user exist karta hoga to user aa jayega nhi to null
        //useState me loading true set upar hai to jab ham return ke andar !loading karte hai to wo false ho jata hai aur 
        //return render nhi hota pahle auth.onAuthStateChanged chalta hai , onauthStateChange fir se setLoading false karta hai
        //ab !false true hota hai aur return ke children rerender hote hai kyuki loading ki state change ho chuki hai 
        // children paass login , signup aur logout ki value di 
        //jati hai
        //hum jab tab close karke fir open karte hai tab login ke liye dubara nhi aata kyuki user logged in hi rahta hai
        //jab tak ke liye authentication defined hai to firse application kholne pe firbase ki state same rahti hai aur 
        //hange nhi hoti aur us user ka page khul jata hai.
//        const unsubscribe  = auth.onAuthStateChanged(user=>{
//            setCurrentUser(user);
//            setLoading(false);
//        })
        //jab application ko band kar rhe hai to observer jo user pe track rakh rha tha(onAuthStateChanged) ko hta rhe hai return is cleanup 
//        return ()=>{
//            unsubscribe();
//        }
//    },[])
    //jab currentuser ki value onauthstateprovider change karege to jin jin logo ne use kri hui hai useContext wo wo rerender honge jaise signup rerender hoga
//    const value = {
//        currentUser,
//        login,
//        signup,
//        logout
//    }
//    return (
        //i created a context and made a provider a gave a value to that provider
        //brackets ke bich me <yha jaise value hai>koi chiz jayegi to vo prop bante hai aur <>ye children hote hai</> 
        //main.js ke andar authprovider ke undar signup uska children ban gya
        //yha loading true hai to children ke andar value aa jayegi aur currently jo value aayegi wo signup(agar sign 
        //up ka route call kiya hai to) hai
//        <AuthContext.Provider value={value}>
//            {!loading&&children}
//        </AuthContext.Provider>
//    )
//}

//export default AuthProvider