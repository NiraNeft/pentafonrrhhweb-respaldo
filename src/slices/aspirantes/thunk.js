import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { thunkApiHelper, thunkApiFunction } from "../../helpers/thunkApi_helper";

//Include Both Helper File with needed methods
import {
    postAddAspirante as postAddAspiranteApi,
    getAspirantesList as getAspirantesListApi,

    setAspirantesEvaluar as setAspirantesEvaluarApi,
    setAspirantesLlamar as setAspirantesLlamarApi,
    setAspirantesAprobar as setAspirantesAprobarApi,
    setAspirantesRechazar as setAspirantesRechazarApi,
    setAspirantesContratar as setAspirantesContratarApi,
} from "../../helpers/hosterbackend_helper";

// action
import {
    reset_create_flag,
    reset_flags,
} from "./reducer";

// Helper CRUD
export const grlThunk = thunkApiHelper({
    addFuntion: thunkApiFunction("Aspirantes/postAddAspirante", postAddAspiranteApi),
    getFuntion: thunkApiFunction("Aspirantes/getAspirantesList", getAspirantesListApi),
    // -- getFunctionByID: thunkApiFunction("Aspirantes/getRequisicionbyID", ),
    // -- updateFuntion: thunkApiFunction("Aspirantes/updateRequisicion", ),
    // -- deleteBodyFuntion: thunkApiFunction("Aspirantes/deleteRequisicion", ),
    resetFuntion: reset_flags,
    resetCreateFuntion: reset_create_flag,
    // -- resetUpdateFuntion: reset_update_requisicion,

    // Filtros
    arrayThunk: {
        evaluarAspiranteFunction: thunkApiFunction("Aspirantes/setAspirantesEvaluar", setAspirantesEvaluarApi),
        llamarAspiranteFunction: thunkApiFunction("Aspirantes/setAspirantesLlamar", setAspirantesLlamarApi),
        aprobarAspiranteFunction: thunkApiFunction("Aspirantes/setAspirantesAprobar", setAspirantesAprobarApi),
        rechazarAspiranteFunction: thunkApiFunction("Aspirantes/setAspirantesRechazar", setAspirantesRechazarApi),
        contratarAspiranteFunction: thunkApiFunction("Aspirantes/setAspirantesContratar", setAspirantesContratarApi),
    }
});

// General Function
export const postAddAspirante = grlThunk.addFuntion;
export const getAspirantesList = grlThunk.getFuntion;
// -- export const  = grlThunk.getFunctionByID;
// -- export const  = grlThunk.updateFuntion;
// -- export const  = grlThunk.deleteBodyFuntion;

export const resetCreateFlag = grlThunk.resetCreateFuntion;
export const resetFlags = grlThunk.resetFuntion;
// -- export const  = grlThunk.resetUpdateFuntion;

export const setAspirantesEvaluar = grlThunk.evaluarAspiranteFunction;
export const setAspirantesLlamar = grlThunk.llamarAspiranteFunction;
export const setAspirantesAprobar = grlThunk.aprobarAspiranteFunction;
export const setAspirantesRechazar = grlThunk.rechazarAspiranteFunction;
export const setAspirantesContratar = grlThunk.contratarAspiranteFunction;

