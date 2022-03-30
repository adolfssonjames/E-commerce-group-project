import React from 'react'
import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../firebase/firebase.js";
import Profile from './Profile.jsx';


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


  return (
    <div id="main">
      
      {!currentUser &&    
      <>
      <h1>Login to your personal page!</h1>
      <div className="fields">
        <label className='label-login' htmlFor="email">Email</label>
        <input className="input-field" ref={emailRef} placeholder="Email" />

        <label className='label-login' htmlFor="password">Password</label>
        <input className="input-field" ref={passwordRef} type="password" placeholder="Password" />
      </div>
      <div className='btn-wrapper-div'>
          <button className='account-btn' disabled={ loading } onClick={handleSignup}>Sign Up</button>
          <button className='account-btn' disabled={ loading } onClick={handleLogin}>Log In</button>
      </div>
      
      </>
      }

      

      {currentUser &&
       <> 
       <h1>Welcome { currentUser?.email }</h1>
       <div id='status-wrapper'>
       <div id='login-status-txt'>You are logged in as: </div>
       <h3 id='login-status-user'> { currentUser?.email } </h3>
       </div>
       <Profile />
       <div className='btn-wrapper-div'>
          <button className='account-btn' disabled={ loading || !currentUser } onClick={handleLogout}>Log Out</button>
       </div>
      </>
      }

    </div>
  );
}

export default Mypage