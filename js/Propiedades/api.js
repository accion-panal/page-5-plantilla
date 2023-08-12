import { getProperties, getPropertiesForCustomUrl, getRegiones, getCommune} from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

// import { getProps } from "../utils/pagPropiedad.js";
import { PropertyData,limitDataApi } from "../Data/userId.js";
import renderCall from "../Propiedades/render.js";

export default async function apiCall() {
  const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
  let { data } = await getRegiones();

  let response;
  let storedGlobalQuery = localStorage.getItem('globalQuery');
  if (storedGlobalQuery) {
    response = JSON.parse(storedGlobalQuery);
    console.log('api :',response)
  }

  console.log(response);

  if(response != undefined){
      // hacer consulta a la api
      let operation = (response.operationType !== undefined && response.operationType !== null && response.operationType !== '') ? '&operationType=' + response.operationType : '';

      let typeOfProperty = (response.typeOfProperty !== undefined && response.typeOfProperty !== null && response.typeOfProperty !== '') ? '&typeOfProperty=' + response.typeOfProperty : '';
      // let nameRegion = (nameRegion !== undefined && nameRegion !== '') ? '&region=' + nameRegion : '';
      // let commune = (commune !== undefined && commune !== '') ? '&commune=' + commune : '';
      let bedrooms = (response.bedrooms !== undefined && response.bedrooms !== null && response.bedrooms !== '') ? '&bedrooms=' + response.bedrooms : '';
      let bathrooms = (response.bathrooms !== undefined && response.bathrooms !== null && response.bathrooms !== '') ? '&bathrooms=' + response.bathrooms : '';
      let parkingLots = (response.covered_parking_lots !== undefined && response.covered_parking_lots !== null && response.covered_parking_lots !== '') ? '&covered_parking_lots=' + response.covered_parking_lots : '';
      let minPrice = (response.min_price !== undefined && response.min_price !== null && response.min_price !== '') ? '&min_price=' + response.min_price : '';
      let maxPrice = (response.max_price !== undefined && response.max_price !== null && response.max_price !== '') ? '&max_price=' + response.max_price : '';
      let surface_m2 = (response.surface_m2 !== undefined && response.surface_m2 !== null && response.surface_m2 !== '') ? '&surface_m2=' + response.surface_m2 : '';

      let regionData = '';
      let nameRegion = '';
      let commune = '';

      if(response.region !== undefined && response.region !== null && response.region !== ''){
        regionData = data.regions.find(region => region.id == response.region);
        nameRegion = `&region=`+regionData.name;
        if(response.commune !== undefined && response.commune !== null && response.commune !== ''){
          let aux = await getCommune(response.region);
          const communeData = aux.data.find(commune => commune.id == response.commune);
          commune = `&commune=`+communeData.name;
        }
      }
      


      let urlFilters = operation+typeOfProperty+bedrooms+bathrooms+parkingLots+minPrice+maxPrice+nameRegion+commune+surface_m2;
      console.log('urlFilters: ',urlFilters)
      let response2 = await getPropertiesForCustomUrl(1,limitDataApi.limit,CodigoUsuarioMaestro,1,companyId,realtorId,urlFilters);
      localStorage.setItem('globalResponse', JSON.stringify(response2));

  }else{
    localStorage.removeItem('globalResponse');
  }

  renderCall();

  /* const response = await getProperties(0, 1, 1);
  const data = response.data;

  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor
  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));



  document.getElementById("total-prop").innerHTML = `${response.meta.totalItems} Propiedades encontradas </div>`;
    // let filtrado = data.filter(data => data.city != null && data.commune != null);
  

    document.getElementById('container-prop-card').innerHTML = data.map(data => 
      `<div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" id="" data-aos="fade-up" data-aos-delay="100" >
          <div class="media-entry" id="getProperty">
            <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" >
              <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  } " alt="Image" class="img-fluid imgCasas">
            </a>
            <div class="bg-white m-body">
              <span class="date" >${data.operation}</span> -
              <span class="date"><b>UF ${clpToUf(data.price, ufValueAsNumber)} , ${parseToCLPCurrency(data?.price)}</b></span>
              <h3 class="mt-3 textLimitClass"><a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">${data.title}</a></h3>
              <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
              <p><b>Habitacion(es):</b> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}</p>
              <p><b>Baños(s):</b>${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</p>
              <p><b>Estacionamiento(s):</b> ${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
              <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" name="VerDetalle"  class="more d-flex align-items-center float-start">
                <span class="label" id="getProperty">Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
              </a>
            </div>
          </div> 
        </div>`
      ).join('');
    document.getElementById('container-prop-list').innerHTML = data.map(data => 
      `<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div class="media-entry">
            <div class="row">
              <div class="col-4">
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">
                  <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "images/Sin.png"  }" alt="Image" class="img-fluid imgCasasList">
                </a>
              </div>
              <div class="col-8">
                <div class="bg-white m-body">
                  <span class="date">${data.operation}</span>-
                  <span class="date"><b>UF ${clpToUf(data.price, ufValueAsNumber)}, $${data.price} </b></span>
                  <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">${data.title}</a></h3>
                  <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
                  <p><b>Habitacion(es):</b> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0" }</p>
                  <p><b>Baños(s):</b> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</p>
                  <p><b>Estacionamiento(s):</b>${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
    
                  <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" class="more d-flex align-items-center float-start">
                    <span class="label">Ver Detalle</span>
                    <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                  </a>
                </div>
              </div>
            </div>	
          </div>
        </div>`
      ).join(''); */
    
   
}

