import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import { 
    Accordion,
    AccordionBody, AccordionHeader, AccordionItem,
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

export const FormAccordionApi = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    // Variables de Accordion
    const { config } = props;
    const { validation, slicesObj } = ValidationFormik(config, dispatch, history);
    
    // Default Accordion
    const [openDefault, setOpenDefault] = useState('');
    const toggleDefault = (id) => {
        if (openDefault !== id) {
            setOpenDefault(id);
        } else {
            setOpenDefault('0');
        }
    };
    
    return (<Form 
        onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
        }}
        action="#"
        autoComplete="off" className="tablelist-form">
        <Row>
            <Col xxl={12}>
                <div className="live-preview">
                    <Accordion 
                        id="default-accordion-example" 
                        open={openDefault} 
                        toggle={toggleDefault}>
                        {config.useFormik.groupValues.map((g, k) => (<AccordionItem key={k}>
                            <AccordionHeader targetId={k}>
                                <i className={g.icon + " fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"}></i>
                                {g.modalIndicaciones.title}
                            </AccordionHeader>
                            <AccordionBody accordionId={k}>
                                <InputsFrontApi
                                    config={{
                                        useFormik: { values: { ...g.values } }
                                    }}
                                    validation={validation}
                                    slicesObj={slicesObj} />
                            </AccordionBody>
                        </AccordionItem>))}
                    </Accordion>
                </div>
            </Col>
        </Row>
    </Form>);
}