import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "capture",
  initialState: {
    isLoading: false,
    imageFile: null,
    faceShapeResponse: null,
    skinToneResponse: null,
    frameShapeResponse: null,
    frameColorResponse: null,
    previewURL: null, // For storing the captured image's preview URL
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setImageFile(state, action) {
      state.imageFile = action.payload;
    },
    setFaceShapeResponse(state, action) {
      state.faceShapeResponse = action.payload;
    },
    setSkinToneResponse(state, action) {
      state.skinToneResponse = action.payload;
    },
    setFrameShapeResponse(state, action) {
      state.frameShapeResponse = action.payload;
    },
    setFrameColorResponse(state, action) {
      state.frameColorResponse = action.payload;
    },
    setPreviewURL(state, action) {
      state.previewURL = action.payload; // Store the preview URL
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setImageFile,
  setFaceShapeResponse,
  setSkinToneResponse,
  setFrameShapeResponse,
  setFrameColorResponse,
  setPreviewURL,
} = captureSlice.actions;

export default captureSlice.reducer;
