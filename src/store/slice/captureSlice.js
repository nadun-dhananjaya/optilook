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
    screenTimeResponse: null,
    ageGroupResponse: null,
    jobCategoryReponse: null,
    previewURL: null,
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
    setScreenTimeResponse(state, action) {
      state.screenTimeResponse = action.payload;
    },
    setAgeGroupResponse(state, action) {
      state.ageGroupResponse = action.payload;
    },
    setJobCategoryResponse(state, action) {
      state.jobCategoryReponse = action.payload;
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
  setScreenTimeResponse,
  setAgeGroupResponse,
  setJobCategoryResponse,
  setPreviewURL,
} = captureSlice.actions;

export default captureSlice.reducer;
