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

function getRubro() {
  return api.get("/rubro", null);
}
function getRubroId(parameters) {
  return api.get(`/rubro/${parameters}`);
}

function putRubro(parameters) {
  return api.put(`/rubro/${parameters.idRubro}`, parameters);
}

export const apiCalls = {
  postArticulo,
  postAltaUsuario,
  postLogin,
  getRubro,
  getRubroId,
  putRubro,
};
