import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { ValidationApi } from './ValidationApi';

const FileInput = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    let className = "btn-group flex-wrap";
    let valueActual = validation.values[props.id];
    
    if(isInvalidForm || isErrorApi){
        className += " form-control is-invalid " ;
    }
    
    return (
        validation ? (
            <div className="mb-3">
                <p className="form-label">{props.label} <span className="text-danger">*</span></p>
                <div className="input-group mt-0 pt-0 fs-15 mx-1 mx-sm-1">
                    <div className={className}>
                        {(props.options || []).map((e, k) => (<div key={k}>
                            <Input
                                key={k + 10000}
                                id={props.id+"_"+k}
                                name={props.id}
                                type="radio"
                                className="btn-check"
                                onChange={validation.handleChange}
                                checked={valueActual == e.value}
                                value={e.value} />
                            <Label key={k} className="btn btn-outline-dark" for={props.id+"_"+k}>
                                {e.label}
                            </Label>
                        </div>))}
                    </div>
                </div>
                {Feedback}
            </div>
        ) : (
            <div className="mb-3">
                <Row className="gy-3">
                    <Col md={8}>
                        <Label className="form-label">{props.label}</Label>
                    </Col>
                    <Col md={2}>
                        <Input
                            id={props.id+"_si"}
                            name={props.id}
                            type="radio"
                            className="btn-check"
                            placeholder={props.placeholder}
                            onChange={listen.handleChange}
                            onBlur={listen.handleBlur}
                            value="1"/>
                        <Label className="btn btn-outline-success" for={props.id+"_si"}>Sí</Label>
                    </Col>
                    <Col md={2}>
                        <Input
                            id={props.id+"_no"}
                            name={props.id}
                            type="radio"
                            className="btn-check"
                            placeholder={props.placeholder}
                            onChange={listen.handleChange}
                            onBlur={listen.handleBlur}
                            value="2"/>
                        <Label className="btn btn-outline-danger" for={props.id+"_no"}>No</Label>
                    </Col>
                </Row>
                {isErrorApi ? (
                    <FormFeedback type="invalid"><div>{registrationError.errors[props.id][0]}</div></FormFeedback>
                ) : null}
            </div>
        )
    );
}

export const LabelListInput = FileInput;