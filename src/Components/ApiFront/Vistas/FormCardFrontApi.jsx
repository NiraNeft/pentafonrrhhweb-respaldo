import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import { 
    Modal, ModalBody, ModalHeader, 
    CardHeader, CardBody, CardFooter,
    Form, Input, Label, Button, Alert,
    TabPane, Row, Col, Card, TabContent
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

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

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const FormCardFrontApi = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const { config } = props;
    const { validation, slicesObj } = ValidationFormik(config, dispatch, history);
    
    const closeToggle = () => {
        dispatch(config.function.reset());
        config.function.closed();
    }
    
    return (<Form 
        onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
        }}
        action="#"
        autoComplete="off" className="tablelist-form">
        { config.titles.modalHeader ? <CardHeader className={"card-header bg-"+config.titles.modalHeader.color+"-subtle" }>
            <h5 className="card-title mb-0" >
                {config.titles.modalHeader.title}
            </h5>
        </CardHeader> : null }
        <CardBody className="card-body">
            { config.titles.modalIndicaciones ? <div className="mt-2 text-center">
                <lord-icon
                    src="https://cdn.lordicon.com/gsqxdxog.json"
                    trigger="loop"
                    colors="primary:#f7b84b,secondary:#f06548"
                    style={{ width: "100px", height: "100px" }}></lord-icon>
                <div className="mt-4 pt-2 fs-15 mx-10 mx-sm-8">
                    <h4>{config.titles.modalIndicaciones.title}</h4>
                    <p className="text-muted mx-4 mb-0">{config.titles.modalIndicaciones.msg}</p>
                </div>
            </div>: null}
            
            <InputsFrontApi
                config={config}
                validation={validation}
                slicesObj={slicesObj} />
        </CardBody>
        <CardFooter className="modal-footer hstack mb-5 mt-1 pr-3">
            <div className="hstack gap-2 justify-content-end mb-5">
                <Button
                    type="button"
                    className="btn btn-light"
                    onClick={closeToggle}>Cancelar</Button>
                <Button
                    color={config.titles.btnSubmitColor ? config.titles.btnSubmitColor : "success"}
                    type="submit"
                    id="add-btn">{config.titles.btnSubmit}</Button>
            </div>
        </CardFooter>
    </Form>);
}