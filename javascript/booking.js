
document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.form_step'));
    const trailSteps = Array.from(document.querySelectorAll('.trail_step'));
    const trailFill = document.querySelector('.trail_fill');
    const progressTrail = document.querySelector('.progress_trail');
    const form = document.querySelector('.booking_container form');
    const formSuccess = document.querySelector('.form_success');

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const ownerEmail = document.getElementById('ownerEmail');
    const ownerPassword = document.getElementById('ownerPassword');
    const petName = document.getElementById('petName');
    const petType = document.getElementById('petType');
    const serviceChoice = document.getElementById('serviceChoice');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');

    const step1Error = document.getElementById('step1Error');
    const step2Error = document.getElementById('step2Error');
    const step3Error = document.getElementById('step3Error');

    const DEMO_ACCOUNT = {
        firstname: 'Demo',
        lastname: 'User',
        email: 'pawpawtest@gmail.com',
        password: 'pawpawtest123'
    };
        

    function showStep(index) {
        steps.forEach((step, i) => step.classList.toggle('active', i === index));
        trailSteps.forEach((trail, i) => {
            trail.classList.toggle('active', i === index);
            trail.classList.toggle('done', i < index);
        });
        trailFill.style.width = (index / (trailSteps.length - 1)) * 100 + '%';
    }

    function showErrors(errorEl, errors) {
        errorEl.innerText = errors.join('. ');
    }

    function validateStep1() {
        const errors = [];
        const email = ownerEmail.value.trim();
        const password = ownerPassword.value;

        if (!email) {
            errors.push('Email is required');
        } else if (!EMAIL_REGEX.test(email)) {
            errors.push('Please enter a valid email address');
        } else {
            if (email !== DEMO_ACCOUNT.email) {
                errors.push("We couldn't find an account with that email.");
            } else if (!password) {
                errors.push("Password is required");
            } else if (password !== DEMO_ACCOUNT.password) {
                errors.push("Incorrect password.");
            };
        }

        return errors;
    }

    function validateStep2() {
        const errors = [];
        if (!petName.value.trim()) errors.push("Pet's name is required");
        if (!petType.value) errors.push('Please select a pet type');
        return errors;
    }

    function validateStep3() {
        const errors = [];
        if (!serviceChoice.value) errors.push('Please choose a service');

        if (!appointmentDate.value) {
            errors.push('Please choose a preferred date');
        } else {
            const chosenDate = new Date(appointmentDate.value + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (chosenDate < today) errors.push('Preferred date cannot be in the past');
        }

        if (!appointmentTime.value) errors.push('Please choose a preferred time slot');
        return errors;
    }

    // ---- Step 1: Owner login ----
    document.getElementById('step1Next').addEventListener('click', () => {
        const errors = validateStep1();
        if (errors.length) {
            showErrors(step1Error, errors);
            return;
        } 
        showErrors(step1Error, []);
        showStep(1);
    });

    // ---- Step 2: Pet details ----
    document.getElementById('step2Back').addEventListener('click', () => {
        showErrors(step2Error, []);
        showStep(0);
    });

    document.getElementById('step2Next').addEventListener('click', () => {
        const errors = validateStep2();
        if (errors.length) {
            showErrors(step2Error, errors);
            return;
        }
        showErrors(step2Error, []);
        showStep(2);
    });

    // ---- Step 3: Service & appointment ----
    document.getElementById('step3Back').addEventListener('click', () => {
        showErrors(step3Error, []);
        showStep(1);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const errors = validateStep3();
        if (errors.length) {
            showErrors(step3Error, errors);
            return;
        }
        showErrors(step3Error, []);
        form.style.display = 'none';
        progressTrail.style.display = 'none';
        formSuccess.classList.add('active');
    });

    // Clear the step-1 error as soon as the person edits the fields again.
    [ownerEmail, ownerPassword].forEach(input => {
        input.addEventListener('input', () => showErrors(step1Error, []));
    });

    showStep(0);
});
