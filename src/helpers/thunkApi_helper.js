import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkTypeEnum } from '../enums/ThunkTypeEnum';

const normalizarObjThunk = (props) => {
    let thunkApiGrl = { ...props };
    if (typeof thunkApiGrl.label === 'undefined') thunkApiGrl.label = "No Label";
    if (typeof thunkApiGrl.tipo === 'undefined') thunkApiGrl.tipo = ThunkTypeEnum.GET_PARAMS;
    if (typeof thunkApiGrl.thunk === 'undefined') thunkApiGrl.thunk = (e) => { console.log("No function: " + thunkApiGrl.label); };
    return thunkApiGrl;
}

const addArrayThunkFunction = (grlCRUD, arrayThunk) => {
    Object.keys(arrayThunk).forEach((key) => {
        addThunkFunction(grlCRUD, key, arrayThunk[key]);
    });
}

const addThunkFunction = (grlCRUD, key, elementThunk) => {
    elementThunk = normalizarObjThunk(elementThunk);
    switch (elementThunk.tipo) {
        case ThunkTypeEnum.GET_PARAMS:
            grlCRUD[key] = createAsyncThunk(elementThunk.label, async (params, state) => {
                try {
                    let url_params = params || false;
                    const response = elementThunk.thunk(url_params);
                    const data = await response;
                    return data;
                } catch (error) {
                    return { error: error };
                }
            });
            break;

        case ThunkTypeEnum.POST_PARAMS_DATA:
            grlCRUD[key] = createAsyncThunk(elementThunk.label, async (dataIn) => {
                try {
                    let url_params = (dataIn && dataIn.params) || false;
                    const response = elementThunk.thunk(url_params, dataIn.data);
                    const data = await response;
                    return data;
                } catch (error) {
                    return { error: error };
                }
            });
            break;

        case ThunkTypeEnum.POST_DATA:
            grlCRUD[key] = createAsyncThunk(elementThunk.label, async (dataIn) => {
                try {
                    const response = elementThunk.thunk(dataIn);
                    const data = await response;
                    return data;
                } catch (error) {
                    return { error: error };
                }
            });
            break;
    }
}

const addThunkByKey = (grlCRUD, key, tipo, config) => {
    config[key].tipo = tipo;
    addThunkFunction(grlCRUD, key, config[key]);
}

export const thunkApiFunction = (label, func, tipo) => {
    if (!func)
        func = (e) => { console.log("No function: " + label); };
    return { label: label, thunk: func, tipo: tipo };
}

export const thunkApiHelper = (config) => {
    let grlCRUD = {};

    const actions = [
        { key: 'addFuntion', tipo: ThunkTypeEnum.POST_PARAMS_DATA },
        { key: 'addDataFuntion', tipo: ThunkTypeEnum.POST_DATA },
        { key: 'getFuntion', tipo: ThunkTypeEnum.GET_PARAMS },
        { key: 'updateFuntion', tipo: ThunkTypeEnum.POST_PARAMS_DATA },
        { key: 'deleteFuntion', tipo: ThunkTypeEnum.GET_PARAMS },
        { key: 'deleteBodyFuntion', tipo: ThunkTypeEnum.POST_PARAMS_DATA },
        { key: 'getFunctionByID', tipo: ThunkTypeEnum.GET_PARAMS }
    ];

    actions.forEach(action => {
        if (config[action.key]) {
            addThunkByKey(grlCRUD, action.key, action.tipo, config);
        }
    });

    if (config.arrayThunk) {
        addArrayThunkFunction(grlCRUD, config.arrayThunk);
    }

    if (!config.resetCreateFuntion) {
        config.resetCreateFuntion = (e) => { };
    }

    grlCRUD.resetCreateFuntion = () => {
        try {
            const response = config.resetCreateFuntion();
            return response;
        } catch (error) {
            return error;
        }
    };

    return grlCRUD;
}

export const thunkArrayApiHelper = (config) => {
    let grlCRUD = [];
    addArrayThunkFunction(grlCRUD, config);
    return grlCRUD;
}