import React, { useState, useEffect } from 'react'
import { API_URL } from "../../config/api-end-points";

import { Redirect } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

import { Check } from 'react-bootstrap-icons'
import { storeAccessToken, signup  } from '../../actions/authActions';

import { useDispatch, useSelector } from 'react-redux';

import  FailedAlert from '../../Components/FailedAlert'

// import { Link, Redirect } from 'react-router-dom'

import  SuccessAlert  from '../../Components/SuccessAlert'

import { toast } from 'react-toastify'

import validator from 'validator'
import axios from 'axios'

const SignUpCard = () => {

    const [companyName, setCompanyName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [isEmailSubscribed, setIsEmailSubscribed] = useState(true)
    // const [fleetSize, setFleetSize] = useState(fleetSizeOptions[0])
    const [error, setError] = useState(null);


    const [passwordConditions, setPasswordConditions] = useState(null)

    const [confirmPass, setConfirmPass] = useState(null)
    const dispatch = useDispatch();
    const signupError = useSelector((state) => state.signupError);


    useEffect(() => {

        if (passwordConditions !== null) {

            if (passwordConditions[0].checked === true && passwordConditions[1].checked === true && passwordConditions[2].checked === true && confirmPass === true) {

                const password = document.querySelector('#password').value

                setPassword(password)

            } else {

                setPassword('')

            }

        }

    }, [confirmPass])



    const passwordChecker = (evt) => {

        const pass = evt.currentTarget.value
        const specialChar = new RegExp(/[!@#$%^&*(),.?":{}|<>]/)
        const number = new RegExp(/[0-9]/)

        const prev = [

            {
                text: 'Minimum 8 characters',
                checked: false
            },
            {
                text: 'One special character',
                checked: false
            },
            {
                text: 'One number',
                checked: false
            }

        ]



        if (pass.length < 8) {
            prev[0].checked = false
        } else {
            prev[0].checked = true
        }



        if (!specialChar.test(pass)) {
            prev[1].checked = false
        } else {
            prev[1].checked = true

        }



        if (!number.test(pass)) {
            prev[2].checked = false
        } else {
            prev[2].checked = true
        }

        setPasswordConditions([...prev])

        const cpass = document.querySelector('#confirm-password').value

        if (pass === cpass) {
            setConfirmPass(true)
        } else {
            setConfirmPass(false)
        }
    }



    const confirmPassword = (evt) => {

        const cpass = evt.currentTarget.value
        const password = document.querySelector('#password').value
        if (!cpass.length > 0) return setConfirmPass(null)
        if (password === cpass) {
            setConfirmPass(true)
        } else {
            setConfirmPass(false)
        }

    }




    const handleSubmitSignUp = async (e) => {

        e.preventDefault()
        setError(null);

        try {
            const response = await axios.post('https://dev-3vtey6tugvrs4132.us.auth0.com/dbconnections/signup', {
              client_id: '0UOtlCkeRywKyHbavmcbu6iihiUnwVYI',
              email: email,
              password: password,
              connection: 'Username-Password-Authentication',
              given_name: firstName,
              family_name: lastName,
              name: `${firstName} ${lastName}`,
            });
      
            console.log('Signup successful:', response.data);
            if (response.data) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`};
                  const dataToSend = {
              name: `${firstName} ${lastName}`,
              email: email
                  };
                  axios.post(`${API_URL}/api/v1/user`, dataToSend, { headers })
                    .then(response => {
                      console.log('Data successfully sent:', response.data);
                    })
                    .catch(error => {
                      console.error('Error:', error);
                    });
                
            }
      
            // Clear input fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            window.location = '/login'

            // setError('');
          } catch (error) {
            // Handle errors, e.g., display error messages
            // setError('Error signing up. Please try again.');
            console.error('Error signing up:', error);
            setError('Something went wrong. Please try again.'); 
          }

    }



    return (

        <Card.Body>
            <Card.Title>Welcome</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>} 
      
            <Form className='text-left' onSubmit={handleSubmitSignUp} >
                <Form.Group className='m-1'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required onChange={(e) => setFirstName(e.currentTarget.value)} type='text' placeholder='John' />
                </Form.Group>
                <Form.Group className='m-1'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required onChange={(e) => setLastName(e.currentTarget.value)} type='text' placeholder='Doe' />
                </Form.Group>
                <Form.Group className='m-1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.currentTarget.value)} type='email' placeholder='name@email.com' />
                </Form.Group>
               

                <Form.Group >

                    <Form.Label>Password</Form.Label>
                    {
                        passwordConditions !== null &&
                        passwordConditions.map(({ text, checked }, i) => (
                            <div key={i} className='p-0 m-0'>
                                {
                                    checked ?
                                        <SuccessAlert text={text} /> :
                                        <FailedAlert text={text} />
                                }
                            </div>
                        ))
                    }
                    <Form.Control required autoComplete="new-password" id='password' onChange={passwordChecker} type='password' />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Confirm Password</Form.Label>
                    {
                        confirmPass !== null &&
                        <Alert className='py-0 my-1' variant={confirmPass ? 'success' : 'danger'} >
                            <Check /> <small>{confirmPass ? 'Password matched!' : 'Password not match'}</small>
                        </Alert>

                    }
                    <Form.Control id='confirm-password' required onChange={confirmPassword} type='password' />
                </Form.Group>

                <Button type='submit' className='w-100 mt-3' style={{backgroundColor:'#75e6a3',color:'black'}} >Sign Up</Button>


            </Form>


        </Card.Body>
    );

}



export default SignUpCard;