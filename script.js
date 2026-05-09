// --- Real-world simulated data for top destinations ---
const destinationsData = [
    // Japan
    {
        country: "Japan",
        name: "Kyoto",
        type: "Historical",
        description: "The cultural heart of Japan, famous for its classical Buddhist temples, gardens, and traditional wooden houses.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070",
        hotels: "Aman Kyoto, The Ritz-Carlton",
        food: "Kaiseki, Matcha Sweets",
        peakTime: "March to May (Cherry Blossoms)",
        bookingAdvice: "Book flights & hotels 6+ months ahead."
    },
    {
        country: "Japan",
        name: "Mount Fuji",
        type: "Nature",
        description: "Japan's highest mountain, an active volcano, and a globally recognized cultural icon surrounded by lakes.",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070",
        hotels: "Hoshinoya Fuji, Konansou",
        food: "Hoto Noodles, Koshu Beef",
        peakTime: "July to early September",
        bookingAdvice: "Book ryokans 4 months in advance."
    },
    {
        country: "Japan",
        name: "Tokyo",
        type: "Urban",
        description: "A bustling metropolis that seamlessly mixes the ultramodern with the traditional.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994",
        hotels: "Park Hyatt, Mandarin Oriental",
        food: "Sushi, Ramen, Wagyu",
        peakTime: "March-May, Sept-Nov",
        bookingAdvice: "Book central hotels 3 months prior."
    },
    // Italy
    {
        country: "Italy",
        name: "Rome",
        type: "Historical",
        description: "The capital city, featuring nearly 3,000 years of globally influential art, architecture, and culture.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996",
        hotels: "Hotel Eden, Hassler Roma",
        food: "Carbonara, Cacio e Pepe",
        peakTime: "April to June, Sept-Oct",
        bookingAdvice: "Book 4 months ahead for peak seasons."
    },
    {
        country: "Italy",
        name: "Amalfi Coast",
        type: "Nature",
        description: "A 50-kilometer stretch of coastline with sheer cliffs and a rugged shoreline dotted with small beaches.",
        image: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=2070",
        hotels: "Le Sirenuse, Belmond Caruso",
        food: "Fresh Seafood, Limoncello",
        peakTime: "May to September",
        bookingAdvice: "Book villas up to 8 months in advance."
    },
    // France
    {
        country: "France",
        name: "Paris",
        type: "Historical",
        description: "The global center for art, fashion, gastronomy, and culture, known for its cafe culture and landmarks.",
        image: "https://images.unsplash.com/photo-1502602898657-3e9076111102?q=80&w=2074",
        hotels: "Ritz Paris, Le Meurice",
        food: "Croissants, Escargot, Macarons",
        peakTime: "June to August",
        bookingAdvice: "Book 5 months ahead for summer."
    },
    {
        country: "France",
        name: "Chamonix Mont-Blanc",
        type: "Nature",
        description: "A resort area near the junction of France, Switzerland and Italy, renowned for alpine skiing.",
        image: "https://images.unsplash.com/photo-1469796466635-455cede145ad?q=80&w=2070",
        hotels: "Hôtel Mont-Blanc, Les Granges",
        food: "Fondue, Raclette, Tartiflette",
        peakTime: "December to March (Skiing)",
        bookingAdvice: "Book ski lodges 6 months prior."
    }
];

// --- App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const loginScreen = document.getElementById('login-screen');
    const homeScreen = document.getElementById('home-screen');
    const loginForm = document.getElementById('login-form');
    const googleLoginBtn = document.getElementById('google-login');
    const logoutBtn = document.getElementById('logout-btn');
    
    const searchInput = document.getElementById('country-search');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('destinations-grid');
    const noResults = document.getElementById('no-results');
    const resultsTitle = document.getElementById('results-title');

    let currentFilter = 'All';
    let currentSearchQuery = '';

    // --- Authentication Flow ---
    
    const handleLogin = (e) => {
        if (e) e.preventDefault();
        // Simulate login transition
        loginScreen.classList.remove('active');
        setTimeout(() => {
            homeScreen.classList.add('active');
            renderDestinations(); // Render initial trending places
        }, 300);
    };

    const handleLogout = () => {
        homeScreen.classList.remove('active');
        setTimeout(() => {
            loginScreen.classList.add('active');
            // Reset search state
            searchInput.value = '';
            currentSearchQuery = '';
            currentFilter = 'All';
            updateFilterUI();
        }, 300);
    };

    loginForm.addEventListener('submit', handleLogin);
    googleLoginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // --- Search & Filter Logic ---

    const renderDestinations = () => {
        // Clear grid
        grid.innerHTML = '';
        
        // Filter data based on search and category
        const filteredData = destinationsData.filter(dest => {
            const matchesSearch = currentSearchQuery === '' || dest.country.toLowerCase().includes(currentSearchQuery);
            const matchesFilter = currentFilter === 'All' || dest.type === currentFilter;
            return matchesSearch && matchesFilter;
        });

        // Update Title
        if (currentSearchQuery) {
            resultsTitle.textContent = `Results in ${currentSearchQuery.charAt(0).toUpperCase() + currentSearchQuery.slice(1)}`;
        } else {
            resultsTitle.textContent = currentFilter === 'All' ? 'Trending Globally' : `${currentFilter} Destinations`;
        }

        // Show/Hide No Results
        if (filteredData.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            
            // Generate HTML for each card
            filteredData.forEach(dest => {
                const card = document.createElement('article');
                card.className = 'destination-card';
                card.innerHTML = `
                    <div class="card-img-wrapper">
                        <img src="${dest.image}" alt="${dest.name}">
                        <span class="card-tag">${dest.type}</span>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3>${dest.name}</h3>
                            <span class="card-location"><i class="fa-solid fa-location-dot"></i> ${dest.country}</span>
                        </div>
                        <p class="card-desc">${dest.description}</p>
                        
                        <div class="insights-grid">
                            <div class="insight-item">
                                <i class="fa-solid fa-bed"></i>
                                <div class="insight-text">
                                    <h4>Top Hotels</h4>
                                    <p>${dest.hotels}</p>
                                </div>
                            </div>
                            <div class="insight-item">
                                <i class="fa-solid fa-utensils"></i>
                                <div class="insight-text">
                                    <h4>Must Try Food</h4>
                                    <p>${dest.food}</p>
                                </div>
                            </div>
                            <div class="insight-item">
                                <i class="fa-solid fa-calendar-check"></i>
                                <div class="insight-text">
                                    <h4>Peak Season</h4>
                                    <p>${dest.peakTime}</p>
                                </div>
                            </div>
                            <div class="insight-item">
                                <i class="fa-solid fa-plane-departure"></i>
                                <div class="insight-text">
                                    <h4>Booking Advice</h4>
                                    <p>${dest.bookingAdvice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
    };

    const handleSearch = () => {
        currentSearchQuery = searchInput.value.toLowerCase().trim();
        renderDestinations();
        // Scroll down to results slightly
        document.querySelector('.filters-section').scrollIntoView({ behavior: 'smooth' });
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Category Filters
    const updateFilterUI = () => {
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === currentFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            updateFilterUI();
            renderDestinations();
        });
    });

});
