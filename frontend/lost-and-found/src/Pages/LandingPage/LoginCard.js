import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import { ApiRequest } from '../../helpers/api-request';
import axios from 'axios';



const LoginCard = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [emailHelper, setEmailHelper] = useState(null)
    const [passwordHelper, setPasswordHelper] = useState(null)

    const btStyle = { backgroundColor: '#35ac65', color: 'white' };

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        setPasswordHelper(null)
        setEmailHelper(null)

        if (!email || validator.isEmpty(email)) return toast.error('email is required')

        if (!validator.isEmail(email)) return toast.error('email is not valid')

        if (!password || validator.isEmpty(password)) return toast.error('password is required')            
           

            // Store the access token in local storage or a secure storage method
                ApiRequest.fetch({
                    method: 'post',
                    url: `https://dev-3vtey6tugvrs4132.us.auth0.com/oauth/token`,
                   data : {grant_type: 'password',
                    username: email,
                    password: password,
                    client_id: '0UOtlCkeRywKyHbavmcbu6iihiUnwVYI',}
                }).then((response) => {
            const accessToken = response.id_token;
            
            if (accessToken != null) {
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${response.access_token}`
                };            

                axios.get('https://dev-3vtey6tugvrs4132.us.auth0.com/userinfo',
                {headers}).then((userDataResponse)=>{

                    localStorage.setItem('username', userDataResponse.data.name);
                    localStorage.setItem('access_token', accessToken);
                    localStorage.setItem('user_email', email);

                    window.location = '/home'
                    setErrorMessage(null);
                }).catch(uerror => {  setErrorMessage('An error occurred during login');})

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('user_email', email);
                setErrorMessage(null);
            }
            
        }).catch(error => { 
            setErrorMessage(error?.errorMessages?.error_description || 'An error occurred during login');
    })


    }


    return (

        <Card.Body>
            <Card.Title>Welcome Back</Card.Title>
            <Form onSubmit={handleSubmitLogin}>
                <Form.Group className="text-left">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} required type='email' placeholder='name@email.com' />
        
                </Form.Group>
                <Form.Group className="text-left">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(evt) => setPassword(evt.currentTarget.value)} required id='password' type='password' />
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