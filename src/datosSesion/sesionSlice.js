import { createSlice } from "@reduxjs/toolkit";
export const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    iniciado: null,
    idPersona: "",
    idEmprendimiento: "",
    nombre: "",
    apellido: "",
    nombreEmprendimiento: "",
    tipoUsuario: "",
    idPerfil: "",
  },
  reducers: {
    cargarDatosSesion: (state, action) => {
      const dato = action.payload;
      state.iniciado=true;
      state.idPersona = dato.idPersona;
      state.idEmprendimiento = dato.idEmprendimiento;
      state.nombre = dato.nombre;
      state.apellido = dato.apellido;
      state.nombreEmprendimiento = dato.nombreEmprendimiento;
      state.tipoUsuario = dato.tipoUsuario;
      state.idPerfil = dato.idPerfil;
      localStorage.setItem("stateSesion", JSON.stringify(state));
    },

    borrarDatosSesion: (state, action) => {
      state.iniciado=false;
      state.idPersona= "";
      state.nombre= "";
      state.idEmprendimiento = "";
      state.apellido= "";
      state.nombreEmprendimiento= "";
      state.tipoUsuario= "";
      state.idPerfil = "";
      localStorage.clear();
    },

    setIniciado: (state, action) => {
      state.iniciado=action.payload;
    },

    cargarNombreEmprendimiento: (state, action) => {
      const dato = action.payload;
      state.nombreEmprendimiento = dato;
    },
  },
});

export const { cargarDatosSesion, borrarDatosSesion, cargarNombreEmprendimiento, setIniciado } = sesionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSesion = (state) => state.sesion;

export default sesionSlice.reducer;
