import { createSlice } from "@reduxjs/toolkit";
export const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    nombre: "Carlos",
    apellido: "Perez",
    nombreEmprendimiento: "Mi Panaderia",
    tipoUsuario: "",
  },
  reducers: {
    cargarDatosSesion: (state, action) => {
      state = action.payload;
    },

    borrarDatosSesion: (state, action) => {
      state = { nombre: "", apellido: "", nombreEmprendimiento: "" };
    },
  },
});

export const { cargarDatosSesion, borrarDatosSesion } = sesionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSesion = (state) => state.sesion;

export default sesionSlice.reducer;
