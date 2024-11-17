import { configureStore } from "@reduxjs/toolkit";
import captureReducer from "./slice/captureSlice";

const store = configureStore({
  reducer: {
    capture: captureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["capture/setImageFile"], // Ignore specific actions
        ignoredPaths: ["capture.imageFile"], // Ignore specific state paths
      },
    }),
});

export default store;
