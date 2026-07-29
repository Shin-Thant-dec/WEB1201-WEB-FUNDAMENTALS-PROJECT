/*this js file is used let user write review -> submit -> then the data will be stored into local storage -> then rendered on the web page*/
// this is private function
(function () {
    'use strict';

    //By declaring a varicle as a key to access the local storage
    const STORAGE_KEY = 'pawpaw-reviews';

    const SEED_REVIEWS = [
        { name: 'Taylor Swift', rating: 5, text: 'Our labrador came home looking (and smelling) brand new. The team was so patient with him!', date: '2026-04-02' },
        { name: 'Mr Potato', rating: 4, text: 'Great senior spa service - very gentle with my old cat who normally hates baths.', date: '2026-04-18' },
        { name: 'Kang Haerin', rating: 5, text: 'Booked online in minutes and the groomer nailed the exact trim I asked for.', date: '2026-05-01' }
    ];

    //find the list and form element across the html web and store them into variable
    const list = document.querySelector('[data-review-list]');
    const form = document.querySelector('[data-review-form]');

    //this syntax used to indicate that if either list or form doesn't exit, then it will end the js program
    if (!list || !form) {
        return;
    }

    const starPicker = form.querySelector('[data-star-picker]');
    const ratingInput = form.querySelector('[name="reviewRating"]');
    const stars = starPicker.querySelectorAll('button');
    let currentRating = 0;

    //this function is used to read the data from local storage
    function loadReviews() {
        //load the data from the local storage
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) { 
        return SEED_REVIEWS.slice();
        }
        try {
            return JSON.parse(raw);
        } catch (error) {
            return SEED_REVIEWS.slice();
        }
    }

    //sava the reviews into locat storage
    function saveReviews(reviews) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }

    //use for loop to load the star and distinguish them into solid star and hollow star
    function starString(rating) {
        let result = '';
        for (let i = 1; i <= 5; i = i + 1) {
            if (i <= rating) {
                result = result + '\u2605'; //the \u2605 is solid star
            } else {
                result = result + '\u2606'; //the \u2606 is hollow star
            }
        }
        return result;
    }

    // this function is only used for security meaure.
    // this converts the script into text so that code cannot be seen by outsiders when executed
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    //display the reviews into div and render them, they will be look like a card, i style it in reviews.css file
    function render(reviews) {
        list.innerHTML = '';    //overwrite the list to become a empty space

        for (let i = reviews.length - 1; i >= 0; i = i - 1) {
            const review = reviews[i];
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML =

            // write inside the element iwth 'card' this will generate html code in the following format.
                '<p class="stars" aria-label="' + review.rating + ' out of 5 stars">' + starString(review.rating) + '</p>' +
                '<p>' + escapeHtml(review.text) + '</p>' +
                '<span class="review-meta">' + escapeHtml(review.name) + ' | ' + review.date + '</span>';
            list.appendChild(card);
        }
    }

    //this function is used to update the star color/appearance when user click on star
    function setRating(value) {
        currentRating = value;
        ratingInput.value = value;
        for (let i = 0; i < stars.length; i = i + 1) {
            const star = stars[i];
            if (i < value) {
                // check whether the star is 
                star.classList.add('filled');
                star.setAttribute('aria-checked', 'true');
            } else {
                star.classList.remove('filled');
                star.setAttribute('aria-checked', 'false');
            }
        }
    }

    function attachStarEvents() {
        for (let i = 0; i < stars.length; i = i + 1) {
        (function (index) {
            stars[index].addEventListener('click', function () {
            setRating(index + 1);
            });
            stars[index].addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setRating(Math.min(currentRating + 1, 5));
                stars[currentRating - 1].focus();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setRating(Math.max(currentRating - 1, 1));
                stars[currentRating - 1].focus();
            }
            });
        })(i);
        }
    }

    attachStarEvents();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameField = form.querySelector('[name="clientName"]');
        const errorEl = form.querySelector('[data-review-error]');
        const textField = form.querySelector('[name="reviewText"]');
        let reviews;

        if (currentRating === 0 || nameField.value.trim() === '') {
            errorEl.textContent = 'Please add your name and a star rating';
            errorEl.classList.remove('hidden');
            return;
        }
        errorEl.classList.add('hidden');

        reviews = loadReviews();
        reviews.push({
            name: nameField.value.trim(),
            rating: currentRating,
            text: textField.value.trim(),
            date: new Date().toISOString().slice(0, 10)
        });
        saveReviews(reviews);
        render(reviews);

        form.reset();
        setRating(0);
    });

    // Character count for the review textarea.
    const textArea = form.querySelector('[name="reviewText"]');
    const counter = form.querySelector('[data-char-count]');
    if (textArea && counter) {
        textArea.addEventListener('input', function () {
        counter.textContent = textArea.value.length + ' characters';
        });
    }

    render(loadReviews());
})();
