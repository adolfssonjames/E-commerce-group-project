
//////////////////////////////// Backend för login / register modul. Gjord med firebase //////////////////////////////

import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2mw8A9vE-ZSCr6mTyBp45lx6_yEVcRW8",
  authDomain: "react-projekt-login.firebaseapp.com",
  projectId: "react-projekt-login",
  storageBucket: "react-projekt-login.appspot.com",
  messagingSenderId: "940131495602",
  appId: "1:940131495602:web:b23a517a0629acc79263ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); 
const storage = getStorage(app);


export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth);
}

export function resetpassword(email) {

    return sendPasswordResetEmail(auth, email);
}


//custom hook
export function useAuth() {
    const [ currentUser, setCurrentUser ] = useState();


    useEffect(() => {
       const unsub = onAuthStateChanged(auth, user =>  setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;

}


////// STORAGE
export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');
  
    setLoading(true);
    
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  
    updateProfile(currentUser, {photoURL});
    
    setLoading(false);
    alert("file has been uploaded");
  }