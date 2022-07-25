const contactForm = document.querySelector('.contact-form');
let fullName = document.getElementById('name');
let email = document.getElementById('email')
let message = document.getElementById('message')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        fullName: fullName.value,
        email: email.value,
        message: message.value
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        if (xhr.responseText == 'success') {
            alert('Email sent');
            fullName.value = '';
            email.value = '';
            message.value = '';
        } else {
            alert('Something went wrong!')
        }
    }
    xhr.send(JSON.stringify(formData));
})