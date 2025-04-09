import { createSlice } from "@reduxjs/toolkit";
import { reducerApiArrayHelper } from "../../helpers/reducerApi_helper";
import {
    getFlujoContratacionList, 
    postAddFlujoContratacion, 
    getFlujoContratacionbyID,
    updateFlujoContratacion,
    deleteFlujoContratacion,
    getFlujoContratacionCatalogos
} from './thunk';

// Helper Reduce
const grlReducer = reducerApiArrayHelper({
	name: "FlujoContratacionSlice",
    reducers: {
        reset_create_flag(state) {
            state.flujoContratacion = false;
            state.error = false;
            state.loading = false;
            state.success = false;
        },
        reset_update_flag(state) {
            state.flujoContratacionnUpd = [];
            state.errorUpd = false;
            state.loading = false;
            state.successUpd = false;
        },
    },
    extraReducers: () => ({
        flujoContratacionLists: { f: () => getFlujoContratacionList, isSucces: false },
        flujoContratacionAdd: { f: () => postAddFlujoContratacion, isSucces: true },
        flujoContratacionCatalogos: { f: () => getFlujoContratacionCatalogos, isSucces: false },
        flujoContratacion: { f: () => getFlujoContratacionbyID, isSucces: false },
        flujoContratacionnUpd: { f: () => updateFlujoContratacion, isSucces: true },
        flujoContratacionDel: { f: () => deleteFlujoContratacion, isSucces: true },
    })
});

export const {
    reset_create_flag,
    reset_update_flag
} = grlReducer.actions

export default grlReducer.reducer;


export const initialState = {
    flujoContratacionLists: [],
    flujoContratacionAdd: [],
    flujoContratacionCatalogos: [],
    flujoContratacion: false,
    flujoContratacionnUpd: [],
    flujoContratacionDel: [],
    successUpd: false,
    errorUpd: false,
};