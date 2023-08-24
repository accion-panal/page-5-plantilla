const formRealtor = document.getElementById('form-realtor')

formRealtor.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('asunto');
let message = document.getElementById('message');

let respuesta = document.getElementById('respuesta');


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "name": firstName.value,
  "lastName":"",
  "email": email.value,
  "phone": phone.value,
  "subject": subject.value,
  "message": message.value,
  "termsAndConditions": true,
  "action": "vender",
  "meetingDate":""
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact", requestOptions)
  .then(response => response.text())
  .then(result => respuesta.innerHTML = `<div class="alert alert-success" role="alert">
  Formulario enviado exitosamente,Muchas gracias ${firstName.value}!!
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`)
  .catch(error => respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
  Error al enviar formulario, intente nuevamente!!
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`)


})