import React, { useEffect } from "react"
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import error from "../../assets/images/error.svg";

const SinInformacion = ({ title, subtitle, descripcion }) => {

    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center pt-4">
                                    <div className="">
                                        <img src={error} alt="" className="error-basic-img move-animation" />
                                    </div>
                                    <div className="mt-n4">
                                        <h1 className="display-1 fw-medium">{title}</h1>
                                        <h3 className="text-uppercase">{subtitle}</h3>
                                        <p className="text-muted mb-4">{descripcion}</p>
                                        {/*
                                        <Link to="/dashboard" className="btn btn-secondary"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                                        */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SinInformacion;