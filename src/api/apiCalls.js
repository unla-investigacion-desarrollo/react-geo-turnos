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

function postRubro(parameters) {
  return api.post(`/rubro`, parameters);
}

function deleteRubro(parameters) {
  return api.delete(`/rubro/${parameters}`);
}

function getMarca() {
  return api.get("/marca", null);
}

function getMarcaId(parameters) {
  return api.get(`/marca/${parameters}`);
}

function postMarca(parameters) {
  return api.post(`/marca`, parameters);
}

function putMarca(parameters) {
  return api.put(`/marca/${parameters.idMarca}`, parameters);
}

function deleteMarca(parameters) {
  return api.delete(`/marca/${parameters}`);
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

function postCategoria(parameters) {
  return api.post(`/categoria`, parameters);
}

function deleteCategoria(parameters) {
  return api.delete(`/categoria/${parameters}`);
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

function deleteArticuloReferencia(parameters) {
  return api.delete(`/articuloReferencia/${parameters}`);
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

function postTipoEmprendimiento(parameters) {
  return api.post(`/tipoEmprendimiento`, parameters);
}

function deleteTipoEmprendimiento(parameters) {
  return api.delete(`/tipoEmprendimiento/${parameters}`);
}

function postRegistro(parameters) {
  return apiLogIn.post("/fisica", parameters);
}

function getTurno(idEmp, idEstTurno) {
  return api.get(`/emprendimiento/${idEmp}/turnos?estadoTurno=${idEstTurno}`);
}

function getPerfil() {
  return api.get("/perfil", null);
}
function postPerfil(parameters) {
  return api.post("/perfil", parameters);
}
function putPerfil(parameters) {
  return api.put(`/perfil/${parameters.idPerfil}`, parameters);
}
function getPerfilId(parameters) {
  return api.get(`/perfil/${parameters}`);
}

function getFuncionesPerfil(parameters){
  return api.get(`/perfil/${parameters}/funciones`);
}

function postFuncionPerfil(parameters) {
  return api.post("/funcionPerfil", parameters);
}

function getFuncion() {
  return api.get("/funcion", null);
}

function getProvincia() {
  return api.get("/provincia", null);
}

function getProvinciaId(parameters){
  return api.get(`/provincia/${parameters}`);
}

function getLocalidades(parameters) {
  return api.get(`/provincia/${parameters}/localidades`);
}

function putTurno(parameters) {
  return api.put(`/turno/${parameters.idTurno}`, parameters);
}

function postRestablecerPassword(parameters) {
  return api.post("/persona/resetpassword/", parameters);
}

function getPersonaFisica(parameters) {
  return api.get(`/fisica/${parameters}`);
}

function putPersonaFisica(parameters){
  return api.put(`/fisica/${parameters.idPersona}`, parameters);
}

function getPersona(parameters) {
  return api.get(`/persona/${parameters}`);
}


function getEmprendimientoId(parameters){
  return api.get(`/emprendimiento/${parameters}`);
}

function getPassword(parameters){
  return api.get(`/persona/changePassword?token=${parameters}`);
}

function savePassword(parameters){
  return api.post(`/persona/savePassword/${parameters}`)
}

function postEmprendimiento(parameters) {
  return api.post("/emprendimiento", parameters);
}

function putEmprendimiento(parameters){
  return api.put(`/emprendimiento/${parameters.idEmprendimiento}`, parameters);
}

export const apiCalls = {
  postArticulo,
  postAltaUsuario,
  postLogin,
  getRubro,
  getRubroId,
  putRubro,
  postRubro,
  deleteRubro,
  getMarca,
  getMarcaId,
  putMarca,
  postMarca,
  deleteMarca,
  getCategoria,
  getCategoriaId,
  putCategoria,
  postCategoria,
  deleteCategoria,
  getUnidadMedida,
  postArticuloReferencia,
  getArticuloReferencia,
  getArticuloReferenciaId,
  putArticuloReferencia,
  deleteArticuloReferencia,
  getTipoEmprendimiento,
  getTipoEmprendimientoId,
  putTipoEmprendimiento,
  postTipoEmprendimiento,
  deleteTipoEmprendimiento,
  postRegistro,
  getTurno,
  getPerfil,
  postPerfil,
  putPerfil,
  getPerfilId,
  getFuncion,
  getProvincia,
  getProvinciaId,
  getLocalidades,
  postFuncionPerfil,
  putTurno,
  getFuncionesPerfil,
  postRestablecerPassword,
  getPersonaFisica,
  putPersonaFisica,
  getEmprendimientoId,
  getPersona,
  getPassword,
  savePassword,
  postEmprendimiento,
  putEmprendimiento,
};
