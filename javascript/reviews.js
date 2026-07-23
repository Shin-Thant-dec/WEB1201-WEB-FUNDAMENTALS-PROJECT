/*this js file is used let user write review -> submit -> then the data will be stored into local storage -> then rendered on the web page*/
(function () {
    'use strict';

    //By declaring a varicle as a key to access the local storage
    var STORAGE_KEY = 'pawpaw-reviews';

    var SEED_REVIEWS = [
        { name: 'Amelia R.', rating: 5, text: 'Our labrador came home looking (and smelling) brand new. The team was so patient with him!', date: '2026-04-02' },
        { name: 'Devan K.', rating: 4, text: 'Great senior spa service - very gentle with my old cat who normally hates baths.', date: '2026-04-18' },
        { name: 'Priya S.', rating: 5, text: 'Booked online in minutes and the groomer nailed the exact trim I asked for.', date: '2026-05-01' }
    ];

    //find the list and form element across the html web and store them into variable
    var list = document.querySelector('[data-review-list]');
    var form = document.querySelector('[data-review-form]');

    //this syntax used to indicate that if either list or form doesn't exit, then it will end the js program
    if (!list || !form) {
        return;
    }

    var starPicker = form.querySelector('[data-star-picker]');
    var ratingInput = form.querySelector('[name="reviewRating"]');
    var stars = starPicker.querySelectorAll('button');
    var currentRating = 0;

    //this function is used to read the data from local storage
    function loadReviews() {
        //load the data from the local storage
        var raw = localStorage.getItem(STORAGE_KEY);
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
        var result = '';
        var i;
        for (i = 1; i <= 5; i = i + 1) {
            if (i <= rating) {
                result = result + '\u2605'; //the \u2605 is solid star
            } else {
                result = result + '\u2606'; //the \u2606 is hollow star
            }
        }
        return result;
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    //display the reviews into div and render them, they will be look like a card, i style it in reviews.css file
    function render(reviews) {
        var i, review, card;
        list.innerHTML = '';    //overwrite the list to become a empty space

        for (i = reviews.length - 1; i >= 0; i = i - 1) {
            review = reviews[i];
            card = document.createElement('div');
            card.className = 'card';
            card.innerHTML =
                '<p class="stars" aria-label="' + review.rating + ' out of 5 stars">' + starString(review.rating) + '</p>' +
                '<p>' + escapeHtml(review.text) + '</p>' +
                '<span class="review-meta">' + escapeHtml(review.name) + ' | ' + review.date + '</span>';
            list.appendChild(card);
        }
    }

    //this function is used to update the star color/appearance when user click on star
    function setRating(value) {
        var i, star;
        currentRating = value;
        ratingInput.value = value;
        for (i = 0; i < stars.length; i = i + 1) {
            star = stars[i];
            if (i < value) {
                star.classList.add('filled');
                star.setAttribute('aria-checked', 'true');
            } else {
                star.classList.remove('filled');
                star.setAttribute('aria-checked', 'false');
            }
        }
    }

    function attachStarEvents() {
        var i;
        for (i = 0; i < stars.length; i = i + 1) {
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

        var nameField = form.querySelector('[name="clientName"]');
        var errorEl = form.querySelector('[data-review-error]');
        var texttextField = form.querySelector('[name="reviewText"]');
        var reviews;

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
    var textArea = form.querySelector('[name="reviewText"]');
    var counter = form.querySelector('[data-char-count]');
    if (textArea && counter) {
        textArea.addEventListener('input', function () {
        counter.textContent = textArea.value.length + ' characters';
        });
    }

    render(loadReviews());
})();
