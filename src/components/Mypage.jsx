
import React from 'react'
import { useRef, useState } from "react";
import { signup, login, logout, useAuth, resetpassword } from "../firebase/firebase.js";
import Profile from './Profile.jsx';
import background from "../bilder/backgroundgarden.jpg";


const Mypage = () => {
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
     try {
      await signup(emailRef.current.value, passwordRef.current.value);
     } catch {
       alert("Error! Could not sign up, try again");
     }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error! Wrong email or password");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleResetPassword() {
    setLoading(true);
    try {
      await resetpassword(emailRef.current.value);
      alert("Password reset sent to your email")
    } catch {
      alert("Email not found! You need to fill your email adress on the email field :)");
    } 
    setLoading(false);
  
  }

  const myStyle={
    backgroundImage: `url(${background})` ,
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  };

  return (

  
    <div id="main"style={myStyle}>
     
      {!currentUser &&    
      <>
      <div id='mypage-form' >
          <h3>Login to your personal page</h3>
          <div className="fields">
            <label className='label-login' htmlFor="email">Email</label>
            <input className="input-field" ref={emailRef} placeholder="Email" />

            <label className='label-login' htmlFor="password">Password</label>
            <input className="input-field" ref={passwordRef} type="password" placeholder="Password" />
          </div>
              <button className='login-btn' disabled={ loading } onClick={handleLogin}>Login</button>
          <div className='btn-wrapper-mypage'>
              <button className='account-btn' disabled={ loading } onClick={handleSignup}>Sign Up</button>
              <button className='account-btn' disabled={ loading } onClick={handleResetPassword}>Forgot Password</button>
          </div>
      </div>
      
      </>
      }

      

      {currentUser &&
       <> 
       <div id='logged-in-div'>
          <Profile />
          <button id='logout-btn' disabled={ loading || !currentUser } onClick={handleLogout}>Logout</button>
       </div>
      </>
      }

    </div>
  );
}

export default Mypage