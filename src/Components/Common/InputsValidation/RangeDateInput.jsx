import React, { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { ValidationApi } from './ValidationApi';
import Moment from 'moment';
import 'moment/locale/es';

const InputForm = (props) => {
    const { validation, registrationError, listen } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    Moment.locale('es');
    var dt = Moment(new Date());
    let initialValue = dt.format('DD MMM, yyyy');
    if(validation){
        if(validation.initialValues[props.id]){
            initialValue = validation.initialValues[props.id].replace("..", "");
            initialValue = "24 Abr, 2025";
            console.log("initialValue 01: ", initialValue);
            dt = Moment(initialValue, 'DD MMM, yyyy');
            console.log("initialValue 01.dt: ", dt);
            initialValue = dt.format('DD MMM, yyyy');
            console.log("initialValue 02: ", initialValue);
        }
    }
    console.log(initialValue);
    const[defaultValue, setDefaultValue] = useState(initialValue);
    useEffect(() => {
        validation.setFieldValue(props.id, [dt.toDate()]);
    } , []);
    
    let className = "mb-3";
    return (
        validation ? (
            <div className={className}>
                <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">{props.labelDanger} *</span></Label>
                <Flatpickr
                    id={props.id}
                    name={props.id}
                    className={"form-control" + (isInvalidForm || isErrorApi ? " is-invalid" : "")}
                    placeholder="Fecha..."
                    options={{
                        mode: (props.mode ? props.mode : "range"),
                        enableTime: false,
                        altFormat: "d M, Y",
                        dateFormat: "d M, Y",
                        defaultDate: defaultValue,
                        onChange: function(selectedDates, dateStr, instance) {
                            //...
                            console.log(selectedDates, dateStr, instance);
                            validation.setFieldValue(props.id, selectedDates);
                        },
                    }}/>
                    {Feedback}
            </div>
        ) : (
            <div className="mb-3">
                <Label htmlFor={props.id} className="form-label">{props.label} <span className="text-danger">{props.labelDanger}</span></Label>
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

export const RangeDateInput = InputForm;