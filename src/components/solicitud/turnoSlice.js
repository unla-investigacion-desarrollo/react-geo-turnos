import { createSlice } from "@reduxjs/toolkit";
export const turnoSlice = createSlice({
  name: "turno",
  initialState: {
    turnosAceptados: [],
    turnosPendientes: [],
  },
  reducers: {
    cargarTurnos: (state, action) => {
      let auxTurnosAceptados = [];
      let auxTurnosPendientes = [];
      action.payload.forEach((turno) => {
        if (turno.estadoTurno.estado === "Disponible") {
          auxTurnosAceptados.push(turno);
        } else {
          auxTurnosPendientes.push(turno);
        }
      });
      state.turnosAceptados = auxTurnosAceptados;
      state.turnosPendientes = auxTurnosPendientes;
    },
  },
});

export const { cargarTurnos } = turnoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTurnosAceptados = (state) => state.turno.turnosAceptados;
export const selectTurnosPendientes = (state) => state.turno.turnosPendientes;

export default turnoSlice.reducer;
