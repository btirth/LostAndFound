import React, { useState, useEffect } from 'react'

import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom'

import { toast } from 'react-toastify'

import validator from 'validator'
import axios from 'axios'



const LoginCard = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [emailHelper, setEmailHelper] = useState(null)
    const [passwordHelper, setPasswordHelper] = useState(null)

    const btStyle={backgroundColor:'#75e6a3',color:'black'};

    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        setPasswordHelper(null)
        setEmailHelper(null)

        if (!email || validator.isEmpty(email)) return toast.error('email is required')

        if (!validator.isEmail(email)) return toast.error('email is not valid')

        if (!password || validator.isEmpty(password)) return toast.error('password is required')

        try {
            const response = await axios.post('https://dev-3vtey6tugvrs4132.us.auth0.com/oauth/token', {
              grant_type: 'password',
              username: email,
              password: password,
              client_id: '0UOtlCkeRywKyHbavmcbu6iihiUnwVYI',
            });
      
            const accessToken = response.data.id_token;
      
            // Store the access token in local storage or a secure storage method
            localStorage.setItem('access_token', accessToken);
            
            setErrorMessage(null);
          
            window.location = '/home'

    
          } catch (error) {
            // Handle login errors
            setErrorMessage(error.response?.data?.error_description || 'An error occurred during login');
    
          
          }

    }




    const handleLoginFailed = ({ errorMessages }) => {

        if (errorMessages === "Invalid password") {
            setPasswordHelper(errorMessages)
        }

        if (errorMessages === 'Admin user not found') {
            setEmailHelper(errorMessages)
        }

    }

    return (

        <Card.Body>
            <Card.Title>Welcome Back</Card.Title>
            <Form onSubmit={handleSubmitLogin}>
                <Form.Group className="text-left">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} required type='email' placeholder='name@email.com' />
                    {/* {

                        emailHelper
                        //  &&
                        // <FailedAlert text={emailHelper} />

                    } */}

                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(evt) => setPassword(evt.currentTarget.value)} required id='password' type='password' />
                    {/* {

                        passwordHelper 
                        // &&
                        // <FailedAlert text={passwordHelper} />

                    } */}
                </Form.Group>
                <div style={{ marginTop: '10px' }}>
                    <Button type='submit' className='w-100' style={btStyle} >Sign In</Button>
                    {errorMessage && (
            <Alert variant="danger" style={{ marginTop: '10px' }}>
              {errorMessage}
            </Alert>)}
                </div>
            </Form>
            
        </Card.Body>

    )

}


export default LoginCard;