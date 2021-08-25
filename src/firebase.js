import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyC34f6uaOd6uMUeZBxzvdEaaYbIVj0-5uU",
        authDomain: "reels-2928a.firebaseapp.com",
        projectId: "reels-2928a",
        storageBucket: "reels-2928a.appspot.com",
        messagingSenderId: "553823472546",
        appId: "1:553823472546:web:442b014aefc9ee8021c0fb"
    }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database ={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();










//import firebase from "firebase/app"
//import "firebase/auth"
//stores videos on firebase
//import 'firebase/storage'
//stores data for each user in nosql form
//copy me bhi hai kuchh
//import 'firebase/firestore'
//firebase.initializeApp(
//    {
//        apiKey: "AIzaSyC34f6uaOd6uMUeZBxzvdEaaYbIVj0-5uU",
//        authDomain: "reels-2928a.firebaseapp.com",
//        projectId: "reels-2928a",
//        storageBucket: "reels-2928a.appspot.com",
//        messagingSenderId: "553823472546",
//        appId: "1:553823472546:web:442b014aefc9ee8021c0fb"
//    }
//)
//export const auth = firebase.auth();
//const firestore = firebase.firestore();
//mujhe har tarah ka data store karne ke liye connection banane padte hai ,ab 
//collection banane ke liye firestore ke object ki jarurat hai, ab mai kahta hu jo
//create ho rhe hai collections hamare wo ek hi jagah create ho ek hi file me create ho
//aur export ho jaye koi dusre component me ja ke khulle tarike se apne firestore ke
//collection na create kar paye to isliye mai firestore ke object ko expose hi nhi karata
//export ke andar mai simple is database ko export karata hu ,is database ke andar jo jo collection
//hote hai unko mai bahar ja ke expose karata hu ki tum bahar jake user collcetion ko access karo 
//pure ko nhi , matab mera nya user aake mere pure database ko nhi balki limited databse users hai use 
//access karega agar mai simply export kar dunga to wo firestore bhi bna lega, auth bhi use kar lega
//steps hai
//1)person ko sign-up kra lo
//2)person ki profile image ko upload kra lo aur uska url lelo
//3)fir person ke object ko user's ke collection jo ki firestore me hai vha daal do
//export const database ={
//    users:firestore.collection('users'),
//    //post collection created
//    posts:firestore.collection('posts'),
//    comments:firestore.collection('comments'),
//    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
//}
//if by storage, you mean s3-type of storage, its meant to store object-like stuff, such as text files, images etc(storage). 
//A database(firebase) is intended for structured or semi-structured data. such as IDs, records, transaction information.
//firebase me hi firestore hai
//export const storage = firebase.storage();