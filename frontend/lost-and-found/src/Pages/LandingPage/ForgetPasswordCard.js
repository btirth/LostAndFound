import React, { useState, useEffect } from 'react'

const ForgetPasswordCard = () => {

    const [email, setEmail] = useState('')
    const [done, setDone] = useState(false)

    const handlePostResetPassword = async () => {

        try {
            await userSubmitForgotPassword(email)
            toast.success('Please check your email to continue')
            setDone(true)
        } catch (e) {
            toast.error(e.response?.data || e.message)
        } finally {
            setEmail('')
        }
    }

 

    const handleSubmitForgetPassword = (e) => {
        e.preventDefault()
        if (!email || validator.isEmpty(email)) return toast.error('email is required')
        //To Add: API to reset password
    }

 

    return (
        <Card.Body>
            <Card.Title>Password Reset</Card.Title>
            {
                done ?
                    <Alert variant='success' >
                        Your reset password link has been sent to your email
                    </Alert>
                    :
                    <Form onSubmit={handleSubmitForgetPassword}>
                        <Form.Group >
                            <Form.Label>Account Email</Form.Label>
                            <Form.Control value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} required type='email' placeholder='name@email.com' />
                        </Form.Group>
                        <Button type='submit' className='w-100' >Reset My Password</Button>
                    </Form>
            }
        </Card.Body>
    )

}