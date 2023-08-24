import { AboutInformation } from '../Data/userId.js';

const loadInformation = () => {
    localStorage.removeItem('globalQuery');
    localStorage.removeItem('LimitProp');
    let quienesSomos = document.getElementById('quienesSomos-info');
    if (quienesSomos !== null) {quienesSomos.innerHTML = `${AboutInformation.quienesSomos}`;}

    let servicesData = AboutInformation.services;
    let services = document.getElementById('services-info');
    if (services !== null) {
        services.innerHTML = servicesData.map(data => `
            <div class="col-11 col-md-6 col-lg-11 mb-4 mb-lg-0" data-aos="fade-up"  data-aos-delay="200">
                <div class="service-1">
                    <span class="icon">
                        ${data.icon}
                        <!-- <img src="images/svg/02.svg" alt="Image" class="img-fluid"> -->
                    </span>
                    <div>
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                    </div>
                </div>
            </div>
        `).join("");
    }

    let purposeData = AboutInformation.purpose;
    let purpose = document.getElementById('purpose-info');
    if (purpose !== null) {
        purpose.innerHTML = purposeData.map(data => `
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-12 mb-4 mb-lg-0" data-aos="fade-up"  data-aos-delay="100">
                        <div class="service-1">
                            <span class="icon">
                                ${data.icon}
                                <!-- <img src="images/svg/01.svg" alt="Image" class="img-fluid"> -->
                            </span>
                            <div>
                                <h3>${data.title}</h3>
                                <p>${data.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
    }

}

loadInformation();