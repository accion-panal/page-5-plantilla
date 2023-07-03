import { FooterInformation } from '../Data/userId.js';

const loadInformation = () => {
    let contact = document.getElementById('contact-footer');
    if (contact !== null) {
        contact.innerHTML = `
            <h3>Contáctanos</h3>
            <address>${FooterInformation.address}</address>
            <ul class="list-unstyled links mb-4">
                <li><a href="">${FooterInformation.phone}</a></li>				
                <li><a href="">${FooterInformation.email}</a></li>
            </ul>
        `;
    }

    let socialsData = FooterInformation.socials;
    let socials = document.getElementById('social-footer');
    if (socials !== null) {
        socials.innerHTML = socialsData.map(data => `
            <li><a href="${data.href}">${data.icon}</a></li>
        `).join("");
    }

    

}

loadInformation();