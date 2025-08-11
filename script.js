// Tour Data
const tourStops = [
    {
        title: "University Library",
        description: "Our state-of-the-art library features over 500,000 books, digital resources, study spaces, and research facilities. Open 24/7 during exam periods.",
        images: [
            "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Library+Main",
            "https://via.placeholder.com/600x400/c0392b/ffffff?text=Library+Reading+Room",
            "https://via.placeholder.com/600x400/e67e22/ffffff?text=Library+Study+Area"
        ],
        thumbnails: [
            "https://via.placeholder.com/100x75/e74c3c/ffffff?text=Lib1",
            "https://via.placeholder.com/100x75/c0392b/ffffff?text=Lib2",
            "https://via.placeholder.com/100x75/e67e22/ffffff?text=Lib3"
        ],
        audioFile: "#", // Placeholder for audio file
        audioTitle: "Library Tour Narration",
        facts: [
            "Hours: 24/7 during exams, 6 AM - 2 AM regular semester",
            "Floors: 5 levels of study and research space",
            "Special Features: Silent study areas, group collaboration rooms",
            "Collection: Over 500,000 books and digital resources"
        ],
        coordinates: [40.7128, -74.0060] // Example coordinates (NYC)
    },
    {
        title: "Student Center",
        description: "The heart of campus life featuring dining options, student services, meeting rooms, and recreational facilities. A hub for social and academic activities.",
        images: [
            "https://via.placeholder.com/600x400/3498db/ffffff?text=Student+Center+Main",
            "https://via.placeholder.com/600x400/2980b9/ffffff?text=Student+Center+Dining",
            "https://via.placeholder.com/600x400/5dade2/ffffff?text=Student+Center+Lounge"
        ],
        thumbnails: [
            "https://via.placeholder.com/100x75/3498db/ffffff?text=SC1",
            "https://via.placeholder.com/100x75/2980b9/ffffff?text=SC2",
            "https://via.placeholder.com/100x75/5dade2/ffffff?text=SC3"
        ],
        audioFile: "#",
        audioTitle: "Student Center Tour Narration",
        facts: [
            "Hours: 7 AM - 11 PM daily",
            "Dining: 8 different restaurants and cafes",
            "Services: Bookstore, post office, student government",
            "Recreation: Game room, TV lounge, study areas"
        ],
        coordinates: [40.7130, -74.0055]
    },
    {
        title: "Science Building",
        description: "Modern laboratories and classrooms equipped with cutting-edge technology for biology, chemistry, physics, and engineering programs.",
        images: [
            "https://via.placeholder.com/600x400/2ecc71/ffffff?text=Science+Building+Exterior",
            "https://via.placeholder.com/600x400/27ae60/ffffff?text=Science+Lab",
            "https://via.placeholder.com/600x400/58d68d/ffffff?text=Science+Classroom"
        ],
        thumbnails: [
            "https://via.placeholder.com/100x75/2ecc71/ffffff?text=Sci1",
            "https://via.placeholder.com/100x75/27ae60/ffffff?text=Sci2",
            "https://via.placeholder.com/100x75/58d68d/ffffff?text=Sci3"
        ],
        audioFile: "#",
        audioTitle: "Science Building Tour Narration",
        facts: [
            "Labs: 25 specialized research and teaching laboratories",
            "Equipment: State-of-the-art scientific instruments",
            "Programs: Biology, Chemistry, Physics, Engineering",
            "Research: Active undergraduate research opportunities"
        ],
        coordinates: [40.7125, -74.0065]
    },
    {
        title: "Athletics Center",
        description: "Complete fitness and sports facility including gymnasium, swimming pool, fitness center, and outdoor fields for all athletic programs.",
        images: [
            "https://via.placeholder.com/600x400/f39c12/ffffff?text=Athletics+Center+Gym",
            "https://via.placeholder.com/600x400/e67e22/ffffff?text=Athletics+Pool",
            "https://via.placeholder.com/600x400/f1c40f/ffffff?text=Athletics+Field"
        ],
        thumbnails: [
            "https://via.placeholder.com/100x75/f39c12/ffffff?text=Ath1",
            "https://via.placeholder.com/100x75/e67e22/ffffff?text=Ath2",
            "https://via.placeholder.com/100x75/f1c40f/ffffff?text=Ath3"
        ],
        audioFile: "#",
        audioTitle: "Athletics Center Tour Narration",
        facts: [
            "Facilities: Gymnasium, pool, fitness center, outdoor fields",
            "Hours: 6 AM - 11 PM for students",
            "Sports: 15 varsity teams and intramural programs",
            "Fitness: Modern equipment and group fitness classes"
        ],
        coordinates: [40.7135, -74.0050]
    },
    {
        title: "Dormitories",
        description: "Modern residential halls providing comfortable living spaces with study areas, common rooms, and 24/7 security for a safe campus living experience.",
        images: [
            "https://via.placeholder.com/600x400/9b59b6/ffffff?text=Dormitory+Exterior",
            "https://via.placeholder.com/600x400/8e44ad/ffffff?text=Dormitory+Room",
            "https://via.placeholder.com/600x400/bb8fce/ffffff?text=Dormitory+Common+Area"
        ],
        thumbnails: [
            "https://via.placeholder.com/100x75/9b59b6/ffffff?text=Dorm1",
            "https://via.placeholder.com/100x75/8e44ad/ffffff?text=Dorm2",
            "https://via.placeholder.com/100x75/bb8fce/ffffff?text=Dorm3"
        ],
        audioFile: "#",
        audioTitle: "Dormitories Tour Narration",
        facts: [
            "Capacity: Housing for 2,500 students",
            "Types: Single, double, and suite-style rooms",
            "Amenities: Study lounges, kitchens, laundry facilities",
            "Security: 24/7 front desk and keycard access"
        ],
        coordinates: [40.7120, -74.0070]
    }
];

// Current tour state
let currentStop = 0;
let map = null;
let markers = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTour();
    initializeMap();
    setupEventListeners();
});

// Initialize tour with first stop
function initializeTour() {
    loadTourStop(0);
    updateNavigationButtons();
}

// Setup event listeners
function setupEventListeners() {
    // Stop selector buttons
    const stopButtons = document.querySelectorAll('.stop-btn');
    stopButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            goToStop(index);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Thumbnail click handlers will be set when loading tour stops
}

// Start tour function (called by CTA button)
function startTour() {
    document.querySelector('#tour').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Load specific tour stop
function loadTourStop(stopIndex) {
    if (stopIndex < 0 || stopIndex >= tourStops.length) return;
    
    const stop = tourStops[stopIndex];
    currentStop = stopIndex;
    
    // Update main content
    document.getElementById('stop-title').textContent = stop.title;
    document.getElementById('stop-description').textContent = stop.description;
    document.getElementById('main-tour-image').src = stop.images[0];
    document.getElementById('main-tour-image').alt = stop.title;
    
    // Update audio
    const audioElement = document.getElementById('tour-audio');
    audioElement.src = stop.audioFile;
    document.getElementById('audio-title').textContent = stop.audioTitle;
    
    // Update quick facts
    const factsList = document.getElementById('quick-facts');
    factsList.innerHTML = '';
    stop.facts.forEach(fact => {
        const li = document.createElement('li');
        li.textContent = fact;
        factsList.appendChild(li);
    });
    
    // Update thumbnails
    updateThumbnails(stop);
    
    // Update stop selector buttons
    updateStopButtons();
    
    // Update navigation
    updateNavigationButtons();
    
    // Update stop indicator
    document.getElementById('current-stop').textContent = stopIndex + 1;
    document.getElementById('total-stops').textContent = tourStops.length;
    
    // Highlight location on map
    if (map && markers.length > 0) {
        highlightMapMarker(stopIndex);
    }
}

// Update thumbnail gallery
function updateThumbnails(stop) {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    thumbnailGallery.innerHTML = '';
    
    stop.thumbnails.forEach((thumb, index) => {
        const img = document.createElement('img');
        img.className = 'thumbnail' + (index === 0 ? ' active' : '');
        img.src = thumb;
        img.alt = `${stop.title} ${index + 1}`;
        img.onclick = () => changeImage(stop.images[index], img);
        thumbnailGallery.appendChild(img);
    });
}

// Change main image
function changeImage(imageSrc, thumbnailElement) {
    document.getElementById('main-tour-image').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

// Update stop selector buttons
function updateStopButtons() {
    const stopButtons = document.querySelectorAll('.stop-btn');
    stopButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === currentStop);
    });
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentStop === 0;
    nextBtn.disabled = currentStop === tourStops.length - 1;
}

// Navigation functions
function previousStop() {
    if (currentStop > 0) {
        goToStop(currentStop - 1);
    }
}

function nextStop() {
    if (currentStop < tourStops.length - 1) {
        goToStop(currentStop + 1);
    }
}

function goToStop(stopIndex) {
    loadTourStop(stopIndex);
    
    // Smooth scroll to tour section if not already visible
    const tourSection = document.querySelector('#tour');
    const rect = tourSection.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        tourSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize interactive map
function initializeMap() {
    // Use a default center point (can be customized to your campus location)
    const campusCenter = [40.7128, -74.0060];
    
    map = L.map('campus-map').setView(campusCenter, 16);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for each tour stop
    const markerColors = ['red', 'blue', 'green', 'orange', 'purple'];
    
    tourStops.forEach((stop, index) => {
        const marker = L.marker(stop.coordinates)
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h4>${stop.title}</h4>
                    <p>${stop.description.substring(0, 100)}...</p>
                    <button onclick="goToStop(${index})" class="popup-btn">View Tour Stop</button>
                </div>
            `);
        
        markers.push(marker);
        
        // Add click event to marker
        marker.on('click', function() {
            goToStop(index);
        });
    });
}

// Highlight specific marker on map
function highlightMapMarker(stopIndex) {
    if (!map || !markers[stopIndex]) return;
    
    // Center map on the marker
    map.setView(markers[stopIndex].getLatLng(), 17);
    
    // Open popup
    markers[stopIndex].openPopup();
}

// Utility function to handle responsive navigation
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add some animation effects
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousStop();
    } else if (e.key === 'ArrowRight') {
        nextStop();
    }
});

// Audio control enhancements
function setupAudioControls() {
    const audioElement = document.getElementById('tour-audio');
    
    audioElement.addEventListener('loadedmetadata', function() {
        console.log('Audio loaded for: ' + document.getElementById('audio-title').textContent);
    });
    
    audioElement.addEventListener('error', function() {
        console.log('Audio file not available for this tour stop');
        // You could show a message to the user here
    });
}

// Call audio setup when DOM is ready
document.addEventListener('DOMContentLoaded', setupAudioControls);

// Export functions for global access (if needed)
window.startTour = startTour;
window.changeImage = changeImage;
window.previousStop = previousStop;
window.nextStop = nextStop;
window.goToStop = goToStop;