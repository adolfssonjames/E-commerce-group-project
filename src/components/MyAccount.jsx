import React, { useState } from 'react'
import { useRef } from 'react';
import '../CSS/MyAccount.css';
import {Card, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {auth} from '../firebase/firebase'
import {onAuthStateChanged, updateEmail} from 'firebase/auth'


function MyAccount() {
  
    

    const emailRef = useRef()
    const passwordRef = useRef()
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({})
    const [emailFieldDisabled, setEmailFieldDisabled] = useState(true)
    const [changeEmailButtonText, setChangeEmailButtonText] = useState('Change Email')
    const [changeEmailButtonColor, setChangeEmailButtonColor] = useState({})
    const [newEmailadress, setNewEmailadress] = useState('')
    console.log(newEmailadress)

    

    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })




    const changeEmailHandler = () => {
        
        setEmailFieldDisabled (false)
        setChangeEmailButtonText ('Save new email');
        setChangeEmailButtonColor ({backgroundColor: 'orange'});
        if(changeEmailButtonText == 'Save new email'){
            updateEmail(auth.currentUser, newEmailadress)
            setChangeEmailButtonText ('new email saved!');
            setChangeEmailButtonColor ({backgroundColor: 'green'});
        }
    }







  
  
  
    return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>My Account</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Current Email</Form.Label>
                        <Form.Control
                            onChange={(e) => setNewEmailadress(e.target.value)}
                            placeholder={currentLoggedInUser?.email}
                            disabled={emailFieldDisabled} type='email'
                            ref={emailRef}
                            required>
                        </Form.Control>
                        <Button id='test' style={changeEmailButtonColor} onClick={changeEmailHandler} variant="primary">{changeEmailButtonText}</Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button className='w-50' type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        
    </>
  )
}

//style={{backgroundColor: 'black'}}

/*<div>
        <form className='test'>
            <label htmlFor="updateEmailInputField">email:</label>
            <input type="text" id="updateEmailInputField"/>
            <button>update email</button>
            <label htmlFor="updatePasswordInputField">password: </label>
            <input type="text" id="updatePasswordInputField"/>
            <button>update password</button>
        </form>

        <table>
            <tr>
                <th>Orders</th>
            </tr>
        </table>
    </div>*/

export default MyAccount