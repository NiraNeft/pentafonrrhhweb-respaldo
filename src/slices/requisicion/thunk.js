import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkApiHelper, thunkApiFunction } from "../../helpers/thunkApi_helper";

//Include Both Helper File with needed methods
import {
    getRequisicionesList as getRequisicionesListApi,
    postAddRequisicion as postAddRequisicionApi,
    getRequisicionbyID as getRequisicionbyIDApi,
    getRequisicionesCatalogos as getRequisicionesCatalogosApi,
    updateRequisicion as updateRequisicionApi,
    deleteRequisicion as deleteRequisicionApi,
    updateEstatusRequisicion as updateEstatusRequisicionApi,
} from "../../helpers/hosterbackend_helper";

// action
import {
    reset_create_requisicion,
    reset_update_requisicion,
} from "./reducer";

// Helper CRUD
export const grlThunk = thunkApiHelper({
    addFuntion: thunkApiFunction("Requisiciones/postAddRequisicion", postAddRequisicionApi),
    getFuntion: thunkApiFunction("Requisiciones/getRequisicionesList", getRequisicionesListApi),
    getFunctionByID: thunkApiFunction("Requisiciones/getRequisicionbyID", getRequisicionbyIDApi),
    updateFuntion: thunkApiFunction("Requisiciones/updateRequisicion", updateRequisicionApi),
    deleteBodyFuntion: thunkApiFunction("Requisiciones/deleteRequisicion", deleteRequisicionApi),
    resetCreateFuntion: reset_create_requisicion,
    resetUpdateFuntion: reset_update_requisicion,

    // Filtros
    arrayThunk: {
        catalogosFunction: thunkApiFunction("Requisiciones/getRequisicionesCatalogos", getRequisicionesCatalogosApi),
        switchEstatusFunction: thunkApiFunction("Requisiciones/updateEstatusRequisicion", updateEstatusRequisicionApi),
    }
});

// General Function
export const getRequisicionesCatalogos = grlThunk.catalogosFunction;
export const postAddRequisicion = grlThunk.addFuntion;
export const getRequisicionesList = grlThunk.getFuntion;
export const getRequisicionbyID = grlThunk.getFunctionByID;
export const updateRequisicion = grlThunk.updateFuntion;
export const deleteRequisicion = grlThunk.deleteBodyFuntion;
export const switchEstatusFunction = grlThunk.switchEstatusFunction;
export const resetAddRequisicionFlag = grlThunk.resetCreateFuntion;
export const resetUpdateRequisicionFlag = grlThunk.resetUpdateFuntion;
