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
      <h1>Login to your personal page!</h1>
      
      {!currentUser &&    
      <>
      <div className="fields">
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>

      <button disabled={ loading } onClick={handleSignup}>Sign Up</button>
      <button disabled={ loading } onClick={handleLogin}>Log In</button>
      
      </>
      }

      

      {currentUser &&
       <> 
       <div>You are logged in as: { currentUser?.email } </div>
       <Profile />
       <button disabled={ loading || !currentUser } onClick={handleLogout}>Log Out</button>
      </>
      }

    </div>
  );
}

export default Mypage