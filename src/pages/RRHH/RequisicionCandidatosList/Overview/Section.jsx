import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { useSearchParams } from "react-router-dom";

//redux
import { useSelector, useDispatch } from 'react-redux';

//Import Icons
import FeatherIcon from "feather-icons-react";

//import action
import {
    getAspirantesList as onGetAspiranteByID
} from "../../../../slices/thunks";
import { createSelector } from 'reselect';

//import images
import SinData from '../../../../Components/Common/SinData';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import slack from '../../../../assets/images/brands/slack.png';
import OverviewTab from './OverviewTab';
import DocumentsTab from './DocumentsTab';
import ActivitiesTab from './ActivitiesTab';
import TeamTab from './TeamTab';

const Section = () => {
    const dispatch = useDispatch();
        
    const [searchParams, setSearchParams] = useSearchParams();
    const selectDashboardData = createSelector(
        (state) => state.Aspirantes,
        (Aspirantes) => Aspirantes.aspirantesLists
    );
    
    // Inside your component
    const aspiranteData = useSelector(selectDashboardData);
    
    // Get Data Aspirante
    useEffect(() => {
        let search = searchParams.get("Aspirante");
        if(search)
            dispatch(onGetAspiranteByID({ encryptedId: search }));
    }, [dispatch]);

    //Tab 
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    
    return (
        <React.Fragment>
            {aspiranteData ? 
                <>
                <BreadCrumb title="Detalle del Aspirante" pageTitle="Listado" linkTo="/job-candidate-lists" />
                <Row>
                    <Col lg={12}>
                        <Card className="mt-n4 mx-n4">
                            <div className="bg-primary-subtle">
                                <CardBody className="pb-0 px-4">
                                    <Row className="mb-3">
                                        <div className="col-md">
                                            <Row className="align-items-center g-3">
                                                <div className="col-md-auto">
                                                    <div className="avatar-md">
                                                        <div className="avatar-title bg-white rounded-circle">
                                                            <img src={slack} alt="" className="avatar-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div>
                                                        <h4 className="fw-bold">{aspiranteData.NombreCampania}</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div><i className="ri-building-line align-bottom me-1"></i> {aspiranteData.Cliente}</div>
                                                            <div className="vr"></div>
                                                            <div>Create Date : <span className="fw-medium">15 Sep, 2021</span></div>
                                                            <div className="vr"></div>
                                                            <div>Due Date : <span className="fw-medium">29 Dec, 2021</span></div>
                                                            <div className="vr"></div>
                                                            <div className="badge rounded-pill bg-info fs-12">New</div>
                                                            <div className="badge rounded-pill bg-danger fs-12">High</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="hstack gap-1 flex-wrap">
                                                <button type="button" className="btn py-0 fs-16 favourite-btn active">
                                                    <i className="ri-star-fill"></i>
                                                </button>
                                                <button type="button" className="btn py-0 fs-16 text-body">
                                                    <i className="ri-share-line"></i>
                                                </button>
                                                <button type="button" className="btn py-0 fs-16 text-body">
                                                    <i className="ri-flag-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </Row>

                                    <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' }, "fw-semibold")}
                                                onClick={() => { toggleTab('1'); }}
                                                href="#">
                                                Descripción general
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' }, "fw-semibold")}
                                                onClick={() => { toggleTab('2'); }}
                                                href="#">
                                                Documentos
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '3' }, "fw-semibold")}
                                                onClick={() => { toggleTab('3'); }}
                                                href="#">
                                                Actividades
                                            </NavLink>
                                        </NavItem>
                                        {/*<NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '4' }, "fw-semibold")}
                                                onClick={() => { toggleTab('4'); }}
                                                href="#">
                                                Team
                                            </NavLink>
                                        </NavItem>*/}
                                    </Nav>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <TabContent activeTab={activeTab} className="text-muted">
                            <TabPane tabId="1">
                                <OverviewTab aspiranteData={aspiranteData} />
                            </TabPane>
                            <TabPane tabId="2">
                                <DocumentsTab />
                            </TabPane>
                            <TabPane tabId="3">
                                <ActivitiesTab />
                            </TabPane>
                            <TabPane tabId="4">
                                <TeamTab />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
                </>
                : <SinData
                    title='Sin Informacion'
                    pageTitle=''
                    pageInfo='No se encontro informacion'
                    toLink='/e2e-aspirantes-lists'
                    />}
        </React.Fragment>
    );
};

export default Section;