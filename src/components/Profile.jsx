import { useEffect, useState } from "react";
import { useAuth, upload } from "../firebase/firebase";
import { Link } from 'react-router-dom';
import '../CSS/Mypage.css';



export default function Profile()  {
    const currentUser = useAuth();
    const [photo, setPhoto] = useState (null);
    const [loading, setLoading] = useState (false);
    const [photoURL, setPhotoURL] = useState("https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE=");

    function handleChange(e) {
       if (e.target.files[0]) {
           setPhoto(e.target.files[0])
       }
    }

    function handleClick () {
        upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
        if (currentUser?.photoURL) {       
            setPhotoURL(currentUser.photoURL);
         }

    },[currentUser])

    

    return(
        <div className="profile-main">
          <h1 id='welcome-user'>Welcome { currentUser?.email }</h1>
          <div className="profile">
            <div className='wrapper-div'>
                <img src={photoURL}
                     alt="avatar"
                    id="user-avatar"/>
                <h4 id='login-status-user'> { currentUser?.email } </h4>
                
                    <div className="upload-wrapper">
                       <input id="file-input" type="file"  onChange={handleChange} />
                        <button id='avatar-btn' disabled={loading || !photo} onClick={handleClick}>Upload avatar</button>
                    </div>
                    <Link to="/MyAccount"><button className="my-acc-btn"> My Account</button> </Link>
            </div>
                
           
           
          </div>
            
                
        </div>


    );
}