import React from "react";
import { useState } from "react";
import {auth} from '../firebase/firebase'
import {onAuthStateChanged} from 'firebase/auth'



export default function Order() {


    const [loggedInUser, setCurrentLoggedInUser] = useState({})

    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })

	return (
		<div>
            <h2>Thank you!  </h2>
            <h3>Your Order have successfully been created</h3>
            <p>An email with your order information have been sent to {loggedInUser}</p>

		
		</div>
	)
}