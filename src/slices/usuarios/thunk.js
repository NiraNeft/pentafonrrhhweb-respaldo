import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
    postAddUsuario as postAddUsuarioApi,
    getUsuariosList as getUsuariosListApi,
    getUsuariosbyID as getUsuariosbyIDApi,
} from "../../helpers/hosterbackend_helper";

// action
import {
    reset_createCreate_flag
} from "./reducer";

// Functions
export const postAddUsuario = createAsyncThunk("Usuarios/postAddUsuario", async (dataIn) => {
    try {
        let url_params = (dataIn && dataIn.params ? dataIn.params : false);
        const response = postAddUsuarioApi(url_params, dataIn.data);
        const data = await response;
        return data;
    } catch (error) {
        return { error: error };
    }
});

export const getUsuariosList = createAsyncThunk("Usuarios/getUsuariosList", async (pagination) => {
    try {
        let url_params = (pagination ? pagination : false);
        const response = getUsuariosListApi(url_params);
        return response;
    } catch (error) {
        return { error: error };
    }
});

export const getUsuariosbyID = createAsyncThunk("Usuarios/getUsuariosbyID", async (params) => {
    try {
        let url_params = (params ? params : false);
        const response = getUsuariosbyIDApi(url_params);
        return response;
    } catch (error) {
        return { error: error };
    }
});


export const resetCreateUserFlag = () => {
  try {
    const response = reset_createCreate_flag();
    return response;
  } catch (error) {
    return error;
  }
};
