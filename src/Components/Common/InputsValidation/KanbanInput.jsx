import React, { useState, useEffect } from "react";
import {
    Modal, ModalHeader, ModalBody,
    Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback,
    Table,
    Button,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CardFooter,
} from "reactstrap";
import Select from "react-select";
import { ValidationApi } from './ValidationApi';
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../Spinner";
import { TipoKanInputEnum } from "../../../enums/TipoKanInputEnum";

import SimpleBar from "simplebar-react"
import { useFormik } from "formik"
import * as Yup from "yup"

const InputForm = (props) => {
    const { validation, registrationError, listen, options } = props;
    const { isInvalidForm, isErrorApi, Feedback } = ValidationApi(props);
    const field = props.id + "_KAN_adds";
    let valueSelect = "";
    if (validation && validation.values && validation.values[props.id])
        valueSelect = validation.values[props.id];
    if (listen && listen.values && listen.values[props.id])
        valueSelect = listen.values[props.id];
    
    // Valores Seleccionados
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedParams, setSelectedParams] = useState([]);
    const [selectedIDParams, setSelectedIdParams] = useState(1);

    const [isLoading, setLoading] = useState(true);
    const [isObjArray, setisObjArray] = useState("");

    // Modal Agregar Variables
    const [modal, setShowModal ] = useState(false);
    const [cardOptionActual, setCardOptionActual ] = useState(false);
    
    // Actualizacion en la informacion
    useEffect(() => {
        let initValues = false;
        if(listen && listen.initialValues && listen.initialValues[props.id])
            initValues = listen.initialValues[props.id];
        
        // Params
        console.log(field, validation.initialValues);
        if(validation && validation.initialValues && validation.initialValues[field]){
            let newInitialSelect = [], maxGp = 0;
            validation.initialValues[field].map((g) => {
                g.map((go) => {
                    go.map((e) => {
                        if(e.idArray > maxGp)
                            maxGp = e.idArray;
                        newInitialSelect = [...newInitialSelect, e];
                        console.log(e);
                    })
                })
            });
            setSelectedIdParams(maxGp+1);
            updateSelectedParams(newInitialSelect);
        }
        setLoading(true);
    }, []);
    
    useEffect(() => {
        //console.log(valueSelect);
        if(isLoading && options && valueSelect && valueSelect.length > 0){
            let puestos = [];
            (valueSelect || []).map(
                (item) => options.find((i) => i.values.find((i1) => i1.values.find((i2) => {
                            const b = (i2.value == item);
                            if(b)
                                puestos.push(item);
                            return b;
                        })
                    )
                )
            ).filter((e) => typeof e !== 'undefined');
            setSelectedValues(puestos);
            
            if(isLoading && options && options.length > 0){
                setLoading(false);
            }
        } else if(isLoading && options && options.length > 0){
            setLoading(false);
        }
    }, [valueSelect, options, isLoading]);

    // Funcion para agrgar elementos
    function handleisObjArray(newObje) {
        const isObjArray = newObje.target.value;
        if (isObjArray === "") return;
        let items = [...selectedValues];
        if (newObje.target.checked) {
            items.push(isObjArray);
        } else {
            items = items.filter((i) => i !== isObjArray);
        }

        setSelectedValues(items);
        if(validation)
            validation.setFieldValue(props.id, items);
        else
            listen.setFieldValue(props.id, items);
    }

    const handleOpenNewCard = (line) => {
        setCardOptionActual(line);
        setShowModal(true);
    }

    const updateSelectedParams = (items) => {
        setSelectedParams(items);
        if(items && items.length > 0){
            let fieldValue = [];
            items.map((e) => {
                let wConta = 1;
                e.values.map((v) => {
                    if(v.value)
                        fieldValue.push({
                            id: v.id,
                            grupo: e.idArray,
                            value: v.value.value,
                            nOrden: wConta+1,
                        });
                });
            });
            items = fieldValue;
        } else {
            items = [];
        }
        (validation ?? listen).setFieldValue(field, items);
    };
    
    const handleAddNewCard = (newValue) => {
        const newItem = { ...newValue, idArray: selectedIDParams };
        updateSelectedParams([...selectedParams, newItem]);
        setSelectedIdParams(selectedIDParams + 1);
    };
    
    const handleRemoveNewCard = (newValue) => {
        updateSelectedParams(selectedParams.filter(i => i.idArray !== newValue.idArray));
    };

    let className = "choices";
    if (isInvalidForm || isErrorApi) {
        className += " form-control is-invalid ";
    }
    
    //console.log(validation.values.TropicalizacionIds_KAN_adds);
    // Extras Kanban
    return ( isLoading ? <Spinners /> : (
        <div className={className}>
            <Label htmlFor={props.id} className="form-label">{props.label}</Label>
            <div className="tasks-board p-3 d-flex body-bg" id={props.id}>
                {
                    isLoading ? <Spinners setLoading={setLoading} /> :
                        <>
                            {(props.options || []).map((line, colIndx) => {
                                return (
                                    // header line
                                    <div className="tasks-list" key={line.id}>
                                        <div className="d-flex mb-1">
                                            <div className="flex-grow-1">
                                                <h6 className="fs-14 text-uppercase fw-semibold mb-0">
                                                    {line.label}
                                                    <small className={`badge bg-info align-bottom ms-1 totaltask-badge`}>{line.values.length}</small>
                                                </h6>
                                                {Feedback}
                                            </div>
                                        </div>
                                        {/* data */}
                                        <SimpleBar className="tasks-wrapper px-3 mx-n3">
                                            <div id={"lst" + colIndx + "-task"} className={"tasks"}>
                                                <div id={line.id}>
                                                    {line.values.map((card, index) => {
                                                        return (
                                                            <div key={card.id} id={index}>
                                                                {
                                                                    card.multiple == 2 
                                                                        ? <DivCardList 
                                                                            idCard={line.name + "-task"}
                                                                            numberCard={(index+1) + ")"}
                                                                            colName={"lst" + colIndx + "-" + index}
                                                                            card={card}
                                                                            selectedValues={selectedValues}
                                                                            onChange={handleisObjArray}/>
                                                                        : <BtnAddList
                                                                            onOpenModal={handleOpenNewCard}
                                                                            card={card}
                                                                            selectedParams={selectedParams.filter((i) => i.id == card.id)}
                                                                            onRemove={handleRemoveNewCard} />
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </SimpleBar>
                                    </div>
                                )
                            })}
                        </>
                }

                <ModalNewKanbanOptiobn
                    modal={modal}
                    options={cardOptionActual}
                    toggle={() => setShowModal(false)}
                    onAdd={handleAddNewCard}
                    />
            </div>
        </div>
    ) );
}

const DivCardList = ({ idCard, numberCard, colName, card, selectedValues, onChange }) =>{
    return (<div
        // className="card task-list"
        className="pb-1 task-list"
        id={idCard}>
        <div className="card task-box mb-1">
            <CardBody>
                <Link to="#" className="text-muted fw-medium fs-14 flex-grow-1 ">{card.cardId}</Link>
                {card.label ? <div className="mb-1">
                    <h6 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                        <Link to="#" className="d-block">
                            {numberCard} {card.label}
                        </Link>
                    </h6>
                </div> : null}

                <ul className=" ps-1 list-unstyled vstack mb-0">
                    {card.values.map((detail, indx) => {
                        let objck = selectedValues.find((e) => e == detail.value);
                        let chk = objck != null;
                        return (<li key={indx}>
                            <div className="form-check">
                                <Input className="form-check-input"
                                    type="checkbox"
                                    checked={chk}
                                    value={detail.value}
                                    onChange={(e) => onChange(e)}
                                    id={colName + "-" + indx} />
                                <Label className="form-check-label" htmlFor={colName + "-" + indx}>
                                    {detail.label}
                                </Label>
                            </div>
                        </li>)
                    })}
                </ul>
            </CardBody>
        </div>
    </div>);
}

const BtnAddList = ({ card, onOpenModal, selectedParams, onRemove }) => {
    return (<div className="my-2 mt-0">
        {(selectedParams || []).map((e, index) => <ParamCardList 
            key={index} 
            item={e}
            onRemove={onRemove}
            numberCard={card.label + " - " + (index+1) + ""}/>)}
        <button type="button" className="btn btn-soft-info w-100" onClick={() => onOpenModal(card)}>
            Agregar {card.label}
        </button>
    </div>);
}

const ParamCardList = ({ item, numberCard, onRemove }) =>{
    return (<div
        // className="card task-list"
        className="pb-1 task-list">
        <div className="card task-box mb-1">
            <CardBody>
                <div className="mb-1">
                    <h6 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                        <Link to="#" className="d-block">
                            {numberCard}
                        </Link>
                    </h6>
                </div> 
                <ul className="fs-14 ps-1 list-unstyled vstack mb-0">
                    {item.values.map((detail, indx) => {
                        if(!detail.value) return null;
                        let lb = detail.label;
                        switch(detail.tipoInput){
                            case TipoKanInputEnum.SELECT:
                                lb = lb + ": " + detail.value.label;
                                break;

                            case TipoKanInputEnum.CHECKBOX:
                                lb = "" + lb; //✅ 
                                break;
                        }
                        return (<li key={indx}>{lb}</li>)
                    })}
                </ul>
            </CardBody>
            <div className="card-footer border-top-dashed">
                <div className="d-flex">
                    <div className="flex-grow-1">
                        <span className="text-muted">
                            <i className="ri-time-line align-bottom"></i>
                            {item.botId}
                        </span>
                    </div>
                    <div className="flex-shrink-0">
                        <ul className="link-inline mb-0">
                            <li className="list-inline-item">
                                <Button 
                                    type="button"
                                    color="link"
                                    className="text-danger"
                                    onClick={() => onRemove(item)}>
                                    <i className="ri-delete-bin-line align-bottom"></i> 
                                    Eliminar
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

const ModalNewKanbanOptiobn = ({ modal, toggle, options, onAdd }) => {
    const colName = "mdlKanban-opt";
    let initialValues = {}, validationSchema = {};
    if(options){
        options.values.map((e, k) => {
            initialValues['k' + k] = "";
            if(e.tipoInput == TipoKanInputEnum.SELECT){
                validationSchema['k' + k] = Yup.mixed().required("Por favor, selecciona una opcion");
            }
        });
    }
    const formik = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            let newOption = { 
                id: options.id, 
                values: options.values.map((e, indx) => {
                    const keyValdiation = "k"+indx;
                    let valueSeleccionado = false, id = e.value;
                    if( values[keyValdiation] && values[keyValdiation] != "" ){
                        valueSeleccionado = values[keyValdiation];
                    }
                    return {
                        id: id,
                        label: e.label,
                        tipoInput: e.tipoInput,
                        value: valueSeleccionado
                    };
                })
            };
            onAdd(newOption);
            formik.resetForm()
            toggle();
        },
    });

    return (<Modal id="modalFormKanban" isOpen={modal} toggle={toggle} centered={true} size="sm">
        <ModalHeader toggle={toggle}>
            Agregar: {options.label}
        </ModalHeader>
        <ModalBody>
            {(options && options.values || []).map((e, indx) => {
                let lbDanger = "", 
                    cmpInputOpt = null,
                    labelOption = false,
                    keyValdiation = "k"+indx;;
                switch(e.tipoInput){
                    case TipoKanInputEnum.CHECKBOX:
                        let option = e.parametros[0];
                        cmpInputOpt = <div className="form-check">
                            <Input className="form-check-input"
                                type="checkbox"
                                value={option.value}
                                onChange={(selObj) => {
                                    formik.setFieldValue(keyValdiation, selObj.target.checked ? option: "");
                                }}
                                id={colName + "-" + indx} />
                            <Label className="form-check-label" htmlFor={colName + "-" + indx}>
                                {option.label}
                            </Label>
                        </div>;
                        break;

                    case TipoKanInputEnum.SELECT:
                        lbDanger = "*";
                        labelOption = e.label;
                        cmpInputOpt = <div className="col-lg-12">
                            <Select
                                onChange={(sel) => {
                                    formik.setFieldValue(keyValdiation, sel);
                                }}
                                className="mb-0"
                                options={e.parametros}
                                id={colName + "-" + indx}
                            >
                            </Select>
                            {formik.touched[keyValdiation] && formik.errors[keyValdiation] ? (
                            <FormFeedback type="invalid" className="d-block">
                                {formik.errors[keyValdiation]}
                            </FormFeedback>
                            ) : null}
                        </div>;
                        break;
                }

                return <div key={indx} className="form-group mb-3">
                    {labelOption ? <Label htmlFor="taskname" className="col-form-label">
                        {e.label} <span className="text-danger">{lbDanger}</span>
                    </Label> : null}
                    {cmpInputOpt}
                </div>;
            })}
        </ModalBody>
        <CardFooter>
            <div className="hstack gap-2 justify-content-end p-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    id="updatetaskdetail"
                    onClick={() => formik.handleSubmit()}
                >
                    Agregar
                </button>
            </div>
        </CardFooter>
    </Modal>);
}

export const KanbanInput = InputForm;