import { createSlice } from "@reduxjs/toolkit";
import { getFolders, addNewFolder, updateFolder, deleteFolder, getFiles, addNewFile, updateFile, deleteFile } from './thunk';
export const initialState = {
  folders: [],
  files: [],
  error: {},
};

const FileManagerSlice = createSlice({
  name: 'FileManagerSlice',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getFolders.fulfilled, (state, action) => {
      //state.folders = action.payload || [];
      state.folders = [
        { id: 1, folderName: "Projects", folderFile: "349", size: "4.10" },
        { id: 2, folderName: "Documents", folderFile: "2349", size: "27.01" },
        { id: 3, folderName: "Media", folderFile: "12480", size: "20.87" },
        { id: 4, folderName: "Velzon v1.7.0", folderFile: "180", size: "478.65" },
      ];
      console.log("getFolders.fulfilled", state.folders);
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.error = action.payload;
      state.folders = [
        { id: 1, folderName: "Projects", folderFile: "349", size: "4.10" },
        { id: 2, folderName: "Documents", folderFile: "2349", size: "27.01" },
        { id: 3, folderName: "Media", folderFile: "12480", size: "20.87" },
        { id: 4, folderName: "Velzon v1.7.0", folderFile: "180", size: "478.65" },
      ];
      console.log("getFolders", state.folders);
    });

    builder.addCase(addNewFolder.fulfilled, (state, action) => {
      state.folders.unshift(action.payload);
    });
    builder.addCase(addNewFolder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateFolder.fulfilled, (state, action) => {
      state.folders = state.folders.map(folder =>
        folder.id.toString() === action.payload.id.toString()
          ? { ...folder, ...action.payload }
          : folder
      );
    });

    builder.addCase(updateFolder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      state.folders = state.folders.filter(
        folder => (folder.id + "") !== (action.payload + "") 
      );
    });
    builder.addCase(deleteFolder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getFiles.fulfilled, (state, action) => {
      if(action.payload.StatusCode == 200){
          state.error = false;
          state.files = action.payload.data ? action.payload.data : action.payload;
      } else {
          state.success = false;
          state.error = action.payload;
      }
    });
    builder.addCase(getFiles.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload.error || null;
      state.files = [];
    });

    builder.addCase(addNewFile.fulfilled, (state, action) => {
      state.files.unshift(action.payload);
    });

    builder.addCase(addNewFile.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.files = state.files.map(files =>
        files.id.toString() === action.payload.id.toString()
          ? { ...files, ...action.payload }
          : files
      );
    });

    builder.addCase(updateFile.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.files = state.files.filter(
        file => (file.id + "") !== (action.payload + "")
      );
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  }
});

export default FileManagerSlice.reducer;