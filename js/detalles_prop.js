import apiDetalleCall from "./Propiedades/apiDetalle.js";
import apiCallMapDetail from "./Propiedades/apiMapDetalle.js";
import { PropertyData } from "../js/Data/userId.js";

const { CodigoUsuarioMaestro, companyId } = PropertyData;

const url = window.location.search; 
const value = url.match(/\d+/)[0];

apiDetalleCall(value, 1, companyId);
apiCallMapDetail(value, 1, companyId);