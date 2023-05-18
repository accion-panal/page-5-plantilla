import apiDetalleCall from "./Propiedades/apiDetalle.js";

const url = window.location.search; 
const value = url.match(/\d+/)[0];

apiDetalleCall(value, 1, 1);
