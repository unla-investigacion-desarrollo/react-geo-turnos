import { createSlice } from "@reduxjs/toolkit";
export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: 2,
    mostrarMenu: false,
    setDeDatos: {},
  },
  reducers: {
    cambiarVista: (state, action) => {
      state.value = action.payload;
    },
    switchMostrarMenu: (state, action) => {
      state.mostrarMenu = !state.mostrarMenu;
    },
    cambiarVistaConDatos: {
      reducer(state, action) {
        state.value = action.payload.value;
        state.setDeDatos = action.payload.setDeDatos;
      },
      prepare(value, setDeDatos) {
        return { payload: { value: value, setDeDatos: setDeDatos } };
      },
    },
  },
});

export const {
  cambiarVista,
  cambiarVistaConDatos,
  switchMostrarMenu,
} = menuSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMenuValor = (state) => state.menu.value;
export const selectMenuSetDeDatos = (state) => state.menu.setDeDatos;
export const mostrarMenu = (state) => state.menu.mostrarMenu;

export default menuSlice.reducer;
