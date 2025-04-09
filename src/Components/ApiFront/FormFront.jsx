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
    BinarioInput,
    EditorInput,
    RangeDateInput
} from "../Common/InputsValidation";
import FrontFormikGrl from "./FrontFormikGrl";
import ValidationFormik from "./ValidationFormik";
import InputsFrontApi from "./InputsFrontApi";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { TipoFormEnum } from '../../enums';

// Visual Components
export * from "./Vistas/FormFrontApi";
export * from "./Vistas/FormCardFrontApi";
export * from "./Vistas/FormTabContentFrontApi";
export * from "./Vistas/FormAccordionApi";

// Ayuda de formularios
export const frontFormikLabl = (lb, value, ColMd) => FrontFormikGrl({ defaultValue: (value || ""), label: lb, ColMd: ColMd, tipoForm: TipoFormEnum.LABEL });
export const frontFormikLbList = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.LB_LIST });
export const frontFormikLbKanban = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.LB_KANBAN });
export const frontFormikParm = (value) => FrontFormikGrl({ defaultValue: (value || ""), tipoForm: TipoFormEnum.HIDDEN, ver: false });
export const frontFormikPmIn = (value) => FrontFormikGrl({ defaultValue: (value || ""), tipoForm: TipoFormEnum.HIDDEN_INT, ver: false });
export const frontFormikTitl = (label) => FrontFormikGrl({ label: (label || ""), tipoForm: TipoFormEnum.TITLE_H5 });
export const frontFormikP = (label) => FrontFormikGrl({ label: (label || ""), tipoForm: TipoFormEnum.TITLE_P });
export const frontFormikSmall = (label) => FrontFormikGrl({ label: (label || ""), tipoForm: TipoFormEnum.TITLE_SMALL });
export const frontFormikText = (lb, req, value) => FrontFormikGrl({ defaultValue: value, label: lb, required: req, tipoForm: TipoFormEnum.TEXT_INPUT });
export const frontFormikTxtObj = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.TEXT_INPUT });
export const frontFormikDate = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.DATE_INPUT });
export const frontFormikEmail = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.EMAIL_INPUT });
export const frontFormikNumber = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.NUMBER_INPUT });
export const frontFormikInteger = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.NUMBER_INPUT });
export const frontFormikMoney = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.MONEY_INPUT });
export const frontFormikCked = (lb, req, value, ColMd) => FrontFormikGrl({ defaultValue: value, label: lb, required: req, ColMd: ColMd, tipoForm: TipoFormEnum.EDITOR_INPUT });
export const frontFormikList = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.SELECT_INPUT });
export const frontFormikAddList = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.TABLE_SELECT_INPUT });
export const frontFormikKanban = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.KANBAN_FORM });
export const frontFormikSiNo = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.BINARIO_INPUT });
export const frontFormikBtn = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.BUTTON });
export const frontFormikInLabel = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.LABEL_INPUT });
export const frontFormikTable = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.TABLE_INPUT });
export const frontFormikLbTable = (props) => FrontFormikGrl({ ...props, tipoForm: TipoFormEnum.LB_TABLE });

export const HelperFormik = {
    getDefaultValueBinariByParm: (o, k) => {
        return ( o ? ( o[k] != null ? (o[k] ? "1" : "2") : "" ) : "" );
    },
    getVerBinariByParm: (o, k) => {
        return ( o ? ( o[k] != null ? (o[k] ? true : false) : true ) : true );
    },
}