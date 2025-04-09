import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//import images
import logoLight from "../../assets/images/pentafon.png";

const RegisterSuccess = () => {
    document.title = "Registro | Pentafon";
    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <ParticlesAuth>
                    <div className="auth-page-content mt-lg-5">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center mt-sm-5 mb-4 text-white-50">
                                        <div>
                                            <Link to="/" className="d-inline-block auth-logo">
                                                <img src={logoLight} alt="" height="100" />
                                            </Link>
                                        </div>
                                        <p className="mt-3 fs-15 fw-medium"></p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5}>
                                    <Card className="mt-4">
                                        <CardBody className="p-4 text-center">
                                            <div className="avatar-lg mx-auto mt-2">
                                                <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                                    <i className="ri-checkbox-circle-fill"></i>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-2">
                                                <h4>Registro exitoso</h4>
                                                <p className="text-muted mx-4">Recibirás un correo electrónico con las instrucciones..</p>
                                                <div className="mt-4">
                                                    <Link to="/login" className="btn btn-secondary w-100">Volver al inicio de sesión</Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ParticlesAuth>
            </div>
        </React.Fragment >
    );
};

export default RegisterSuccess;