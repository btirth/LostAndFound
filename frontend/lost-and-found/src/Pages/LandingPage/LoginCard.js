import React, { useState, useEffect } from 'react'

import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

import { Link, Redirect } from 'react-router-dom'

import { toast } from 'react-toastify'

import validator from 'validator'



const LoginCard = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailHelper, setEmailHelper] = useState(null)
    const [passwordHelper, setPasswordHelper] = useState(null)

    const btStyle={backgroundColor:'#75e6a3',color:'black'};

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        setPasswordHelper(null)
        setEmailHelper(null)

        if (!email || validator.isEmpty(email)) return toast.error('email is required')

        if (!validator.isEmail(email)) return toast.error('email is not valid')

        if (!password || validator.isEmpty(password)) return toast.error('password is required')


        // To Add: API for login

    }



    // useEffect(() => {

    //     // const loginSuccess = EventBus.on(ACTION_TYPES.USER_LOGIN_SUCCEEDED, handleLoginSuccess)

    //     const loginFailed = EventBus.on(ACTION_TYPES.USER_LOGIN_FAILED, handleLoginFailed)



    //     return () => {

    //         // loginSuccess()

    //         loginFailed()

    //     }

    // }, [])



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
                </div>
            </Form>
            
        </Card.Body>

    )

}


export default LoginCard;