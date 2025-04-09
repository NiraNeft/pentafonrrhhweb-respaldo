import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const InputForm = (props) => {
    const { validation, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    let type = props.type || "text";
    let className = "mb-3";
    const [number, setNumber] = useState("");
    
    //Number
    function onNumberChange(e) {
        setNumber(e.target.rawValue);
        validation.setFieldValue(props.id, e.target.rawValue);
    }

    if(props.type == 'money'){
        type = "number";
        //className += " input-group";
    }

    const markup = { __html: props.defaultValue };
    return (
        <div className="mb-3">
            <p className="mb-2 text-uppercase fw-medium fs-12 text-muted">{props.label} <span className="text-danger">{props.labelDanger}</span></p>
            <b><h5 className="fs-15 mb-0" dangerouslySetInnerHTML={markup}></h5></b>
        </div>
    );
}

export const LabelInput = InputForm;LabelInput