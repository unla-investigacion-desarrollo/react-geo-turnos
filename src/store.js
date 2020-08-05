import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./components/menuSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
  },
});
