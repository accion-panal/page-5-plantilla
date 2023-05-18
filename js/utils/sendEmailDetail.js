const formEmailRealtor = document.getElementById("form-realtor");

formEmailRealtor.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('asunto');
let message = document.getElementById('message');   
 
 fetch("https://formsubmit.co/ajax/fabian.salas.astete@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: firstName.value,
      Correo: email.value,
      Telefono : phone.value,
      Sujeto: subject.value,
      Mensaje: message.value,
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error al enviar correo',error));

})