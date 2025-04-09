import React from "react";
import { Row, Col, Input, Label, FormFeedback } from "reactstrap";
import { ValidationApi } from "./ValidationApi";

const FileInput = ({ 
    validation, 
    registrationError, 
    listen, 
    id,
    label, 
    placeholder, 
    autoComplete, 
    onChange }) => {
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi({ id, validation, registrationError, listen });

    // Obtiene el valor actual de los datos iniciales
    const valueActual = listen?.initialValues?.[id] || validation?.initialValues?.[id] || "";

    // Clase CSS condicional
    const className = `btn-group flex-wrap ${isInvalidForm || isErrorApi ? "form-control is-invalid" : ""}`;

    // Manejo del cambio de selección
    const handleChange = (e) => {
        const val = e?.target?.value || "";
        if (validation) validation.setFieldValue(id, val);
        if (listen) listen.setFieldValue(id, val);
        if (onChange) onChange(val, id);
    };

    // Función para renderizar un input tipo radio
    const renderRadioInput = (value, text, color) => (
        <>
            <Input
                id={`${id}_${value}`}
                name={id}
                type="radio"
                className="btn-check"
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={handleChange}
                onBlur={validation ? validation.handleBlur : listen.handleBlur}
                checked={valueActual == value}
                value={value}
            />
            <Label className={`btn btn-outline-${color}`} for={`${id}_${value}`}>
                {text}
            </Label>
        </>
    );

    return (
        <div className="mb-3">
            {validation ? (
                <>
                    <p className="form-label">
                        {label} <span className="text-danger">*</span>
                    </p>
                    <div className="input-group mt-0 pt-0 fs-15 mx-1 mx-sm-1">
                        <div className={className}>
                            {renderRadioInput("1", "Sí", "success")}
                            {renderRadioInput("2", "No", "danger")}
                        </div>
                    </div>
                    {Feedback}
                </>
            ) : (
                <Row className="gy-3">
                    <Col md={8}>
                        <Label className="form-label">{label}</Label>
                    </Col>
                    <Col md={2}>{renderRadioInput("1", "Sí", "success")}</Col>
                    <Col md={2}>{renderRadioInput("2", "No", "danger")}</Col>
                </Row>
            )}

            {isErrorApi && (
                <FormFeedback type="invalid">
                    <div>{registrationError?.errors?.[id]?.[0]}</div>
                </FormFeedback>
            )}
        </div>
    );
};

export const BinarioInput = FileInput;
