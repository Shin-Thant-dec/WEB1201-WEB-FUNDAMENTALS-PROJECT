const track = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
const prevBtn = document.getElementById('previousButton');
const nextBtn = document.getElementById('nextButton');
 
let current = 0;
 
// build dots dynamically based on number of slides
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide_dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});
 
const dots = document.querySelectorAll('.slide_dot');
 
function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}
 
prevBtn.addEventListener('click', () => goToSlide(current - 1));
nextBtn.addEventListener('click', () => goToSlide(current + 1));
 
// auto-advance every 6 seconds, pausing while the user hovers
let autoplay = setInterval(() => goToSlide(current + 1), 6000);
 
const slideshowEl = document.querySelector('.slideshow');
slideshowEl.addEventListener('mouseenter', () => clearInterval(autoplay));
slideshowEl.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide(current + 1), 6000);
});
