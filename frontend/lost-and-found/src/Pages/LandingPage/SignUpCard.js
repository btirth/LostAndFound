import React, { useState, useEffect } from 'react'

import { Alert, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

import { Check } from 'react-bootstrap-icons'

// import { Link, Redirect } from 'react-router-dom'

// import { FailedAlert, SuccessAlert } from '../../components'

import { toast } from 'react-toastify'

import validator from 'validator'

const SignUpCard = () => {

    const [companyName, setCompanyName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [isEmailSubscribed, setIsEmailSubscribed] = useState(true)
    // const [fleetSize, setFleetSize] = useState(fleetSizeOptions[0])



    const [passwordConditions, setPasswordConditions] = useState(null)

    const [confirmPass, setConfirmPass] = useState(null)



    // useEffect(() => {

    //     if (passwordConditions !== null) {

    //         if (passwordConditions[0].checked === true && passwordConditions[1].checked === true && passwordConditions[2].checked === true && confirmPass === true) {

    //             const password = document.querySelector('#password').value

    //             setPassword(password)

    //         } else {

    //             setPassword('')

    //         }

    //     }

    // }, [confirmPass])



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



    // if (props.user.jwtToken) {

    //     toast.success(`Welcome ${props.user.firstName}!`)

    //     // return window.location.pathname = "/"

    //     return <Redirect to='/' />

    // }



    const handleSubmitSignUp = (e) => {

        e.preventDefault()
        if (!companyName || validator.isEmpty(companyName)) return toast.warn('CompanyName is required')

        if (!firstName || validator.isEmpty(firstName)) return toast.warn('firstName is required')

        if (!lastName || validator.isEmpty(lastName)) return toast.warn('lastName is required')

        if (!email || validator.isEmpty(email)) return toast.warn('email is required')

        if (!validator.isEmail(email)) return toast.warn('email is not valid')

        if (!password || validator.isEmpty(password)) return toast.warn('password not valid')



        if (!phone || validator.isEmpty(password)) return toast.warn('password not valid')

        const phone_number = phone.startsWith('0') ? `+6${phone}` : `+60${phone}`



        // props.requestUserSignUp({

        //     companyName,

        //     firstName,

        //     lastName,

        //     email,

        //     password,

        //     phone_number,

        //     fleetSize,

        //     isEmailSubscribed

        // })

    }



    return (

        <Card.Body>
            <Card.Title>Welcome</Card.Title>

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
                <Form.Group>
                    <Form.Label>Phone No.</Form.Label>
                    <InputGroup>
                        {/* <InputGroup.Prepend>
                            <InputGroup.Text>+1</InputGroup.Text> 
                        </InputGroup.Prepend> */}
                        <Form.Control required onChange={(e) => setPhone(e.currentTarget.value)} type='tel' pattern='[0-9]{7,11}' placeholder='123456789' />
                    </InputGroup>
                </Form.Group>

                <Form.Group >

                    <Form.Label>Password</Form.Label>
                    {
                        passwordConditions !== null &&
                        passwordConditions.map(({ text, checked }, i) => (
                            <div key={i} className='p-0 m-0'>
                                {
                                    checked
                                    // checked ?
                                    //     <SuccessAlert text={text} /> :
                                    //     <FailedAlert text={text} />
                                }
                            </div>
                        ))
                    }
                    <Form.Control required id='password' onChange={passwordChecker} type='password' />
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