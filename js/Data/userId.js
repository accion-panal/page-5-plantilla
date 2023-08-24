export const PropertyData = {CodigoUsuarioMaestro: 0, companyId: 1, realtorId:0};

/* El limit es para la vista grid/list de propiedades */
/* Debe tener un valor de 3, 6, 9. solamente uno de esos 3*/
/* LimitMap es para el limite de la vista map de propiedades */
export const limitDataApi = { limit:6, limitMap: 99 };


export const RealtorSendEmailData = {
    sendEmail: 'contacto@rukam.cl',  /* SendEmail.js */
    detail: 'fabian.salas.astete@gmail.com',     /* SendEmailDetail.js */
};

export const AboutInformation = {
    quienesSomos: 'Data-Rukam es una empresa creada pensando en los pequeños corredores independientes, la cual su principal virtud es brindarles el servicio integral y asesoramiento a nuestro asociados para así optimizar y mejorar día a día toda su gestión, es por eso que nuestro objetivo principal es apoyar al corredor tanto es su pre-venta como en su post-venta, para que puedan llevar a cabo todos sus objetivos de manera satisfactoria',
    purpose:[
        {
            id:1,
            icon:"<i class='bx bx-target-lock fs-1'></i>",
            title:'Misión',
            desc:'Data-Nuestra misión se basa en elevar la capacidad de consultas y cierre de negocio de nuestros asociados, así como también brindarles una excelente experiencia y post-venta durante su estadía con nuestros servicios.',
        },{
            id:2,
            icon:"<i class='bx bx-show fs-1'></i>",
            title:'Visión',
            desc:'Data-Convertirnos en unos de los mejores servicios de publicación de propiedades a través de un integrador para de esta manera facilitarle un poco el trabajo día a día a nuestros asociados y asi también ayudarlos a que lleguen a más personas para posterior a eso capitalicen sus propiedades.',
        },
    ],
    services:[
        {
            id: 1,
            icon: "<i class='bx bx-folder-plus fs-2'></i>",
            title: 'Pública con nosotros.',
            desc: 'Más de 25 portales inmobiliarios, en nuestra página web, en redes de colaboración de finca raíz, Instagram, y Facebook. Además de hacer campañas promocionales para destacar tu inmueble'
        },
    ],
}

export const ContactInformation = {
    address: 'Data-Apoquindo 7935 Of. 410-b',
    phone:'+569 9130 4511',
    email:'contacto@rukam.cl / dsalinas@rukam.cl',
    horario:[
        {
            id:1,
            days:'Lunes a Viernes',
            hour: '8:30 AM - 18:00 PM'
        },
    ]
}

export const FooterInformation = {
    address: 'Data-Apoquindo 7935 Of. 410-b',
    phone:'+569 9130 4511',
    email:'contacto@rukam.cl / dsalinas@rukam.cl',
    socials:[
        {
            id: 1,
            href:'#',
            icon:'<span class="icon-instagram"></span>'
        },{
            id: 2,
            href:'#',
            icon:'<span class="icon-twitter"></span>'
        },{
            id: 3,
            href:'#',
            icon:'<span class="icon-facebook"></span>'
        },{
            id: 4,
            href:'#',
            icon:'<span class="icon-linkedin"></span>'
        },
    ]
}
