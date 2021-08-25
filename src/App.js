import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
//import Main from './MaterialUI/Main';
import Login from './Components/Login';
//import Ioa from './Components/Ioa';
//installed from npm as npm i react-router-dom
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed'
function App() {
  return (
   <Router>
     <AuthProvider>
     <Switch>
       <PrivateRoute exact path='/' component={Feed}/>
       <Route path='/login' component={Login}/>
       <Route path='/signup' component={Signup}/>
     </Switch>
     {/*<Ioa/>*/}
     </AuthProvider>
   </Router>
  );
}

export default App;




//import logo from './logo.svg';
//import './App.css';
//import Signup from './Components/Signup';
//import AuthProvider from './Context/AuthProvider';
//import Main from './MaterialUI/Main';
//import Login from './Components/Login';
//function App() {
//  return (
    //hamne browser router use kiya tha yha movies ke app.js me ab browser router reactdom deta hai to uske pass uske children
    //ke routing ki capablity react khud kar leta hai magar yha hum sign up auth authprovider khud bna rhe hai to iske
    //routing ki capabling hame deni padegi 
//    <AuthProvider>
//    <Signup/>
    //{/* <Login/> */}
//    </AuthProvider>
    // <Main/>
//  );
//}

//export default App;


