import { ContactInformation } from '../Data/userId.js';

const loadInformation = () => {
    let email = document.getElementById('email-info');
    if (email !== null) {
        email.innerHTML = `
            <i class="icon-envelope"></i>
            <h4 class="mb-2">E-mail:</h4>
            <p>${ContactInformation.email}</p>
        `;
    }

    let phone = document.getElementById('phone-info');
    if (phone !== null) {
        phone.innerHTML = `
            <i class="icon-phone"></i>
            <h4 class="mb-2">Llamar:</h4>
            <p>${ContactInformation.phone}</p>
        `;
    }

    let horarioData = ContactInformation.horario;
    let horario = document.getElementById('horario-info');
    if (horario !== null) {
        horario.innerHTML = horarioData.map(data => `
            <p>
            <b>${data.days}</b> <br>
            ${data.hour}
            </p>
            <br>
        `).join("");
    }

    let ubicacion = document.getElementById('ubicacion-info');
    if (ubicacion !== null) {
        ubicacion.innerHTML = `
            <i class="icon-room"></i>
            <h4 class="mb-2">Ubicación:</h4>
            <p>${ContactInformation.address}</p>
        `;
    }
    

}

loadInformation();