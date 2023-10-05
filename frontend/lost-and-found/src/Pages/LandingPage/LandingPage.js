import React, { useState } from 'react'
import { Navbar, Card, Col, Container, Row } from 'react-bootstrap'
import { Box2Fill } from 'react-bootstrap-icons'

// Images
import LandingPageImg from '../../Assets/Images/landing_page_image.jpg'
import Logo from '../../Assets/Images/LAF-logo.png'

// Components
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'

// import { Link, Redirect } from 'react-router-dom'



function LandingPage() {
    const imgvar = LandingPageImg;
    const box1Style = { backgroundColor: '#75e6a3', color: '#333333', padding: '20px' };
    const box2Style = { backgroundColor: '#75e6a3', color: '#333333', padding: '20px' };

    const [showLoginUp, setShowLoginUp] = useState(false);

    function handleToggleForm(){
        if (showLoginUp){
            setShowLoginUp(false);
        }else{
            setShowLoginUp(true);
        }
    }

    return (
        <div className='landing-main' >
            <Navbar>
                <Navbar.Brand href="#"><img width={200} src={Logo} /></Navbar.Brand> 

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href="#about">About Us</a>
                    </Navbar.Text>
                    <br />
                    <Navbar.Text className="ml-5">
                        <a href="#contact">Contact</a>
                    </Navbar.Text>
                </Navbar.Collapse>
        
            </Navbar>
            <Container fluid>

                <Row>
                    <Col lg={6} md={12} xs={12} className='pt-3 d-flex flex-column justify-content-center align-items-center px-4' >
                        <img src={LandingPageImg} alt="Image" className="img-fluid" />
                        {/* <h1>Hello World</h1> */}
                    </Col>
                    <Col lg={{ span: 6, order: 'last' }} md={{ span: 12, order: 'first' }} xs={{ span: 12, order: 'first' }} className='d-flex justify-content-center align-items-center px-2' >
                        <Card className='w-75 border shadow'>
                            {
                                // formMode === FORM_MODE_ENUM.RESET_PASSWORD ?

                                //     <ForgetPasswordCard />

                                //     :
                                showLoginUp ? <LoginCard /> : <SignUpCard />
                                
                            }
                            <h6 className='mt-3'>{showLoginUp ? 'Don\'t have an account? ' : 'Already have an account? '}<a style={{textDecoration: 'underline', color: 'blue' }} onClick={handleToggleForm}>Click here</a></h6>
                            {/* <Button variant='link' size='sm' onClick={handleToggleForm} className='mb-3 mx-4' >{showLoginUp ? 'New User' : 'Already has an account?'} </Button> */}
                        </Card>
                    </Col>
                </Row>
                <Row className="text-center" style={box1Style}>
                    <Col >
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 1</h1>
                    </Col>
                    <Col>
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 2</h1>
                    </Col>
                    <Col>
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 3</h1>
                    </Col>
                </Row>
                <Row className="text-center" style={box2Style}>
                    <Col>
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 1</h1>
                    </Col>
                    <Col>
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 2</h1>
                    </Col>
                    <Col>
                        <Box2Fill style={{ fontSize: '48px' }} />
                        <h1>Text 3</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage;