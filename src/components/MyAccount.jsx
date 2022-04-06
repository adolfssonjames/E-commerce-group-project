import React, { useState, useRef } from 'react'
import '../CSS/MyAccount.css';
import {Card, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {auth} from '../firebase/firebase'
import {onAuthStateChanged, updateEmail} from 'firebase/auth'
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import axios from 'axios';


function MyAccount() {


    const emailRef = useRef();
    const passwordRef = useRef();
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});
    const [emailFieldDisabled, setEmailFieldDisabled] = useState(true);
    const [changeEmailButtonText, setChangeEmailButtonText] = useState('Change Email');
    const [changeEmailButtonColor, setChangeEmailButtonColor] = useState({});
    const [newEmailadress, setNewEmailadress] = useState('');
    const [currentErrorMessage, setCurrentErrorMessage] = useState('');
    const [orderHistory, setOrderHistory] = useState({});
    console.log(orderHistory)



    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })

    const { items } = useCart();
    


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


    const getOrderHistory = async () => {
        

        if(Object.keys(currentLoggedInUser).length === 0){
             console.log('Wait for currentLoggedInUser to be populated')
        }else{
            await axios.post ('http://localhost:5000/getOrderHistory', currentLoggedInUser)
        .then(response => {
            setOrderHistory(response)
        })
        .catch(error => {
            console.log(error)
        })
        }
    }
    





  
  
  
    return (
    <>
    
        <Card>
            <Card.Body>
                
                <Link to="/MyPage"><button className="back-btn"> Back </button> </Link>
                <h2 className='text-center'>My Account</h2>
                
               
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
                        <Button style={changeEmailButtonColor} onClick={changeEmailHandler} variant="primary">{changeEmailButtonText}</Button>
                        <p>{currentErrorMessage}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button className='w-50' type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        <table className='.table'>
            <tbody>
            <tr>
                <th onClick={getOrderHistory}>test</th>
            </tr>
            </tbody>
        </table>
    
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