import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkApiHelper, thunkApiFunction } from "../../helpers/thunkApi_helper";

//Include Both Helper File with needed methods
import {
    getFlujoContratacionList as getFlujoContratacionListApi,
    postAddFlujoContratacion as postAddFlujoContratacionApi,
    getFlujoContratacionbyID as getFlujoContratacionbyIDApi,
    updateFlujoContratacion as updateFlujoContratacionApi,
    deleteFlujoContratacion as deleteFlujoContratacionApi,
    getFlujoContratacionCatalogos as getFlujoContratacionCatalogosApi
} from "../../helpers/hosterbackend_helper";

// action
import {
    reset_create_flag,
    reset_update_flag
} from "./reducer";

// Helper CRUD
export const grlThunk = thunkApiHelper({
    addFuntion: thunkApiFunction("FlujoContratacion/postAddFlujoContratacionApi", postAddFlujoContratacionApi),
    getFuntion: thunkApiFunction("FlujoContratacion/getFlujoContratacionListApi", getFlujoContratacionListApi),
    getFunctionByID: thunkApiFunction("FlujoContratacion/getFlujoContratacionbyID", getFlujoContratacionbyIDApi),
    updateFuntion: thunkApiFunction("FlujoContratacion/updateFlujoContratacion", updateFlujoContratacionApi),
    deleteBodyFuntion: thunkApiFunction("FlujoContratacion/deleteFlujoContratacion", deleteFlujoContratacionApi),
    resetCreateFuntion: reset_create_flag,
    resetUpdateFuntion: reset_update_flag,
    
    // Filtros
    arrayThunk: {
        catalogosFunction: thunkApiFunction("FlujoContratacion/getFlujoContratacionCatalogos", getFlujoContratacionCatalogosApi),
    }
});

// General Function
export const getFlujoContratacionCatalogos = grlThunk.catalogosFunction;
export const postAddFlujoContratacion = grlThunk.addFuntion;
export const getFlujoContratacionList = grlThunk.getFuntion;
export const getFlujoContratacionbyID = grlThunk.getFunctionByID;
export const updateFlujoContratacion = grlThunk.updateFuntion;
export const deleteFlujoContratacion = grlThunk.deleteBodyFuntion;
export const resetAddFlowJournalFlag = grlThunk.resetCreateFuntion;
export const resetUpdateFlowJournalFlag = grlThunk.resetUpdateFuntion;
