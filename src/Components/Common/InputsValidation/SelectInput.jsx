import React, { useMemo } from "react";
import { Row, Col, Label } from "reactstrap";
import Select from "react-select";
import { ValidationApi } from "./ValidationApi";

const InputForm = ({ 
    validation, 
    registrationError, 
    listen, 
    id, 
    label, 
    placeholder, 
    options = [], 
    autoComplete, 
    onChange, 
    verAlertasExtras 
}) => {
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi({ id, validation, registrationError, listen });

    // Obtener el valor seleccionado
    const valueSelect = listen?.initialValues?.[id] || validation?.initialValues?.[id] || "";

    // Calcular el valor por defecto de manera eficiente
    const defaultValue = useMemo(() => options.find(item => item.value === valueSelect) || null, [options, valueSelect]);

    // Clase para el select
    const className = `choices${(isInvalidForm || isErrorApi) ? " form-control is-invalid" : ""}`;

    if (!options.length) {
        return (
            <div className="mb-3">
                <p className="form-label">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="mb-3">
            <p className="form-label">{label} <span className="text-danger">*</span></p>
            <Row className="gy-3">
                <Col md={verAlertasExtras ? 9 : 12}>
                    <Select
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        isClearable
                        defaultValue={defaultValue}
                        onChange={(e) => {
                            const val = e?.value || "";
                            validation?.setFieldValue?.(id, val);
                            listen?.setFieldValue?.(id, val);
                            listen?.handleChange?.(val);
                            if (onChange) onChange(val, id);
                        }}
                        onBlur={validation?.handleBlur || listen?.handleBlur}
                        options={options}
                        className={className}
                    />
                </Col>
                {verAlertasExtras && (
                    <Col md={3}>
                        <small className="text-success">VIABLE</small>
                    </Col>
                )}
            </Row>
            {Feedback}
        </div>
    );
};

export const SelectInput = InputForm;