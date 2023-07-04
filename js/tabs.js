const button = document.getElementById('pills-contact-tab');
const div = document.getElementById('pills-contact');


if (div.classList.contains('initialMap')) {
    button.addEventListener('click', function() {
        div.classList.remove('initialMap');
    });
}
