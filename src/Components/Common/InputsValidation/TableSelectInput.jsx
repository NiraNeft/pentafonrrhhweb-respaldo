import React, { useState, useEffect } from "react";
import { 
    Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback,
    Table,
    Button
} from "reactstrap";
import Select from "react-select";
import { ValidationApi } from './ValidationApi';
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../Spinner";

const InputForm = (props) => {
    const { validation, registrationError, listen, options } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    let valueSelect = "";
    if(validation && validation.values && validation.values[props.id])
        valueSelect = validation.values[props.id];
    if(listen && listen.values && listen.values[props.id])
        valueSelect = listen.values[props.id];

    //if(!props.options || props.options.length == 0) return null;
    // Valores por Default
    //const [defaultValues, setDefaultValues] = useState([]);
    // Valor Seleccionado
    const [selectedValue, setSelectedValue] = useState([]);
    // Valores Seleccionados
    const [selectedValues, setListaPuestos] = useState([]);
    // Lista de Opciones
    const [optionsList, setOptionsList] = useState([]);

    const [isLoading, setLoading] = useState(true);
    const [isObjArray, setisObjArray] = useState("");


    useEffect(() => {
        let initValues = false;
        if(listen && listen.initialValues && listen.initialValues[props.id])
            initValues = listen.initialValues[props.id];
        
        //setDefaultValues(initValues);
        setLoading(true);
    }, []);

    /*useEffect(() => {
        setOptionsList(props.options);
    }, [props.options]);*/

    useEffect(() => {
        if(isLoading && options && valueSelect && valueSelect.length > 0){
            
            setListaPuestos((valueSelect || []).map(
                (item) => options.find((i) => (i.value == item))
            ).filter((e) => typeof e !== 'undefined'));
            if(isLoading && options && options.length > 0){
                setOptionsList(options.filter(
                    (e) => !valueSelect.find((i) => (i == e.value))
                ));
                setLoading(false);
            }
        } else if(isLoading && options && options.length > 0){
            setOptionsList(options);
            setLoading(false);
        }
    }, [valueSelect, options, isLoading]);

    function handleisObjArray(newObje) {
        setisObjArray(newObje);

        /* Agregar a la lista de seleccionados */
        /*if(newObje === "") return;
        setSelectedValue(newObje);
        const newArray = [...selectedValues, newObje];
        setListaPuestos(newArray);
        updValue(newArray);
        setOptionsList(optionsList.filter((i) => i.value !== newObje.value));
        setisObjArray("");*/
    }

    function handleAddObj(){
        if(isObjArray === "") return;
        setSelectedValue(isObjArray);
        const newArray = [...selectedValues, isObjArray];
        setListaPuestos(newArray);
        updValue(newArray);
        setOptionsList(optionsList.filter((i) => i.value !== isObjArray.value));
        setisObjArray("");
    }

    function handleDelObj(item){
        const newArray = selectedValues.filter((i) => i !== item);
        setListaPuestos(newArray);
        updValue(newArray);
        setOptionsList([...optionsList, item].sort((a, b) => a.label > b.label ? 1 : -1));
    }

    function updValue(items){
        if (items && items.length > 0) {
            let arrValue = items.map((item) => item.value);
            listen.setFieldValue(props.id, arrValue);
        } else {
            listen.setFieldValue(props.id, "");
        }
    }

    let className = "choices";
    if (isInvalidForm || isErrorApi) {
        className += " form-control is-invalid ";
    }
    
    return (
        (
            isLoading ? <Spinners /> :
            validation ? (
                <div className="mb-3">
                    <p className="form-label">{props.label} <span className="text-danger">*</span></p>
                    <Select
                        id={props.id}
                        name={props.id}
                        placeholder={props.placeholder}
                        isClearable={true}
                        onChange={(e) => {
                            let val = "";
                            if (e) {
                                val = e.value;
                            }

                            validation.setFieldValue(props.id, val);
                            if (props.onChange)
                                props.onChange(val, props.id);
                        }}
                        onBlur={validation.handleBlur}
                        options={props.options}
                        className={className}
                    />
                    {Feedback}
                </div>
            ) : (
                <div className="mb-3">
                    <Label htmlFor={props.id} className="form-label">{props.label}</Label>
                    <Row className="gy-3">
                        <Col md={props.verAlertasExtras ? 9 : 6}>
                            <Select
                                id={props.id}
                                name={props.id}
                                value={isObjArray}
                                onChange={(isObjArray) => {
                                    handleisObjArray(isObjArray);
                                }}
                                /*onChange={(e) => {
                                    if (e) {
                                        listen.handleChange(e.value)
                                        listen.setFieldValue(props.id, e.value);
                                    } else {
                                        listen.setFieldValue(props.id, "");
                                    }
                                }}*/
                                options={optionsList}
                            ></Select>
                        </Col>
                        {(props.verAlertasExtras ? <Col md={3}>
                            <small className="text-success">VIABLE</small>
                        </Col> : null)}
                        <Col>
                            <div className="d-flex currency-select input-light align-items-center">
                                <Button
                                    color="secondary"
                                    type="button"
                                    className="fw-medium"
                                    onClick={handleAddObj}>
                                    Agregar
                                </Button>
                                {(props.buttons ? props.buttons : []).map((btn, index) => (
                                    <Button
                                        key={index}
                                        color="success"
                                        type="button"
                                        className="add-btn"
                                        onClick={btn.onclick}
                                    >
                                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                                        {btn.label}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                    </Row>

                    <div className="table-responsive">
                        <Table className="invoice-table table-borderless table-nowrap mb-0">
                            <thead className="align-middle">
                                <tr className="table-active">
                                    <th scope="col" style={{ width: "50px" }}>
                                        #
                                    </th>
                                    <th scope="col">Puesto</th>
                                    <th
                                        scope="col"
                                        className="text-end"
                                        style={{ width: "105px" }}
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(selectedValues).map((item, index) => (
                                    <tr id={index} key={index} className="product">
                                        <td scope="row" className="product-id">
                                            {index+1}
                                        </td>
                                        <td className="text-start">
                                            {item.label}
                                        </td>
                                        <td className="product-removal">
                                            <Button onClick={() => handleDelObj(item)} className="btn btn-danger btn-sm ">
                                                Borrar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </div>
            )
        )
    );
}

export const TableSelectInput = InputForm;