import apiCallMapDetail from "../Propiedades/apiMapDetalle.js";

const url = window.location.search; 
const value = url.match(/\d+/)[0];

apiCallMapDetail(value, 1, 1);
