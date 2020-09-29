import { createSlice } from "@reduxjs/toolkit";
export const registroSlice = createSlice({
  name: "registro",
  initialState: {
    datosPersonales: {},
    datosEmprendimiento: {},
  },
  reducers: {
    cargarSetDeDatosPersonales: (state, action) => {
      state.datosPersonales = action.payload;
    },
    cargarSetDeDatosEmprendimiento: (state, action) => {
      state.datosEmprendimiento = action.payload;
    },
  },
});

export const {
  cargarSetDeDatosPersonales,
  cargarSetDeDatosEmprendimiento,
} = registroSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDatosPersonales = (state) => state.registro.datosPersonales;
export const selectDatosEmprendimiento = (state) =>
  state.registro.datosEmprendimiento;

export default registroSlice.reducer;
