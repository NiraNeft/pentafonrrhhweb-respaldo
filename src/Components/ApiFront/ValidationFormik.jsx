import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { TipoFormEnum } from "../../enums/TipoFormEnum";

const GetFormikByConfig = (initUseFormik, item, key) => {
    let validationSchema = false;
    
    switch (item.tipoForm) {
        case TipoFormEnum.HIDDEN:
        case TipoFormEnum.TEXT_INPUT:
        case TipoFormEnum.SELECT_INPUT:
        case TipoFormEnum.BINARIO_INPUT:
        case TipoFormEnum.EDITOR_INPUT:
        case TipoFormEnum.EMAIL_INPUT:
        case TipoFormEnum.LABEL_INPUT:
            if (item.YupNumeric) {
                validationSchema = Yup.number();
            } else {
                validationSchema = Yup.string();
            }
            break;

        case TipoFormEnum.DATE_INPUT:
        case TipoFormEnum.LB_TABLE:
            validationSchema = Yup.mixed();
            break;

        case TipoFormEnum.TABLE_SELECT_INPUT:
            validationSchema = Yup.array();
            break;

        case TipoFormEnum.KANBAN_FORM:
            initUseFormik.initialValues[key+"_KAN_adds"] = item.defaultValueKan;
            validationSchema = Yup.array();
            break;

        case TipoFormEnum.HIDDEN_INT:
        case TipoFormEnum.NUMBER_INPUT:
        case TipoFormEnum.MONEY_INPUT:
            validationSchema = Yup.number();
            break;
    }
    
    if (validationSchema) {
        initUseFormik.initialValues[key] = item.defaultValue;

        if (item.required) {
            validationSchema = validationSchema.required(item.required);

            if (item.YupMax) {
                switch (item.tipoForm) {
                    case TipoFormEnum.HIDDEN:
                    case TipoFormEnum.TEXT_INPUT:
                    case TipoFormEnum.SELECT_INPUT:
                    case TipoFormEnum.BINARIO_INPUT:
                    case TipoFormEnum.EDITOR_INPUT:
                    case TipoFormEnum.EMAIL_INPUT:
                    case TipoFormEnum.HIDDEN_INT:
                    case TipoFormEnum.NUMBER_INPUT:
                    case TipoFormEnum.NUMBER_INMONEY_INPUTPUT:
                        validationSchema = validationSchema.max(
                            item.YupMax,
                            "Solo se permite un máximo de " + item.YupMax
                        );
                        break;
                }
            }

            initUseFormik.validationSchema[key] = validationSchema;
        }
    }
};

const ValidationFormik = (config, dispatch, history) => {
    let initUseFormik = {
        enableReinitialize: true,
        initialValues: {},
        validationSchema: {},
        onSubmit: (values) => {
            if (config.useFormik && config.useFormik.onSubmit) {
                config.useFormik.onSubmit(values, config.useFormik.values);
            }
        },
    };

    Object.keys(config.useFormik.values).map((key) => {
        let item = config.useFormik.values[key];
        GetFormikByConfig(initUseFormik, item, key);
    });

    if (config.useFormik.groupValues) {
        config.useFormik.groupValues.map((g) => {
            Object.keys(g.values).map((key) => {
                let item = g.values[key];
                GetFormikByConfig(initUseFormik, item, key);
            });
        });
    }

    initUseFormik.validationSchema = Yup.object(initUseFormik.validationSchema);
    const validation = useFormik(initUseFormik);

    let slicesObj = {};

    if(config.slices){
        Object.keys(config.slices.data).map((key) => {
            const slice = config.slices.data[key];
            const selectData = createSelector(
                (state) => state[key],
                (stateActual) => {
                    let objBack = {};
                    Object.keys(slice).map((kObj) => {
                        objBack[kObj] = stateActual[slice[kObj]];
                    });
                    return objBack;
                }
            );

            const usSelect = useSelector(selectData);
            Object.keys(usSelect).map((key) => {
                slicesObj[key] = usSelect[key];
            });
        });
    }

    if (config.function && config.function.dispatx) {
        useEffect(() => {
            config.function.dispatx(slicesObj, dispatch);
        }, [dispatch]);
    }

    if(config.function){
        useEffect(() => {
            if (slicesObj.success) {
                toast.success(config.slices.titleSuccess, { autoClose: 3000 });
                dispatch(config.function.reset());
                config.function.succes();
            } else if(slicesObj.error){
                toast.error(config.slices.titleError, { autoClose: 3000 });
            }
        }, [dispatch, slicesObj.success, slicesObj.error, history]);
    }

    return { slicesObj, validation };
};

export default ValidationFormik;