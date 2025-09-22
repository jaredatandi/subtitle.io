import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "service/axios";

type InitialStateType = {
  loadingGetProjects: boolean;
  errorGetProjects: boolean;
  errorMessageGetProjects: null | string;
  projects: any[];
  project: object;
  loadingGetProjectById: boolean;
  errorGetProjectById: boolean;
  errorMessageGetProjectById: string | null;
  latestProjects: any[];
  loadingUpdateProjectName: boolean;
  errorUpdateProjectName: boolean;
  errorMessageUpdateProjectName: null | string;
  loadingDeleteProject: boolean;
  errorDeleteProject: boolean;
  errorMessageDeleteProject: null | string;
  projectNameUpdateSuccess: boolean;
  projectDeleteSuccess: boolean;
};

const initialState = {
  loadingGetProjects: false,
  errorGetProjects: false,
  errorMessageGetProjects: null,
  projects: [],
  project: {},
  loadingGetProjectById: false,
  errorGetProjectById: false,
  errorMessageGetProjectById: null,
  latestProjects: [],
  loadingUpdateProjectName: false,
  errorUpdateProjectName: false,
  errorMessageUpdateProjectName: null,
  loadingDeleteProject: false,
  errorDeleteProject: false,
  errorMessageDeleteProject: null,
  projectNameUpdateSuccess: false,
  projectDeleteSuccess: false,
} as InitialStateType;

export const getAllProjectsByFolderId = createAsyncThunk(
  "folders/getAllProjectsByFolderId",
  async ({ folderId }: { folderId: number | string | undefined }, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(
        `/projects/all-by-folder-id/${folderId}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error fetching projects!",
        },
      });
    }
  }
);
export const getProjectById = createAsyncThunk(
  "folders/getProjectById",
  async (
    { projectId }: { projectId: number | string | undefined },
    thunkAPI
  ) => {
    try {
      const response = await axiosPrivate.get(
        `/projects/get-by-id/${projectId}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error fetching project!",
        },
      });
    }
  }
);
export const getLatestProjects = createAsyncThunk(
  "projects/get-latest-projects",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/projects/get-latest-projects`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error fetching project!",
        },
      });
    }
  }
);

export const changeProjectNameByProjectId = createAsyncThunk(
  "projects/changeProjectNameByProjectId",
  async (
    { projectId, data }: { projectId: number; data: object },
    thunkAPI
  ) => {
    try {
      const response = await axiosPrivate.patch(
        `/projects/update-name/${projectId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || {
          message: "There was an error updating project name!",
        },
      });
    }
  }
);
export const deleteProjectByProjectId = createAsyncThunk(
  "projects/deleteFolderByFolderId",
  async ({ projectId }: { projectId: number | null }, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(
        `/projects/delete/${projectId}`
      );
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

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsByFolderId.pending, (state, action) => {
        state.loadingGetProjects = true;
        state.loadingUpdateProjectName = false;
        state.loadingDeleteProject = false;
      })
      .addCase(getAllProjectsByFolderId.fulfilled, (state, action) => {
        state.loadingGetProjects = false;
        state.errorGetProjects = false;
        state.errorMessageGetProjects = null;
        state.projects = action.payload;
        state.errorDeleteProject = false;
        state.errorUpdateProjectName = false;
        state.projectNameUpdateSuccess = false;
        state.projectDeleteSuccess = false;
      })
      .addCase(getAllProjectsByFolderId.rejected, (state, action: any) => {
        state.loadingGetProjects = false;
        state.errorGetProjects = true;
        state.errorMessageGetProjects = action?.payload?.data?.message || null;
      })
      .addCase(getProjectById.pending, (state, action) => {
        state.loadingGetProjectById = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loadingGetProjectById = false;
        state.errorGetProjectById = false;
        state.errorMessageGetProjectById = null;
        state.project = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action: any) => {
        state.loadingGetProjectById = false;
        state.errorGetProjectById = true;
        state.errorMessageGetProjectById =
          action?.payload?.data?.message || null;
      })
      .addCase(getLatestProjects.pending, (state, action) => {
        state.latestProjects = [];
      })
      .addCase(getLatestProjects.fulfilled, (state, action) => {
        state.latestProjects = action.payload;
      })
      .addCase(getLatestProjects.rejected, (state, action: any) => {
        state.latestProjects = [];
      })
      .addCase(changeProjectNameByProjectId.pending, (state, action) => {
        state.loadingUpdateProjectName = true;
      })
      .addCase(changeProjectNameByProjectId.fulfilled, (state, action) => {
        state.loadingUpdateProjectName = false;
        state.projectNameUpdateSuccess = true;
      })
      .addCase(changeProjectNameByProjectId.rejected, (state, action: any) => {
        state.loadingUpdateProjectName = false;
        state.errorUpdateProjectName = true;
        state.errorMessageUpdateProjectName =
          action?.payload?.data?.message || null;
        state.projectNameUpdateSuccess = false;
      })
      .addCase(deleteProjectByProjectId.pending, (state, action) => {
        state.loadingDeleteProject = true;
      })
      .addCase(deleteProjectByProjectId.fulfilled, (state, action) => {
        state.loadingDeleteProject = false;
        state.projectDeleteSuccess = true;
      })
      .addCase(deleteProjectByProjectId.rejected, (state, action: any) => {
        state.loadingDeleteProject = false;
        state.errorDeleteProject = true;
        state.errorMessageDeleteProject =
          action?.payload?.data?.message || null;
        state.projectDeleteSuccess = false;
      });
  },
});

export default projectsSlice.reducer;
