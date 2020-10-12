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
      state.funcionOtorgados = [];
    },

    cargarFuncionesOtorgadas: (state, action) => {
      state.funcionOtorgados = action.payload;
      let encontrado = null;
      state.funcionOtorgados.forEach((funcion) => {
        encontrado = null;
        encontrado = state.funcionDisponibles.find((funcionD)=>funcion.idFuncion === funcionD.idFuncion);
        if(encontrado){state.funcionDisponibles.splice(state.funcionDisponibles.indexOf(encontrado), 1)}
      });
    },

    otorgarFuncion: (state, action) => {
      let idFuncion = action.payload;
      let funcionEncontrada = state.funcionDisponibles.find(
        (funcion) => funcion.idFuncion === idFuncion
      );
      state.funcionDisponibles.splice(
        state.funcionDisponibles.indexOf(funcionEncontrada),
        1
      );
      state.funcionOtorgados.push(funcionEncontrada);
    },

    removerFuncion: (state, action) => {
      let idFuncion = action.payload;
      let funcionEncontrada = state.funcionOtorgados.find(
        (funcion) => funcion.idFuncion === idFuncion
      );
      state.funcionOtorgados.splice(
        state.funcionOtorgados.indexOf(funcionEncontrada),
        1
      );
      state.funcionDisponibles.push(funcionEncontrada);
    },
  },
});

export const {
  cargarFuncionesDisp,
  otorgarFuncion,
  removerFuncion,
  cargarFuncionesOtorgadas
} = funcionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFuncionDisponibles = (state) =>
  state.funcion.funcionDisponibles;
export const selectFuncionOtorgados = (state) => state.funcion.funcionOtorgados;

export default funcionSlice.reducer;
