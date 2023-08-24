import { getProperties } from "../services/PropertiesServices.js"
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf, validationUF,validationCLP, ufToClp } from "../utils/getExchangeRate.js"
import { PropertyData, limitDataApi } from "../Data/userId.js";


export default async function apiDestaCall(){
    console.log('%c==================','color:green');
    console.log('%cApi-Destacada Api-Destacada Api-Destacada','color:green');

    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let {data} = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    //! transformar valor del uf a int
    const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
    const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);

    //todo: Modificar url de image
    // Reemplazar "\\" por "//" en la propiedad "image"
    data = data.map(item => { 
        item.image = item.image.replace(/\\/g, "//");
        return item;
    });

    let filtrado = data.filter(data => data.highlighted != null && data.highlighted != false);
    console.log('data Filtrado: ',filtrado)

    document.getElementById('container-props-destacadas').innerHTML = filtrado.map(filtrado => 
        `<li class="splide__slide" >	 
            <div class="item" style="padding:1rem">
                <div class="media-entry" style="margin:0 10px 0 0;">
                    <a href="/detalle_propiedad.html?${filtrado.id}&statusId=${1}&companyId=${companyId}">
                        <img src="${filtrado.image != undefined && filtrado.image != null && filtrado.image != "" ? filtrado.image : "images/Sin.png"}" alt="Image" class="img-fluid imgCasas">
                    </a>
                    <div class="bg-white m-body">
                        <span class="date">${filtrado.operation}</span> -
                        <span class="date"><b>UF ${validationUF(filtrado.currency.isoCode) ? filtrado.price : clpToUf(filtrado.price, ufValueAsNumber)}, ${validationCLP(filtrado.currency.isoCode) ? parseToCLPCurrency(filtrado?.price): parseToCLPCurrency(ufToClp(filtrado.price, ufValueAsInt))}</b></span>
                        <h3 class="mt-3"><a href="/detalle_propiedad.html?${filtrado.id}&statusId=${1}&companyId=${companyId}">${filtrado.title}</a></h3>
                        <p>${filtrado.address != undefined && filtrado.address != null && filtrado.address != "" ? filtrado.address : "Sin registro Dirección" }, ${filtrado.commune != undefined && filtrado.commune != null && filtrado.commune != "" ? filtrado.commune : "Sin registro de Comuna "},${filtrado.city != undefined && filtrado.city != null && filtrado.city != "" ? filtrado.city : "Sin registro de Ciudad "}, Chile</p>
                        <p><b>COD:</b> ${filtrado.id}</p>
                        <p><b>Habitacion(es):</b> ${filtrado.bedrooms != undefined && filtrado.bedrooms != null && filtrado.bedrooms != "" ? filtrado.bedrooms : "0"}</p>
                        <p><b>Baños(s):</b> ${filtrado.bathrooms != undefined && filtrado.bathrooms != null && filtrado.bathrooms != "" ? filtrado.bathrooms : "0"}</p>
                        <p><b>Estacionamiento(s):</b> ${filtrado.coveredParkinLost != undefined && filtrado.coveredParkinLost != null && filtrado.coveredParkinLost != "" ? filtrado.coveredParkinLost : "0"}</p>

                        <a href="/detalle_propiedad.html?${filtrado.id}&statusId=${1}&companyId=${companyId}" class="more d-flex align-items-center float-start">
                            <span class="label">Ver Detalle</span>
                            <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                        </a>
                    </div>
                </div>
            </div>
        </li>` 
    ).join('');

    let splide = new Splide(".splide", {
        type: "loop",
        autoplay: "play",
        perPage: 3,
        breakpoints: {
            1399: {
            perPage: 2,
            },
            900: {
            perPage: 1,
            }
        }
    });
    splide.mount();
    console.log('%c==================','color:green');
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});

