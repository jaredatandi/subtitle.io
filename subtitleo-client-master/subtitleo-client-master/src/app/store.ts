import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/ThemeSlice";
import authReducer from "./features/auth/AuthSlice";
import effectsReducer from "./features/effects/effectsSlice";
import foldersReducer from "./features/folders/folderSlice";
import projectsReducer from "./features/projects/projectsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    effects: effectsReducer,
    folders: foldersReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
