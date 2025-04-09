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
                <Input
                    id={props.id}
                    name={props.id}
                    type='file'
                    placeholder={props.placeholder}
                    onChange={(event) => {
                        const files = event.target.files;
                        let myFiles = Array.from(files);
                        if(myFiles.length > 0){
                            validation.setFieldValue(props.id, myFiles[0]);
                            //validation.handleChange(event);
                        } else {
                            validation.setFieldValue(props.id, "");
                        }
                    }}
                    onBlur={validation.handleBlur}
                    invalid={ (isErrorApi || isInvalidForm) ? true : false }
                />
                {Feedback}
            </div>
        ) : (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label}</Label>
                <Input
                    id={props.id}
                    name={props.id}
                    type='file'
                    placeholder={props.placeholder}
                    onChange={listen.handleChange}
                    onBlur={listen.handleBlur}
                    value={listen.values[props.id] || ""}
                />
            </div>
        )
    );
}

export const FileInput = InputForm;