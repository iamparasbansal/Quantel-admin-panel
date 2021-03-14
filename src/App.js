import React, {useState, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Switch}from 'react-router-dom';
import fire from './fire';
import {Grid} from '@material-ui/core';

import Home from "./pages/Home"
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/login';
import Error from './pages/Error';
import Consultant from './pages/Consultants';
import EnhancedBookingTable from './pages/Bookings';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/SidePanel';

import AddBooking from './components/Bookings/AddBooking';
import EditBooking from './components/Bookings/EditBooking';
import ViewBooking from './components/Bookings/ViewBooking';

import AddConsultant from './components/Consultants/AddConsultant';
import EditConsultant from './components/Consultants/EditConsultant';
import ViewConsultant from './components/Consultants/ViewConsultant';

function App() {

    const[user, setUser]= useState('');
    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[emailError, setEmailError]= useState('');
    const[passwordError, setPasswordError]= useState('');
    const[hasAccount, setHasAccount]= useState(false);

    const clearInputs=()=>{
        setEmail('');
        setPassword('');
    }

    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin=()=>{
        clearErrors();
        fire
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch((err)=>{                             
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    };

    const handleSignup=()=>{
        clearErrors();
        fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((err)=>{                             
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        });
    };

    const handleLogout=()=>{
        fire.auth().signOut();
    };

    const authListener=()=>{
        fire.auth().onAuthStateChanged(user=>{
            if(user){
                clearInputs();
                setUser(user);
            }else{
                setUser("");
            }
        });
    };

    useEffect(()=>{
        authListener();
    }, []);

  
  return (
    <Router>
    {user?(
        <Grid container direction="column">
            <Grid item>
                <Navbar />
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={2}>
                    <Sidebar handleLogout={handleLogout}/>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Bookings" component={EnhancedBookingTable}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route exact path="/consultants" component={Consultant}/>
                        <Route exact path="/consultants/add" component={AddConsultant}/>
                        <Route exact path="/consultants/edit/:id" component={EditConsultant}/>
                        <Route exact path="/consultants/view/:id" component={ViewConsultant}/>
                        <Route exact path="/Bookings/add" component={AddBooking}/>
                        <Route exact path="/Bookings/edit/:id" component={EditBooking}/>
                        <Route exact path="/Bookings/view/:id" component={ViewBooking}/>
                        <Route component={Error}/>
                    </Switch>
                </Grid>
            </Grid>
        </Grid> 
    ):(
        <Login 
            email={email} 
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            clearInputs={clearInputs}
            clearErrors={clearErrors}
        />
    )}
    </Router>
  );
}

export default App;
