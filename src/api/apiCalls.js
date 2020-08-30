import api from "./api";

function postLogin(parameters) {
  return api.post("/login", parameters);
}

function postArticulo(parameters) {
  return api.post("/articulo", parameters);
}

function postAltaUsuario(parameters) {
  return api.post("/fisica", parameters);
}

export const apiCalls = {
  postArticulo,
  postAltaUsuario,
  postLogin,
};
