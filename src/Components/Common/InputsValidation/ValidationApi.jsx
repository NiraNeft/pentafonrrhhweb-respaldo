import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { replace } from "react-router-dom";

export const ValidationApi = (props) => {
    const { validation, registrationError, listen } = props;
    let isInvalidForm = (validation && validation.touched[props.id] && validation.errors[props.id]) ? true : false;
    let isInvalidListen = (listen && listen.touched[props.id] && listen.errors[props.id]) ? true : false;
    let isErrorApi = (registrationError && registrationError.errors && registrationError.errors[props.id.replace(/[-]/g, ".")] ) || false;
    
    let Feedback = (isErrorApi ? (
        <FormFeedback type="invalid"><div>
            {console.log(props.id, isErrorApi)}
            {isErrorApi[0] ? isErrorApi[0] : isErrorApi}
        </div></FormFeedback>
    ) : (
        isInvalidForm ? (
            <FormFeedback type="invalid"><div>{validation.errors[props.id]}</div></FormFeedback>
        ) : (
            isInvalidListen 
                ? <FormFeedback type="invalid"><div>{listen.errors[props.id]}</div></FormFeedback>
                : null
        )
    ));
    return {
        isInvalidForm, isErrorApi, isInvalidListen, Feedback 
    };
}