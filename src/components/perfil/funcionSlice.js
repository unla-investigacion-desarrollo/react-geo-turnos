import { createSlice } from "@reduxjs/toolkit";
export const funcionSlice = createSlice({
  name: "funcion",
  initialState: {
    funcionOtorgados: [],
    funcionDisponibles: [],
  },
  reducers: {
    cargarFuncionesDisp: (state, action) => {
      state.funcionDisponibles = action.payload;
    },
  },
});

export const { cargarFuncionesDisp } = funcionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFuncionDisponibles = (state) =>
  state.funcion.funcionDisponibles;

export default funcionSlice.reducer;
