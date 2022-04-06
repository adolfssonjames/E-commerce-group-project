import React, { useState } from 'react'
import { useRef } from 'react';
import {Card, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/MyAccount.css';
import {auth} from '../firebase/firebase'
import {onAuthStateChanged, updateEmail} from 'firebase/auth'
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';



function MyAccount() {
  
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({})
    const [emailFieldDisabled, setEmailFieldDisabled] = useState(true)
    const [changeEmailButtonText, setChangeEmailButtonText] = useState('Change Email')
    const [changeEmailButtonColor, setChangeEmailButtonColor] = useState({})
    const [newEmailadress, setNewEmailadress] = useState('')
    const [currentErrorMessage, setCurrentErrorMessage] = useState('')


    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })

    const { items } = useCart();
    console.log(items)


    const changeEmailHandler = () => {
        
        setEmailFieldDisabled (false)
        setChangeEmailButtonText ('Save new email');
        setChangeEmailButtonColor ({backgroundColor: 'orange'});
        if(changeEmailButtonText == 'Save new email'){
            updateEmail(auth.currentUser, newEmailadress)
            .then(() => {
                setChangeEmailButtonText ('new email saved!');
                setChangeEmailButtonColor ({backgroundColor: 'green'});
            })
            .catch((error) => {
                let errorName = JSON.stringify(error.name + ': ')
                errorName = errorName.slice(1, errorName.length-1)
                let errorMessage = JSON.stringify(error.code)
                errorMessage = errorMessage.slice(1, errorMessage.length-1)
                setCurrentErrorMessage(errorName + errorMessage)
            })
        }
    }


  
  
  
    return (
    <>
    
        <Card className='form-main'>
            <Card.Body className='form-body'>
                
                <Link to="/MyPage"><button className="back-btn"> Back </button> </Link>
                <h2 className='text-center'>My Account</h2>
                
               
                <Form>
                    <Form.Group>
                        <Form.Label className='label' >Current Email</Form.Label>
                        <Form.Control
                            className='input'
                            onChange={(e) => setNewEmailadress(e.target.value)}
                            placeholder={currentLoggedInUser?.email}
                            disabled={emailFieldDisabled} type='email'
                            ref={emailRef}
                            required>
                        </Form.Control>
                        <Button className='w-50' style={changeEmailButtonColor} onClick={changeEmailHandler} variant="primary">{changeEmailButtonText}</Button>
                        <p>{currentErrorMessage}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control className='input' type='password' ref={passwordRef} required></Form.Control>
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