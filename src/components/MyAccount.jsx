import React, { useState, useRef } from 'react'
import '../CSS/MyAccount.css';
import {Card, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {auth} from '../firebase/firebase'
import {onAuthStateChanged, updateEmail} from 'firebase/auth'
import { Link } from 'react-router-dom';
import axios from 'axios';



function MyAccount() {


    const emailRef = useRef();
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});
    const [emailFieldDisabled, setEmailFieldDisabled] = useState(true);
    const [changeEmailButtonText, setChangeEmailButtonText] = useState('Change Email');
    const [changeEmailButtonColor, setChangeEmailButtonColor] = useState({});
    const [newEmailadress, setNewEmailadress] = useState('');
    const [currentErrorMessage, setCurrentErrorMessage] = useState('');
    const [orderHistory, setOrderHistory] = useState([]);
    
    console.log(orderHistory.data)


    onAuthStateChanged (auth, (currentUser) => {
        setCurrentLoggedInUser(currentUser);
    })
    


    const changeEmailHandler = () => {
        
        setEmailFieldDisabled (false)
        setChangeEmailButtonText ('Save new email');
        setChangeEmailButtonColor ({backgroundColor: 'orange'});
        if(changeEmailButtonText === 'Save new email'){
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
            await axios.post ('http://localhost:4000/getOrderHistory', currentLoggedInUser)
        .then(response => {
            setOrderHistory(response)
        })
        .catch(error => {
            console.log(error)
        })
        }
    }

    
        
    
    if(orderHistory.data){
        return(
            <div id="orderHistory">
            <Link to="/MyPage"><button className="back-btn"> Back </button> </Link>
            {orderHistory.data.map((order) => {
            return (
                <div id='order' key={order._id} item={order} className="order">
                <h5>Order number: {order._id}</h5>
                <h5>Products: {order.product.map((individualOrder, index)=>{
                    return(
                        <div id='individualOrders'key={index}>
                            <h6>{individualOrder.name}</h6>
                            <h6>Price: {individualOrder.price}</h6>
                            <h6>Quantity: {individualOrder.quantity}</h6>
                        </div>
                    )
                })}</h5>
                <p className="item-price">Total price: ${order.totalPrice}</p>
                <p>Order date: {order.date.slice(0, 16).replace('T', ' ')}</p>
                </div>
                )
            })}
        </div>
        )
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
                </Form>
                <button onClick={getOrderHistory}>Show orders</button>
            </Card.Body>
        </Card>
        </>
  )
}



export default MyAccount