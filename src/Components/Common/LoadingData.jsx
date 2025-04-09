import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Collapse, Container, Row } from 'reactstrap';

const LoadingData = ({ title, pageTitle, pageInfo, toLink }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{title}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                </Col>
                <Col md={4}>
                    <Card className="card-info">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 ms-3">
                                    <p className="card-text">{pageInfo}</p>
                                </div>
                            </div>
                        </CardBody>
                        <div className="card-footer">
                            <div className="text-center">
                                <Link to={toLink} className="link-light">Regresar <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default LoadingData;