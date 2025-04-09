import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const InputForm = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    return (
        validation ? (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">*</span></Label>
                <div className="input-group">
                    <Input
                        id={props.id}
                        name={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values[props.id] || ""}
                        invalid={ (isErrorApi || isInvalidForm) ? true : false }
                    />
                    <button className="btn btn-outline-info" type="button" onClick={() => props.onClickSearch(validation.values[props.id] || "")}>
                        {props.lbBtn ? props.lbBtn : "Buscar"}
                    </button>
                </div>
                
                {Feedback}
            </div>
        ) : (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label}</Label>
                <div className="input-group">
                    <Input
                        id={props.id}
                        name={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}
                        onChange={listen.handleChange}
                        onBlur={listen.handleBlur}
                        value={listen.values[props.id] || ""}
                    />
                    <button className="btn btn-outline-info" type="button" onClick={() => props.onClickSearch(validation.values[props.id] || "")}>
                        {props.lbBtn ? props.lbBtn : "Buscar"}
                    </button>
                </div>
                
            </div>
        )
    );
}

export const TextBtnInput = InputForm;