import { getPropertiesForId } from "../services/PropertiesServices.js";
// import { clpToUf } from "../utils/getExchangeRate.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf, validationUF,validationCLP, ufToClp } from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id,statusId, companyId) {
	let {data} = await getPropertiesForId(id, statusId, companyId);
	console.log(data)

	const response = await ExchangeRateServices.getExchangeRateUF();
	const ufValue = response?.UFs[0]?.Valor
	const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

	//! transformar valor del uf a int
	const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
	const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);
	//!--

	let updatedImages = data.images.map(function (image) {
		return image.replace(/\\/g, "//");
	});

	document.getElementById('detail-prop').innerHTML =
    `<div class="section" style="padding-top: 1rem;padding-bottom: 0rem;">
		<div class="container">
			<div class="row mb-2">
				<div class="col-sm-12 col-lg-8 mb-3">
					<h1><b>${data.title}</b></h1>
					<span>Cod: ${data.id}</span><br>
					<span><i class='bx bx-map'></i> ${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</span>
				</div>
				<div class="col-sm-12 col-lg-4 container-divisas">
					<div class="uf-clp-divisas">
						<h1 id="valueUf"><b>UF ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</b></h1>
						<span style="font-size: 29px;">${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price): parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</span><br>
					</div>
				</div>
			</div>
			<div class="section removePadding" style="padding-top:2rem; padding-bottom:2rem">
				<div class="container removePadding" >
					<div class="row">
						<div class="col removePadding">											
							<section class="splide" aria-label="Splide Basic HTML Example">
								<div class="splide__track">
									<ul class="splide__list" id="carrucel-img">
									</ul>
								</div>
							</section>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	//! Imagenes en splide */
	let img = '';
	updatedImages.forEach((image, index) => {
		img += `
			<li class="splide__slide ${index === 0 ? 'active' : ''}">
				<img src="${image || 'img/Sin.png'}" style="height: 600px; width: 100%;" />
			</li>
		`;
	});
	document.getElementById('carrucel-img').innerHTML = img;

	let splide = new Splide('.splide', {
		type: 'fade',
		padding: '5rem',
		rewind: true,
		autoplay: 'play',
		breakpoints: {
			1399: {
				padding: '0rem',
			}
		  }
	});

	splide.mount();

	document.getElementById('descrip-prop').innerHTML= `
				<div class="col-md-12 blog-content ">
					<p class="lead">DESCRIPCIÓN</p>
					<p>${data?.description || "No cuenta con descripción"}</p>
				</div>`

	document.getElementById('caract-prop').innerHTML = `
					<p class="lead">REQUISITOS</p>
					<p>-Acreditar renta 3 veces al valor arriendo</p>
					<p>-Contrato de trabajo vigente</p>
					<p>-Informe Dicom Platinium</p>
					<div class="sidebar-box" style="padding: 0px;">
						<div class="categories">
							<p class="lead">DETALLES DE LA PROPIEDAD</p>
							<li><a>País: <span>Chile</span></a></li>
							<li><a>Región: <span>${data?.region || "Sin registro de region"}</span></a></li>
							<li><a>Ciudad: <span>${data?.city || "Sin registro de ciudad"}</span></a></li>
							<li><a>Código: <span>${data?.id}</span></a></li>
							<li><a>Estado: <span>${data?.installment_type || "No registra"}</span></a></li>
							<li><a>Superficie construida: <span>${data?.surface_m2 || "0"}</span></a></li>
							<li><a>Superficie Terreno: <span>${data?.surface_m2 || "0"}</span></a></li>
							<li><a>Superficie Privada: <span>${data?.surface_m2 || "0"}</span></a></li>
							<li><a>Baños: <span>${data?.bathrooms || "0"}</span></a></li>
							<li><a>Estacionamiento: <span>${data?.coveredParkingLots || "0"}</span></a></li>
							<li><a>Piso: <span>2</span></a></li>
							<li><a>Tipo de propiedad:<span>${data?.types || "No registra"}</span></a></li>
							<li><a>Tipo de operación: <span>${data?.operation || "No registra"}</span></a></li>
						</div>
					</div>`

	document.getElementById('data-realtor').innerHTML= `
		<img src="${data?.realtor.img || "images/Sin.png"}" class="img-fluid imgCorredor mb-3">
		<h3 class="text-black">${data.realtor.name} ${data.realtor.lastName}</h3>
		<p>${data?.realtor.mail || "No registra email"}</p>
		<p>+569 9 41198136</p>
		<div class="">
			<input type="button" value="Contactar por whatsapp" class="btn btn-primary btn-md text-white">
		</div>
	`
				
	document.getElementById('container-map').innerHTML = `
	<div class="section" style="padding-top:0rem; padding-bottom: 1rem;">
		<div class="container">
			<div class="row">
				<h1><b>UBICACIÓN DE LA PROPIEDAD</b></h1>
				<p><i class='bx bx-map'></i> ${data.city || "No registra dirección"}, ${data.region || "No registra Región"}, Chile</p>
			</div>	
		</div>
	</div>`
}

	

