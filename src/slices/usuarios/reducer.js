import { createSlice } from "@reduxjs/toolkit";
import {
    postAddUsuario,
    getUsuariosList,
    getUsuariosbyID
} from './thunk';

export const initialState = {
    usuariosLists: [],
    usuario: [],
    error: false,
    loading: false,
    success: false,
};

const UsuariosSlice = createSlice({
    name: 'UsuariosSlice',
    initialState,
    reducers: {
        reset_createCreate_flag(state) {
            state.usuario = [];
            state.error = false;
            state.loading = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postAddUsuario.fulfilled, (state, action) => {
            if(action.payload.StatusCode == 200){
                state.success = true;
                state.error = false;
                state.usuariosLists.items.unshift(action.payload);
            } else {
                state.success = false;
                state.error = action.payload;
            }
        });
        builder.addCase(postAddUsuario.rejected, (state, action) => {
            state.success = false;
            state.error = action.payload || null;
            state.usuario = [];
        });
        

        builder.addCase(getUsuariosList.fulfilled, (state, action) => {
            if(action.payload.StatusCode == 200){
                state.error = false;
                state.usuariosLists = action.payload.data ? action.payload.data : action.payload;
            } else {
                state.success = false;
                state.error = action.payload;
            }
        });
        builder.addCase(getUsuariosList.rejected, (state, action) => {
            state.success = false;
            state.error = action.payload.error || null;
            state.usuario = [];
        });

        builder.addCase(getUsuariosbyID.fulfilled, (state, action) => {
            if(action.payload.status == 200){
                state.success = true;
                state.error = false;
                state.usuario = action.payload;
            } else {
                state.success = false;
                state.error = action.payload;
                state.usuario = [];
            }
        });
        builder.addCase(getUsuariosbyID.rejected, (state, action) => {
            state.success = false;
            state.error = action.payload.error || null;
            state.usuario = [];
        });
        

    }
});

export const {
    reset_createCreate_flag
} = UsuariosSlice.actions

export default UsuariosSlice.reducer;