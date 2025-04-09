import { createSlice } from "@reduxjs/toolkit";
import { reducerApiArrayHelper } from "../../helpers/reducerApi_helper";
import {
    postAddAspirante, 
    getAspirantesList, 
    setAspirantesEvaluar,
    setAspirantesLlamar,
    setAspirantesAprobar,
    setAspirantesRechazar,
    setAspirantesContratar
} from './thunk';

// Helper Reduce
const grlReducer = reducerApiArrayHelper({
    name: "AspirantesSlice",
    reducers: {
        reset_create_flag(state) {
            state.aspirante = [];
            state.error = false;
            state.loading = false;
            state.success = false;
        },
        reset_flags(state) {
            state.error = false;
            state.loading = false;
            state.success = false;
        },
    },
    extraReducers: () => ({
        aspirantesLists: { f: () => getAspirantesList, isSucces: false },
        aspiranteAdd: { f: () => postAddAspirante, isSucces: true },

        // -- requisicion: { f: () => getRequisicionbyID, isSucces: false },
        // -- requisicionUpd: { f: () => updateRequisicion, isSucces: true },
        // -- requisicionDel: { f: () => deleteRequisicion, isSucces: true },
        
        aspirantesEvaluar: { f: () => setAspirantesEvaluar, isSucces: false },
        aspirantesLlamar: { f: () => setAspirantesLlamar, isSucces: true },
        aspirantesAprobar: { f: () => setAspirantesAprobar, isSucces: true },
        aspirantesRechazar: { f: () => setAspirantesRechazar, isSucces: true },
        aspirantesContratar: { f: () => setAspirantesContratar, isSucces: true },
    })
});

export const {
    reset_create_flag,
    reset_flags,
} = grlReducer.actions

export default grlReducer.reducer;
