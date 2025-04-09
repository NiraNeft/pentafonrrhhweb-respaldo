import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import { 
    Button, Alert,
    Container,
    Form,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    CardFooter
} from "reactstrap";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Entradas de Datos
import {
    LabelInput,
    TextInput,
    TextBtnInput,
    SelectInput,
    BinarioInput,
    EditorInput,
    RangeDateInput
} from "../../Common/InputsValidation";
import ValidationFormik from "../ValidationFormik";
import InputsFrontApi from "../InputsFrontApi";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";

export const FormTabContentFrontApi = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const { config } = props;
    const { validation, slicesObj } = ValidationFormik(config, dispatch, history);
    const totalNav = config.useFormik.groupValues.length;
    
    
    const closeToggle = () => {
        dispatch(config.function.reset());
        config.function.closed();
    }

    // Control de Nav
    const [activeTab, setactiveTab] = useState(0);
    const [passedSteps, setPassedSteps] = useState([0]);

    function toggleTab(tab) {
      if (activeTab !== tab) {
        var modifiedSteps = [...passedSteps, tab];
        if (tab >= 0 && tab < totalNav) {
          setactiveTab(tab);
          setPassedSteps(modifiedSteps);
        }
      }
    }
    
    return (<Form 
        onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
        }}
        action="#"
        autoComplete="off" className="tablelist-form">
        <Row>
            <Col xl="10">
                <Card>
                    <CardBody className="checkout-tab">
                        
                        <InputsFrontApi
                            config={config}
                            validation={validation}
                            slicesObj={slicesObj} />
                        
                        <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
                            <Nav
                                className="nav-pills nav-justified custom-nav"
                                role="tablist"
                                >
                                {config.useFormik.groupValues.map((g, k) => (<NavItem key={k} role={g.role}>
                                    <NavLink href="#"
                                        className={classnames({ 
                                            active: activeTab === k, 
                                            done: (activeTab <= totalNav && activeTab >= 0) 
                                        }, "p-3 fs-15")}
                                        onClick={() => { toggleTab(k); }}
                                        >
                                        <i className={g.icon + " fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"}></i>
                                        {g.title}
                                    </NavLink>
                                </NavItem>))}
                            </Nav>
                        </div>

                        <TabContent activeTab={activeTab}>
                            {config.useFormik.groupValues.map((g, k) => (<TabPane key={k} tabId={k} id={g.role+"-info"}>
                                {g.modalIndicaciones ? <div>
                                    <h5 className="mb-1">{g.modalIndicaciones.title}</h5>
                                    <p className="text-muted mb-4">{g.modalIndicaciones.msg}</p>
                                </div> : null }

                                <div>
                                    <InputsFrontApi
                                        config={{
                                            useFormik: { values: { ...g.values } }
                                        }}
                                        validation={validation}
                                        slicesObj={slicesObj} />
                                    <div className="d-flex align-items-start gap-3 mt-3">
                                        {activeTab > 0 ? <button
                                            type="button"
                                            className="btn btn-light btn-label previestab"
                                            onClick={() => {
                                                toggleTab(activeTab - 1);
                                            }}
                                            >
                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                            Regresar
                                        </button> : null}

                                        {activeTab < totalNav - 1 ? <button
                                            type="button"
                                            className="btn btn-secondary btn-label right ms-auto nexttab"
                                            onClick={() => {
                                                toggleTab(activeTab + 1);
                                            }}
                                            >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                            Siguiente
                                        </button> : null }
                                    </div>
                                </div>
                            </TabPane>))}
                        </TabContent>
                        
                    </CardBody>
                </Card>
            </Col>

            <Col xl="2">
              <Card>
                <CardHeader>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Control</h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive table-card">
                    <table className="table table-borderless align-middle mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">
                            
                          </th>
                          <th style={{ width: "90px" }} scope="col" className="text-end">
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(config.titles.btnExtras || []).map((e, k) => (<tr key={k}>
                            <td colSpan={2}>
                                <button
                                    type="button"
                                    className={"btn "+e.className+" right nexttab"}
                                    onClick={() => {
                                        e.onClick(validation);
                                    }}>
                                    {e.label}
                                </button>
                            </td>
                        </tr>))}
                        
                        <tr>
                            <td colSpan={2}>
                                <Button
                                    color={config.titles.btnSubmitColor ? config.titles.btnSubmitColor : "success"}
                                    type="submit"
                                    id="add-btn">{config.titles.btnSubmit}</Button>
                            </td>
                        </tr>
                        <tr className="table-active">
                            <th colSpan={2}>
                                <button
                                    type="button"
                                    className="btn btn-light right ms-auto nexttab"
                                    onClick={closeToggle}>
                                    Regresar
                                </button>
                            </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>
    </Form>);
}