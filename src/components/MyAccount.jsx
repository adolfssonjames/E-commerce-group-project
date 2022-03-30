import React from 'react'
import { useRef } from 'react';
import '../CSS/MyAccount.css';
import {Card, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyAccount() {
  
    const emailRef = useRef()
    const passwordRef = useRef()
  
  
  
    return (
    <>
        <Card>
            <Card.Body>
                <h2 classname='text-center mb-4'>My Account</h2>
                <Form>
                    <Form.Group id='currentEmail'>
                        <Form.Label>Current Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='currentPassword'>
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