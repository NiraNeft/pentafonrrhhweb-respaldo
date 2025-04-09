import { createSlice } from "@reduxjs/toolkit";
import { getDirectContact, getChannels, getMessages, addMessage, deleteMessage } from './thunk';

export const initialState = {
  chats: [],
  messages: {},
  channels: [],
  error: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDirectContact.fulfilled, (state, action) => {
      if(action.payload.StatusCode == 200){
          state.error = false;
          state.chats = action.payload.data ? action.payload.data : action.payload;
      } else {
          state.error = action.payload;
      }
    });
    builder.addCase(getDirectContact.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getChannels.fulfilled, (state, action) => {
      if(action.payload.StatusCode == 200){
          state.error = false;
          state.channels = action.payload.data ? action.payload.data : action.payload;
      } else {
          state.error = action.payload;
      }
    });
    builder.addCase(getChannels.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      if(action.payload.StatusCode == 200){
          state.error = false;
          state.messages = action.payload.data ? action.payload.data : action.payload;
      } else {
          state.error = action.payload;
      }
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addMessage.fulfilled, (state, action) => {
      if(action.payload.StatusCode == 200){
          state.error = false;
          if(state.messages.items){
            let messages = action.payload.data ? action.payload.data : action.payload;
            console.log("messages", messages);
            console.log("state.messages", state.messages.items);
            messages.map((e) => {
              state.messages.items.push(e);
              //state.messages.unshift(e);
            });
          }
      } else {
          state.error = action.payload;
      }
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.messages = (state.messages || []).filter((message) => message.id.toString() !== action.payload.toString());
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

  },
});

export default chatSlice.reducer;