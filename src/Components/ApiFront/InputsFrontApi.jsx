import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import { 
    Modal, ModalBody, ModalHeader, 
    CardHeader, CardBody, CardFooter,
    Form, Input, Label, Button, Alert,
    TabPane, Row, Col, Card, TabContent
} from "reactstrap";
import Select from "react-select";
import { toast } from 'react-toastify';

// Entradas de Datos
import {
    LabelInput,
    TextInput,
    TextBtnInput,
    SelectInput,
    TableSelectInput,
    BinarioInput,
    EditorInput,
    RangeDateInput,
    KanbanInput,
    LbListInput,
    LbKabbanInput,
    BtnInput,
    LabelListInput,
    TableInput,
    LbTableInput,
} from "../Common/InputsValidation";
import frontFormikGrl from "./FrontFormikGrl";
import { TipoFormEnum } from '../../enums/TipoFormEnum';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const InputsFrontApi = ({config, validation, slicesObj}) => {
    return (<Row className="gy-3">

        <Col className="d-none" key={0} md={12}>
            {slicesObj.error && slicesObj.error ? (
                <Alert color="danger">
                    {slicesObj.error && slicesObj.error.title ? slicesObj.error.title : (
                        <div>Error de conexion... </div>
                    )}</Alert>
            ) : null}
        </Col>

        {Object.keys(config.useFormik.values).map((key) => {
            let item = config.useFormik.values[key];
            let inputField = false;
            if(!item.ver) return null;
            switch (item.tipoForm) {
                case TipoFormEnum.LABEL:
                    inputField = <LabelInput
                        id={key}
                        label={item.label}
                        defaultValue={item.defaultValue} />;
                    break;

                case TipoFormEnum.LB_LIST:
                    let listLbList = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = listLbList();
                    inputField = <LbListInput
                        id={key}
                        label={item.label}
                        options={item.options} />;
                    break;

                case TipoFormEnum.LB_KANBAN:
                    let listKanban = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = listKanban();
                    inputField = <LbKabbanInput
                        id={key}
                        label={item.label}
                        options={item.options} />;
                    break;

                case TipoFormEnum.TEXT_INPUT:
                    inputField = <TextInput
                        id={key}
                        label={item.label}
                        type="text"
                        validation={item.required ? validation : null}
                        listen={item.required ? null : validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.DATE_INPUT:
                    inputField = <RangeDateInput
                        id={key}
                        label={item.label}
                        type="date"
                        mode="single"
                        validation={item.required ? validation : null}
                        listen={item.required ? null : validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.EMAIL_INPUT:
                    inputField = <TextInput
                        id={key}
                        label={item.label}
                        type="email"
                        validation={item.required ? validation : null}
                        listen={item.required ? null : validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.NUMBER_INPUT:
                    inputField = <TextInput
                        id={key}
                        label={item.label}
                        type="number"
                        validation={item.required ? validation : null}
                        listen={item.required ? null : validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.MONEY_INPUT:
                    inputField = <TextInput
                        id={key}
                        label={item.label}
                        type="money"
                        validation={item.required ? validation : null}
                        listen={item.required ? null : validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.EDITOR_INPUT:
                    inputField = <EditorInput
                        id={key}
                        label={item.label}
                        validation={validation}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.SELECT_INPUT:
                    let hanlded = item.onChange || null;
                    let list = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = list();

                    inputField = (hanlded ? <SelectInput
                            id={key}
                            label={item.label}
                            validation={validation}
                            registrationError={slicesObj.error}
                            onChange={(val, id) => hanlded(val, id, config.useFormik.values)}
                            options={item.options} />
                        : <SelectInput
                            id={key}
                            label={item.label}
                            validation={validation}
                            registrationError={slicesObj.error}
                            options={item.options} />);
                    break;

                case TipoFormEnum.TABLE_SELECT_INPUT:
                    let hanldedTable = item.onChange || null;
                    let listTable = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = listTable();
                    inputField = (item.required ? <TableSelectInput
                            id={key}
                            label={item.label}
                            validation={validation}
                            registrationError={slicesObj.error}
                            onChange={(val, id) => hanldedTable(val, id, config.useFormik.values)}
                            options={item.options}
                            buttons={item.buttons} />
                        : <TableSelectInput
                            id={key}
                            label={item.label}
                            listen={validation}
                            registrationError={slicesObj.error}
                            onChange={(val, id) => hanldedTable(val, id, config.useFormik.values)}
                            options={item.options}
                            buttons={item.buttons} />);
                    break;

                case TipoFormEnum.KANBAN_FORM:
                    let hanldedKan = item.onChange || null;
                    let listKan = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = listKan();
                    inputField = (item.required ? <KanbanInput
                            id={key}
                            label={item.label}
                            validation={validation}
                            registrationError={slicesObj.error}
                            onChange={(val, id) => hanldedKan(val, id, config.useFormik.values)}
                            options={item.options}
                            buttons={item.buttons} />
                        : <KanbanInput
                            id={key}
                            label={item.label}
                            listen={validation}
                            registrationError={slicesObj.error}
                            onChange={(val, id) => hanldedKan(val, id, config.useFormik.values)}
                            options={item.options}
                            buttons={item.buttons} />);
                    break;

                case TipoFormEnum.BINARIO_INPUT:
                    let hanldedBinarioInput = item.onChange || null;
                    inputField = <BinarioInput
                        id={key}
                        label={item.label}
                        validation={validation}
                        defaultValue={item.defaultValue}
                        onChange={(val, id) => hanldedBinarioInput(val, id, config.useFormik.values)}
                        registrationError={slicesObj.error} />;
                    break;

                case TipoFormEnum.LABEL_INPUT:
                    let hanldedLbListInput = item.onChange || null;
                    let listLbInput = () => {
                        if (item.list) {
                            return item.list(slicesObj);
                        } else {
                            return [];
                        }
                    };
                    item.options = listLbInput();
                    inputField = <LabelListInput
                        id={key}
                        label={item.label}
                        validation={validation}
                        defaultValue={item.defaultValue}
                        registrationError={slicesObj.error} 
                        onChange={(val, id) => hanldedLbListInput(val, id, config.useFormik.values)}
                        options={item.options}/>;
                    break;

                case TipoFormEnum.TABLE_INPUT:
                    inputField = <TableInput
                        id={key}
                        label={item.label}
                        validation={validation}
                        defaultValue={item.defaultValue}
                        registrationError={slicesObj.error} 
                        options={item.list}/>;
                    break;

                case TipoFormEnum.LB_TABLE:
                    inputField = <LbTableInput
                        id={key}
                        label={item.label}
                        validation={validation}
                        defaultValue={item.defaultValue}
                        registrationError={slicesObj.error} 
                        options={item.list}/>;
                    break;

                case TipoFormEnum.TITLE_H5:
                    inputField = <>
                        <h5 className="mb-3">{item.label}</h5>
                        <hr />
                    </>;
                    break;

                case TipoFormEnum.TITLE_P:
                    inputField = <p className="mb-1">{item.label}</p>;
                    break;

                case TipoFormEnum.TITLE_SMALL:
                    inputField = <small className="mb-1">{item.label}</small>;
                    break;

                case TipoFormEnum.BUTTON:
                    inputField = <BtnInput {...item} id={key} />;
                    break;
            }

            return (inputField ? <Col key={key} md={item.ColMd}>{inputField}</Col> : null);
        })}
    </Row>);
}

export default InputsFrontApi;