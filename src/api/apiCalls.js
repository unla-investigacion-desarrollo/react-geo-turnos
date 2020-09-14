import api from "./api";
import apiLogIn from "./apiLogIn";

function postLogin(parameters) {
  return apiLogIn.post("/login", parameters);
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

function getMarcaId(parameters) {
  return api.get(`/marca/${parameters}`);
}

function putMarca(parameters) {
  return api.put(`/marca/${parameters.idMarca}`, parameters);
}

function getCategoria() {
  return api.get("/categoria", null);
}

function getCategoriaId(parameters) {
  return api.get(`/categoria/${parameters}`);
}

function putCategoria(parameters) {
  return api.put(`/categoria/${parameters.idCategoria}`, parameters);
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

function getTipoEmprendimiento() {
  return api.get("/tipoEmprendimiento", null);
}
function getTipoEmprendimientoId(parameters) {
  return api.get(`/tipoEmprendimiento/${parameters}`);
}

function putTipoEmprendimiento(parameters) {
  return api.put(
    `/tipoEmprendimiento/${parameters.idTipoEmprendimiento}`,
    parameters
  );
}

function postRegistro(parameters) {
  return api.post("/registro", parameters);
}

export const apiCalls = {
  postArticulo,
  postAltaUsuario,
  postLogin,
  getRubro,
  getRubroId,
  putRubro,
  getMarca,
  getMarcaId,
  putMarca,
  getCategoria,
  getCategoriaId,
  putCategoria,
  getUnidadMedida,
  postArticuloReferencia,
  getArticuloReferencia,
  getArticuloReferenciaId,
  putArticuloReferencia,
  getTipoEmprendimiento,
  getTipoEmprendimientoId,
  putTipoEmprendimiento,
  postRegistro,
};
