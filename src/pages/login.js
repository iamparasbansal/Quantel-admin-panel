import React from 'react';
import '../static/login.css';

const Login =(props)=>{

    const{
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError,
        clearInputs,
        clearErrors
    }= props;

    return(
        <section className="login">
        <div className="loginContainer">

        <div className="login-container-heading">
            {hasAccount?(
                <h2>Sign in</h2>
            ):(
                <h2>Sign up</h2>
            )}
        </div>

            <label>Username</label>
            <input 
                type="text"
                placeholder="enter username" 
                autoFocus 
                required 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
            />
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input
                type="password"
                required
                placeholder="enter password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                {hasAccount?(
                    <>
                    <button className="login-page-button" onClick={handleLogin}>Sign in</button>
                    <p>Don't have an account? 
                    <span onClick={()=>{
                        clearErrors();
                        clearInputs();
                        setHasAccount(!hasAccount)
                    }}>Sign up</span></p>
                    </>
                ):(
                    <>
                    <button className="login-page-button" onClick={handleSignup}>Sign up</button>
                    <p>Already have an account? 
                    <span onClick={()=>{
                        clearErrors();
                        clearInputs();
                        setHasAccount(!hasAccount)
                    }}>Sign in</span></p>
                    </>
                )}
            </div>
        </div>
        </section>
    );
};

export default Login;
