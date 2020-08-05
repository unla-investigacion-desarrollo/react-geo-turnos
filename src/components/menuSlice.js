import { createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";
export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: 1,
  },
  reducers: {
    cambiarVista: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { cambiarVista } = menuSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMenuValor = (state) => state.menu.value;

export default menuSlice.reducer;
