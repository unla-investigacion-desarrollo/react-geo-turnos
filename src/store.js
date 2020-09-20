import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./components/navbar/menuSlice";
import turnoReducer from "./components/solicitud/turnoSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    turno: turnoReducer,
  },
});
