import { createSlice } from "@reduxjs/toolkit";
import { reducerApiArrayHelper } from "../../helpers/reducerApi_helper";
import {
    getRequisicionesList, 
    postAddRequisicion, 
    getRequisicionbyID,
    getRequisicionesCatalogos,
    updateRequisicion,
    deleteRequisicion,
    switchEstatusFunction
} from './thunk';

// Helper Reduce
const grlReducer = reducerApiArrayHelper({
	name: "RequisicionesSlice",
    reducers: {
        reset_create_requisicion(state) {
            state.requisicion = false;
            state.error = false;
            state.loading = false;
            state.success = false;
        },
        reset_update_requisicion(state) {
            state.requisicionUpd = [];
            state.errorUpd = false;
            state.loading = false;
            state.successUpd = false;
        },
    },
    extraReducers: () => ({
        requisicionesLists: { f: () => getRequisicionesList, isSucces: false },
        requisicionAdd: { f: () => postAddRequisicion, isSucces: true },
        requisicionCatalogos: { f: () => getRequisicionesCatalogos, isSucces: false },
        requisicion: { f: () => getRequisicionbyID, isSucces: false },
        requisicionUpd: { f: () => updateRequisicion, isSucces: true },
        requisicionDel: { f: () => deleteRequisicion, isSucces: true },
        requisicionUpe: { f: () => switchEstatusFunction, isSucces: true },
    })
});

export const {
    reset_create_requisicion,
    reset_update_requisicion,
} = grlReducer.actions

export default grlReducer.reducer;


export const initialState = {
    requisicionesLists: [],
    requisicionAdd: false,
    requisicion: false,
    requisicionCatalogos: [],
    requisicion: false,
    requisicionUpd: false,
    requisicionDel: false,
    requisicionUpe: false,
};