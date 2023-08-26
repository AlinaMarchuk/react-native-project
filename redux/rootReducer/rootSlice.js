import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  pubs: [],
  chosenPub: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.pubs = [];
    },
    getAllPubs: (state, action) => {
      console.log("action:", action);
      state.pubs = action.payload;
    },
    addPub: (state, action) => {
      state.pubs.push(action.payload);
    },
    deletePub: (state, action) => {
      state.pubs = state.pubs.filter((pub) => pub.id !== action.payload.id);
    },
    chosePub: (state, action) => {
      state.chosenPub = action.payload;
    },
    clearChosePub: (state, action) => {
      state.chosenPub = null;
    },
    getComments: (state, action) => {
      state.chosenPub.comments = action.payload;
    },
    addComment: (state, action) => {
      state.chosenPub.comments.push(action.payload);
    },
  },
});

export const rootReducer = rootSlice.reducer;
export const {
  saveUser,
  clearUser,
  updateUser,
  getAllPubs,
  addPub,
  deletePubs,
  chosePub,
  clearChosePub,
  getComments,
  addComment,
} = rootSlice.actions;
