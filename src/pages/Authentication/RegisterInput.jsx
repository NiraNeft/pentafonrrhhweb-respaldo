import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

const RegisterInput = (props) => {
    const { validation, registrationError, listen } = props;
    let isErrorForm = (validation && validation.touched[props.id] && validation.errors[props.id] ) || false;
    return (
        validation ? (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">*</span></Label>
                <Input
                    id={props.id}
                    name={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values[props.id] || ""}
                    invalid={
                        (validation.touched[props.id] && validation.errors[props.id])
                            || (registrationError && registrationError.errors && registrationError.errors[props.id])
                            ? true : false
                    }
                />
                {isErrorForm ? (
                    <FormFeedback type="invalid"><div>{validation.errors[props.id]}</div></FormFeedback>
                ) : (
                    registrationError && registrationError.errors[props.id] && registrationError.errors ? (
                        <FormFeedback type="invalid"><div>{registrationError.errors[props.id][0]}</div></FormFeedback>
                    ) : null
                )}
            </div>
        ) : (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label}</Label>
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
            </div>
        )
    );
}

export default RegisterInput;