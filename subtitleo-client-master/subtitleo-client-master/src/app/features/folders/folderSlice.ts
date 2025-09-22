import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "service/axios";

type InitialStateType = {
  loading: boolean;
  error: boolean;
  errorUpdateFolder: boolean;
  errorMessage: null | string;
  errorMessageUpdateFolder: null | string;
  folders: any[];
  folderUpdateSuccess: boolean;
  updateFolderLoading: boolean;
  folderDeleteSuccess: boolean;
  errorDeleteFolder: boolean;
  errorMessageDeleteFolder: null | string;
  deleteFolderLoading: boolean;
  folderAddSuccess: boolean;
  errorAddFolder: boolean;
  errorMessageAddFolder: null | string;
  addFolderLoading: boolean;
};

const initialState = {
  folders: [],
  loading: false,
  error: false,
  errorMessage: null,
  folderUpdateSuccess: false,
  updateFolderLoading: false,
  errorUpdateFolder: false,
  errorMessageUpdateFolder: null,
  folderDeleteSuccess: false,
  errorDeleteFolder: false,
  errorMessageDeleteFolder: null,
  deleteFolderLoading: false,
  folderAddSuccess: false,
  errorAddFolder: false,
  errorMessageAddFolder: null,
  addFolderLoading: false,
} as InitialStateType;

export const getAllFoldersByUserId = createAsyncThunk(
  "folders/getAllFoldersByFolderId",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get("/folders/all");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error fetching folders!",
        },
      });
    }
  }
);

export const changeFolderNameByFolderId = createAsyncThunk(
  "folders/changeFolderNameByFolderId",
  async ({ folderId, data }: { folderId: number; data: object }, thunkAPI) => {
    try {
      const response = await axiosPrivate.patch(
        `/folders/update-name/${folderId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error updating folder!",
        },
      });
    }
  }
);
export const deleteFolderByFolderId = createAsyncThunk(
  "folders/deleteFolderByFolderId",
  async ({ folderId }: { folderId: number | null }, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(`/folders/delete/${folderId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error deleting folder!",
        },
      });
    }
  }
);

export const addFolder = createAsyncThunk(
  "folders/addFolder",
  async ({ folderName }: { folderName: string }, thunkAPI) => {
    try {
      const response = await axiosPrivate.post(`/folders/add`, {
        folderName,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error creating folder!",
        },
      });
    }
  }
);

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFoldersByUserId.pending, (state, action) => {
        state.loading = true;
        state.addFolderLoading = false;
        state.deleteFolderLoading = false;
        state.updateFolderLoading = false;
      })
      .addCase(getAllFoldersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorMessage = null;
        state.folders = action.payload;
        state.folderAddSuccess = false;
        state.folderDeleteSuccess = false;
        state.folderUpdateSuccess = false;
        state.errorAddFolder = false;
        state.errorDeleteFolder = false;
        state.errorUpdateFolder = false;
      })
      .addCase(getAllFoldersByUserId.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action?.payload?.data?.message || null;
      })
      .addCase(changeFolderNameByFolderId.pending, (state, action) => {
        state.updateFolderLoading = true;
      })
      .addCase(changeFolderNameByFolderId.fulfilled, (state, action) => {
        state.updateFolderLoading = false;
        state.errorUpdateFolder = false;
        state.errorMessageUpdateFolder = null;
        state.folderUpdateSuccess = true;
      })
      .addCase(changeFolderNameByFolderId.rejected, (state, action: any) => {
        state.updateFolderLoading = false;
        state.errorUpdateFolder = false;
        state.errorMessageUpdateFolder = action?.payload?.data?.message || null;
        state.folderUpdateSuccess = false;
      })
      .addCase(deleteFolderByFolderId.pending, (state, action) => {
        state.deleteFolderLoading = true;
      })
      .addCase(deleteFolderByFolderId.fulfilled, (state, action) => {
        state.deleteFolderLoading = false;
        state.errorDeleteFolder = false;
        state.errorMessageDeleteFolder = null;
        state.folderDeleteSuccess = true;
      })
      .addCase(deleteFolderByFolderId.rejected, (state, action: any) => {
        state.deleteFolderLoading = false;
        state.errorDeleteFolder = false;
        state.errorMessageDeleteFolder = action?.payload?.data?.message || null;
        state.folderDeleteSuccess = false;
      })
      .addCase(addFolder.pending, (state, action) => {
        state.addFolderLoading = true;
      })
      .addCase(addFolder.fulfilled, (state, action) => {
        state.addFolderLoading = false;
        state.errorAddFolder = false;
        state.errorMessageAddFolder = null;
        state.folderAddSuccess = true;
      })
      .addCase(addFolder.rejected, (state, action: any) => {
        state.addFolderLoading = false;
        state.errorAddFolder = false;
        state.errorMessageAddFolder = action?.payload?.data?.message || null;
        state.folderAddSuccess = false;
      });
  },
});

export default foldersSlice.reducer;
