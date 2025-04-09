import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const InputForm = (props) => {
    const { validation, listen } = props;
    const { isInvalidForm, isErrorApi, isInvalidListen, Feedback } = ValidationApi(props);
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
    
    return (<div className="mb-3">
        <p className="form-label">&ensp;</p>
        <Button
            id={props.id}
            color="success"
            type="button"
            className="add-btn "
            data-bs-toggle="modal"
            onClick={props.onClick}>
            {props.label}
        </Button>
    </div>);
}

export const BtnInput = InputForm;