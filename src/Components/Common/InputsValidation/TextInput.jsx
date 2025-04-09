import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const InputForm = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, isInvalidListen, Feedback } = ValidationApi(props);
    let type = props.type || "text";
    let className = "mb-3";
    const [number, setNumber] = useState("");
    
    //Number
    function onNumberChange(e) {
        setNumber(e.target.rawValue);
        if(validation)
            validation.setFieldValue(props.id, e.target.rawValue);
        else
            listen.setFieldValue(props.id, e.target.rawValue);
    }

    if(props.type == 'money'){
        type = "number";
        //className += " input-group";
    }
    if(isInvalidForm || isErrorApi){
        //className += " form-control is-invalid " ;
    }
    
    return (
        validation ? (
            <div className={className}>
                {props.label != "" ? <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">{props.labelDanger} *</span></Label> : null}
                { (props.type == 'money') ?
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <Cleave
                            placeholder={props.placeholder}
                            options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand'
                            }}
                            value={number}
                            onChange={e => onNumberChange(e)}
                            className="form-control"
                            />
                    </div>
                    : <Input
                        id={props.id}
                        name={props.id}
                        type={type}
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values[props.id] || ""}
                        invalid={ (isErrorApi || isInvalidForm) ? true : false }
                        /> }
                        
                {Feedback}
            </div>
        ) : (
            <div className={className}>
                {props.label != "" ? <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">{props.labelDanger}</span></Label> : null}
                { (props.type == 'money') ?
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <Cleave
                            placeholder={props.placeholder}
                            options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand'
                            }}
                            value={number}
                            onChange={e => onNumberChange(e)}
                            className="form-control"
                            />
                    </div>
                    : <Input
                        id={props.id}
                        name={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}
                        onChange={listen.handleChange}
                        onBlur={listen.handleBlur}
                        value={listen.values[props.id] || ""}
                        invalid={ (isInvalidForm || isErrorApi) ? true : false }/> }
                
                {Feedback}
            </div>
        )
    );
}

export const TextInput = InputForm;