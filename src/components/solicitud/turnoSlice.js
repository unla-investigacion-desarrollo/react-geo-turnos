import { createSlice } from "@reduxjs/toolkit";
const moverTurno = (listaOrigen, listaDestino, idTurno) => {
  let turnoEncontrado = listaOrigen.find((turno) => turno.idTurno === idTurno);
  listaOrigen.splice(listaOrigen.indexOf(turnoEncontrado), 1);
  listaDestino.push(turnoEncontrado);
};

export const turnoSlice = createSlice({
  name: "turno",
  initialState: {
    turnosAceptados: [],
    turnosPendientes: [],
    turnosRechazados: [],
  },
  reducers: {
    cargarTurnos: (state, action) => {
      let auxTurnosAceptados = [];
      let auxTurnosPendientes = [];
      let auxTurnosRechazados = [];
      action.payload.forEach((turno) => {
        if (turno.estadoTurno.estado === "Disponible") {
          auxTurnosAceptados.push(turno);
        } else if (turno.estadoTurno.estado === "Rechazado") {
          auxTurnosRechazados.push(turno);
        } else {
          auxTurnosPendientes.push(turno);
        }
      });
      state.turnosRechazados = auxTurnosRechazados;
      state.turnosAceptados = auxTurnosAceptados;
      state.turnosPendientes = auxTurnosPendientes;
    },
    aceptarTurno: (state, action) => {
      moverTurno(state.turnosPendientes, state.turnosAceptados, action.payload);
    },
    rechazarTurno: (state, action) => {
      moverTurno(
        state.turnosPendientes,
        state.turnosRechazados,
        action.payload
      );
    },
    deshacerAceptado: (state, action) => {
      moverTurno(state.turnosAceptados, state.turnosPendientes, action.payload);
    }
  },
});

export const { cargarTurnos, aceptarTurno, rechazarTurno, deshacerAceptado } = turnoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTurnosAceptados = (state) => state.turno.turnosAceptados;
export const selectTurnosPendientes = (state) => state.turno.turnosPendientes;
export const selectTurnosRechazados = (state) => state.turno.turnosRechazados;

export default turnoSlice.reducer;
