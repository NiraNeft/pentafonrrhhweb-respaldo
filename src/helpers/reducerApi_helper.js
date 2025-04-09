import { createSlice } from "@reduxjs/toolkit";

export const reducerApiArrayHelper = (config) => {
    let initialState = {
        error: false,
        loading: false,
        success: false,
    };

    Object.keys(config.extraReducers()).map((key) => {
        initialState[key] = false;
    });

    if(!config.reducers) config.reducers = {};
    
    const generalsSlice = createSlice({
        name: config.name + 'Slice',
        initialState,
        reducers: config.reducers,
        extraReducers: (builder) => {
            const thunks = config.extraReducers();
            // Agregar
            Object.keys(thunks).map((key) => {
                if((typeof thunks[key].f === "function")){
                    const thunk = thunks[key].f();
                    builder.addCase(thunk.pending, (state, action) => {
                        //state.loading = true;
                    });
                    builder.addCase(thunk.fulfilled, (state, action) => {
                        if(action.payload.StatusCode == 200){
                            state.loading = false;
                            if(thunks[key].isSucces)
                                state.success = true;
                            state.error = false;
                            state[key] = action.payload.data ? action.payload.data : action.payload;
                        } else {
                            state.loading = false;
                            if(thunks[key].isSucces)
                                state.success = false;
                            state.error = action.payload;
                            state[key] = false;
                        }
                    });
                    builder.addCase(thunk.rejected, (state, action) => {
                        console.log("[reducerApiArrayHelper] action.rejected", action.payload);
                        state.loading = false;
                        if(thunks[key].isSucces)
                            state.success = false;
                        state.error = action.payload.error || {};
                        state[key] = false;
                    });
                }
            });
        }
    });
    
    return generalsSlice;
}