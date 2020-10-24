import { createSlice } from "@reduxjs/toolkit";
export const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    idPersona: "",
    nombre: "",
    apellido: "",
    nombreEmprendimiento: "",
    tipoUsuario: "",
  },
  reducers: {
    cargarDatosSesion: (state, action) => {
      const dato = action.payload;
      state.idPersona = dato.idPersona;
      state.nombre = dato.nombre;
      state.apellido = dato.apellido;
      state.nombreEmprendimiento = dato.nombreEmprendimiento;
      state.tipoUsuario = dato.tipoUsuario;
      localStorage.setItem("stateSesion", JSON.stringify(state));
    },

    borrarDatosSesion: (state, action) => {
      state.idPersona= "";
      state.nombre= "";
      state.apellido= "";
      state.nombreEmprendimiento= "";
      state.tipoUsuario= "";
      localStorage.clear();
    },
  },
});

export const { cargarDatosSesion, borrarDatosSesion } = sesionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSesion = (state) => state.sesion;

export default sesionSlice.reducer;
