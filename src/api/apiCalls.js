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

function getMarca() {
  return api.get("/marca", null);
}

function getCategoria() {
  return api.get("/categoria", null);
}
function getUnidadMedida() {
  return api.get("/unidadMedida", null);
}

function postArticuloReferencia(parameters) {
  return api.post(`/articuloReferencia`, parameters);
}

function getArticuloReferencia() {
  return api.get(`/articuloReferencia`, null);
}

function getArticuloReferenciaId(parameters) {
  return api.get(`/articuloReferencia/${parameters}`);
}

function putArticuloReferencia(parameters) {
  return api.put(
    `/articuloReferencia/${parameters.idArticuloReferencia}`,
    parameters
  );
}

export const apiCalls = {
  postArticulo,
  postAltaUsuario,
  postLogin,
  getRubro,
  getRubroId,
  putRubro,
  getMarca,
  getCategoria,
  getUnidadMedida,
  postArticuloReferencia,
  getArticuloReferencia,
  getArticuloReferenciaId,
  putArticuloReferencia,
};
