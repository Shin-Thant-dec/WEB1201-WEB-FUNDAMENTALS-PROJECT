const services = [
    {id: 1, name: 'Basic Cat Grooming 🛁', description: 'A gentle essential grooming session designed to keep your cat clean, fresh, and comfortable.', minPrice: 40, maxPrice: 60, category: 'cat'},
    {id: 2, name: 'Full Cat Grooming Package ✂️', description: 'A complete grooming service combining basic care with haircut styling, hygiene trimming, and full coat maintenance', minPrice: 70, maxPrice: 150, category: 'cat'},
    {id: 3, name: 'Premium Cat Grooming Package ✨', description: 'A luxury grooming experience featuring premium products, conditioning treatments, dental care, paw care, and a complimentary accessory.', minPrice: 100, maxPrice: 180, category: 'cat'},
    {id: 4, name: 'Basic Dog Grooming 🛁', description: 'A refreshing grooming service including premium shampoo bath, drying, nail care, paw trimming, face trimming, and fragrance finish.', minPrice: 45, maxPrice: 70, category: 'dog'},
    {id: 5, name: 'Full Dog Grooming Package ✂️', description: 'A complete grooming package with haircut styling, sanitary trimming, brushing, and coat maintenance for a cleaner and healthier look.', minPrice: 80, maxPrice: 180, category: 'dog'},
    {id: 6, name: 'Ear Cleaning 👂', description: 'A spa-level treatment with deep cleansing, conditioning, dental care, paw treatment, and luxury finishing touches.', minPrice: 10, maxPrice: 10, category: 'add-on'},
    {id: 7, name: 'Teeth Brushing 🦷', description: 'Helps reduce plaque buildup, freshens breath, and supports better oral hygiene.', minPrice: 15, maxPrice: 15, category: 'add-on'},
    {id: 8, name: 'Sanitary Trim ✂️', description: 'Carefully trims fur around sanitary areas to keep your pet clean and hygienic.', minPrice: 15, maxPrice: 45, category: 'add-on'},
    {id: 9, name: 'De-Shedding Treatment 🪮', description: 'Removes loose undercoat and excess fur to reduce shedding and keep the coat healthy', minPrice: 30, maxPrice: 50, category: 'add-on'},
    {id: 10, name: 'Flea & Tick Treatment 🫧', description: "Helps eliminate fleas and ticks while keeping your pet's skin clean and comfortable.", minPrice: 30, maxPrice: 50, category: 'add-on'},
    {id: 11, name: 'Coat Conditioning 💆', description: 'Nourishes and moisturizes the coat, leaving it soft, smooth, and shiny.', minPrice: 25, maxPrice: 40, category: 'add-on'}
];


// this search servies by id
const search = document.getElementById('search');
const categoryFilter = document.getElementById('category');
const container = document.getElementById('catalogue_card');

function filterServices() {
    const searchInput = search.value.toLowerCase().trim();
    const category = categoryFilter.value;
    console.log("1. Search Term:", searchInput);        // Debug 1
    console.log("2. Selected Category:", category); 


    // like for loop this filters through services array one by one
    let filteredServices = services.filter(service => {
        const matchSearches = service.name.toLowerCase().includes(searchInput);
        const matchCategory = category === 'all' || service.category === category;

        return matchSearches && matchCategory;
    });

    if (filteredServices.length === 0) {
        container.innerHTML = `<p>No servies found.</p>`;
    } else {
        container.innerHTML = filteredServices.map(service => `
                <div class="card">
                    <span>${service.category}</span>
                    <h4 class="service_title">${service.name}</h4>
                    <p class="service_description">${service.description}</p>
                    <p class="price">From RM${service.minPrice} - RM${service.maxPrice}</p>
                </div>
        `).join('');
    }

    console.log("hello world")
    console.log("totale services", services.length);
    console.log(container)
}

search.addEventListener('input', filterServices);
categoryFilter.addEventListener('change', filterServices);

filterServices();

//initial test version. This might not work if we add another filter.

// // input allows us to get results as user inputs a keywored
// search.addEventListener('input', (event) => {
//     let currentValue = event.target.value.toLowerCase();
//     //searches the services by the title which have h4
//     let services = document.querySelectorAll('h4.service_title');
//     services.forEach(services => {
//         if (services.textContent.toLowerCase().includes(currentValue)) {
//             services.parentNode.style.display = 'block';
//         } else {
//             // this hides the unrelated services
//             services.parentNode.style.display = 'none';
//         }
//     });
// });



// category filter

