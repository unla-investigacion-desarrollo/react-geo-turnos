import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./components/navbar/menuSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
  },
});
