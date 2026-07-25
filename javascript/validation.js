const form = document.getElementById('form');
const firstname_input = document.getElementById('first-name-input');
const lastname_input = document.getElementById('last-name-input');
const email_input = document.getElementById('email-input');
const psw_input = document.getElementById('password-input');
const repeat_psw_input = document.getElementById('repeat-password-input');
const error_msg = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
    let errors = [];

    if(firstname_input) {
        errors = getSignupFormErrors(firstname_input.value, lastname_input.value, email_input.value, psw_input.value, repeat_psw_input.value);
    } else {
        errors = getLoginFormErrors(email_input.value, psw_input.value);
    }

    if (errors.length > 0) {
        event.preventDefault();
        error_msg.innerText = errors.join('. ');
    }
})

function getSignupFormErrors(firstname, lastname, email, password, repeatpassword) {
    let errors = []; 
    // classList.add('incorrect') addes the class 'incorrect' to the parent element
    // needs to pair it with css to make it shows red border
    // currently not working
    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if (lastname === '' || lastname == null) {
        errors.push('Lastname is required');
        lastname_input.parentElement.classList.add('incorrect');
    }
    if (email === '' || email == null) {
        errors.push('Email is required');
       email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        psw_input.parentElement.classList.add('incorrect');
    }

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters.');
        psw_input.parentElement.classList.add('incorrect');
    }
    if (repeatpassword === '' || repeatpassword == null) {
        errors.push('Please confirm your password');
        repeat_psw_input.parentElement.classList.add('incorrect');
    }
    
    if (password !== repeatpassword && password !== '' && repeatpassword !== '') {
        errors.push('Passwords do not match');
        psw_input.parentElement.classList.add('incorrect');
        repeat_psw_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];
    if (email === '' || email == null) {
        errors.push('Email is required');
       email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        psw_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

const allInputs = [firstname_input, lastname_input, email_input, psw_input, repeat_psw_input].filter(input => input != null);

// supposed to be used to remove red border when the input are correct, not working at the moment
allInputs.forEach(input => {
    if (input) { 
        input.addEventListener('input', () => {
            if(input.parentElement.classList.contains('incorrect')) { 
                input.parentElement.classList.remove('incorrect');
                error_msg.innerText = '';
            }
        });
    }
});