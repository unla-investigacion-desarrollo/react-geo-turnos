import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./components/navbar/menuSlice";
import turnoReducer from "./components/solicitud/turnoSlice";
import funcionReducer from "./components/perfil/funcionSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    turno: turnoReducer,
    funcion: funcionReducer,
  },
});
