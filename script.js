// Tour Data
const tourStops = [
  {
    title: "University Library",
    description:
      "Our state-of-the-art library features over 500,000 books, digital resources, study spaces, and research facilities. Open 24/7 during exam periods.",
    images: ["/Images/lib2.jpg", "/Images/lib3.jpg", "/Images/lib4.webp"],
    thumbnails: ["/Images/lib2.jpg", "/Images/lib3.jpg", "/Images/lib4.webp"],
    audioFile: "/Audio/lib.ogg",
    audioTitle: "Library Tour Narration",
    facts: [
      "Hours: 24/7 during exams, 6 AM - 2 AM regular semester",
      "Floors: 5 levels of study and research space",
      "Special Features: Silent study areas, group collaboration rooms",
      "Collection: Over 500,000 books and digital resources",
    ],
    coordinates: [-1.3095223341989337, 36.814028736977974], // Strathmore University Library
  },
  {
    title: "Student Center",
    description:
      "The heart of campus life featuring dining options, student services, meeting rooms, and recreational facilities. A hub for social and academic activities.",
    images: ["/Images/stchd.jpeg", "/Images/stc4.jpg", "/Images/stcb.jpeg"],
    thumbnails: ["/Images/stchd.jpeg", "/Images/stc4.jpg", "/Images/stcb.jpeg"],
    audioFile: "/Audio/",
    audioTitle: "Student Center Tour Narration",
    facts: [
      "Hours: 7 AM - 11 PM daily",
      "Dining: 8 different restaurants and cafes",
      "Services: Bookstore, post office, student government",
      "Recreation: Game room, TV lounge, study areas",
    ],
    coordinates: [-1.3099844780401626, 36.81315465232008], // Strathmore Student Center
  },
  {
    title: "Management Science Building",
    description:
      "Modern laboratories and classrooms equipped with cutting-edge technology for management science, data analytics, and research programs.",
    images: ["/Images/msb.jpg", "/Images/msb2.jpeg", "/Images/msb2.jpg"],
    thumbnails: ["/Images/msb.jpg", "/Images/msb2.jpeg", "/Images/msb2.jpg"],
    audioFile: "/Audio/management-science.ogg",
    audioTitle: "Management Science Building Tour Narration",
    facts: [
      "Labs: 15 computer labs and data analytics facilities",
      "Technology: Advanced software for statistical analysis and modeling",
      "Programs: Management Science, Data Analytics, Operations Research",
      "Research: Quantitative analysis and decision-making projects",
    ],
    coordinates: [-1.310692482211766, 36.814323765813384], // Management Science Building
  },
  {
    title: "Sports Complex",
    description:
      "Complete fitness and sports facility including gymnasium, swimming pool, fitness center, and outdoor fields for all athletic programs.",
    images: ["/Images/sc.jpeg", "/Images/sc1.jpg", "/Images/sc2.jpg"],
    thumbnails: ["/Images/sc.jpeg", "/Images/sc1.jpg", "/Images/sc2.jpg"],
    audioFile: "/Audio/sports-complex.ogg",
    audioTitle: "Sports Complex Tour Narration",
    facts: [
      "Facilities: Gymnasium, pool, fitness center, outdoor fields",
      "Hours: 6 AM - 11 PM for students",
      "Sports: 15 varsity teams and intramural programs",
      "Fitness: Modern equipment and group fitness classes",
    ],
    coordinates: [-1.3107261041306382, 36.80880592348452], // Strathmore Sports Complex
  },
  {
    title: "Business School",
    description:
      "Modern facilities and resources for business education, including lecture halls, collaboration spaces, and a dedicated career center.",
    images: [
      "/Images/biz2.png",
      "/Images/biz1.jpg",
      "/Images/biz.jpeg",
    ],
    thumbnails: [
      "/Images/biz2.png",
      "/Images/biz1.jpg",
      "/Images/biz.jpeg",
    ],
    audioFile: "/Audio/business-school.ogg",
    audioTitle: "Business School Tour Narration",
    facts: [
      "Programs: MBA, Bachelor's in Business Administration, Finance",
      "Faculty: 45 experienced professors and industry experts",
      "Features: Modern lecture halls, case study rooms, career center",
      "Partnerships: Strong industry connections and internship programs",
    ],
    coordinates: [-1.3100319531890738, 36.812658213858555], // Strathmore Business School
  },
];

// Current tour state
let currentStop = 0;
let map = null;
let markers = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
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
  const stopButtons = document.querySelectorAll(".stop-btn");
  stopButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      goToStop(index);
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Thumbnail click handlers will be set when loading tour stops
}

// Start tour function (called by CTA button)
function startTour() {
  document.querySelector("#tour").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Load specific tour stop
function loadTourStop(stopIndex) {
  if (stopIndex < 0 || stopIndex >= tourStops.length) return;

  const stop = tourStops[stopIndex];
  currentStop = stopIndex;

  // Update main content
  document.getElementById("stop-title").textContent = stop.title;
  document.getElementById("stop-description").textContent = stop.description;
  document.getElementById("main-tour-image").src = stop.images[0];
  document.getElementById("main-tour-image").alt = stop.title;

  // Update audio
  const audioElement = document.getElementById("tour-audio");
  const audioInfo = document.getElementById("audio-title");
  const audioControls = document.querySelector(".audio-controls");
  
  if (stop.audioFile && stop.audioFile !== "") {
    audioElement.src = stop.audioFile;
    audioElement.style.display = "block";
    audioControls.style.display = "block";
    audioInfo.textContent = stop.audioTitle;
    
    // Add multiple source formats for better browser compatibility
    audioElement.innerHTML = `
      <source src="${stop.audioFile}" type="audio/ogg">
      <source src="${stop.audioFile.replace('.ogg', '.mp3')}" type="audio/mpeg">
      <source src="${stop.audioFile.replace('.ogg', '.wav')}" type="audio/wav">
      Your browser does not support the audio element.
    `;
    
    // Load the audio
    audioElement.load();
  } else {
    audioElement.style.display = "none";
    audioControls.style.display = "none";
    audioInfo.textContent = "Audio narration not available for this location";
  }

  // Update quick facts
  const factsList = document.getElementById("quick-facts");
  factsList.innerHTML = "";
  stop.facts.forEach((fact) => {
    const li = document.createElement("li");
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
  document.getElementById("current-stop").textContent = stopIndex + 1;
  document.getElementById("total-stops").textContent = tourStops.length;

  // Highlight location on map
  if (map && markers.length > 0) {
    highlightMapMarker(stopIndex);
  }
}

// Update thumbnail gallery
function updateThumbnails(stop) {
  const thumbnailGallery = document.querySelector(".thumbnail-gallery");
  thumbnailGallery.innerHTML = "";

  stop.thumbnails.forEach((thumb, index) => {
    const img = document.createElement("img");
    img.className = "thumbnail" + (index === 0 ? " active" : "");
    img.src = thumb;
    img.alt = `${stop.title} ${index + 1}`;
    img.onclick = () => changeImage(stop.images[index], img);
    thumbnailGallery.appendChild(img);
  });
}

// Change main image
function changeImage(imageSrc, thumbnailElement) {
  document.getElementById("main-tour-image").src = imageSrc;

  // Update active thumbnail
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });
  if (thumbnailElement) {
    thumbnailElement.classList.add("active");
  }
}

// Update stop selector buttons
function updateStopButtons() {
  const stopButtons = document.querySelectorAll(".stop-btn");
  stopButtons.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentStop);
  });
}

// Update navigation buttons
function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

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
  const tourSection = document.querySelector("#tour");
  const rect = tourSection.getBoundingClientRect();
  if (rect.top < 0 || rect.bottom > window.innerHeight) {
    tourSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Initialize interactive map
function initializeMap() {
  // Strathmore University coordinates (Nairobi, Kenya)
  const campusCenter = [-1.3095223341989337, 36.814028736977974];

  map = L.map("campus-map").setView(campusCenter, 16);

  // Add tile layer (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Custom marker colors for each building type
  const markerColors = {
    0: "#e74c3c", // Library - Red
    1: "#3498db", // Student Center - Blue
    2: "#2ecc71", // Management Science - Green
    3: "#f39c12", // Sports Complex - Orange
    4: "#9b59b6", // Business School - Purple
  };

  tourStops.forEach((stop, index) => {
    // Create custom colored markers
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${markerColors[index]}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });

    const marker = L.marker(stop.coordinates, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content" style="text-align: center; padding: 10px; min-width: 200px;">
          <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 1.1rem;">${stop.title}</h4>
          <p style="margin: 0 0 15px 0; color: #666; font-size: 0.9rem; line-height: 1.4;">${stop.description.substring(0, 100)}...</p>
          <button onclick="goToStop(${index})" class="popup-btn" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9rem; transition: transform 0.2s ease;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">View Tour Stop</button>
        </div>
      `);

    markers.push(marker);

    // Add click event to marker
    marker.on("click", function () {
      goToStop(index);
    });
  });

  // Add campus boundary or highlight area (optional)
  const campusBounds = [
    [-1.3115, 36.8080], // Southwest corner
    [-1.3080, 36.8160]  // Northeast corner
  ];

  // Add a subtle campus area highlight
  L.rectangle(campusBounds, {
    color: "#1e3c72",
    weight: 2,
    opacity: 0.3,
    fillColor: "#1e3c72",
    fillOpacity: 0.1
  }).addTo(map);
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
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Add some animation effects
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", addScrollAnimations);

// Handle keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    previousStop();
  } else if (e.key === "ArrowRight") {
    nextStop();
  }
});

// Audio control enhancements
function setupAudioControls() {
  const audioElement = document.getElementById("tour-audio");
  const audioInfo = document.getElementById("audio-title");

  audioElement.addEventListener("loadedmetadata", function () {
    console.log("Audio loaded for: " + audioInfo.textContent);
    audioInfo.textContent = audioInfo.textContent + " (Ready to play)";
  });

  audioElement.addEventListener("error", function () {
    console.log("Audio file not available for this tour stop");
    audioInfo.textContent = "Audio file could not be loaded";
    audioElement.style.display = "none";
  });

  audioElement.addEventListener("loadstart", function () {
    audioInfo.textContent = audioInfo.textContent.replace(" (Ready to play)", "") + " (Loading...)";
  });

  audioElement.addEventListener("canplay", function () {
    audioInfo.textContent = audioInfo.textContent.replace(" (Loading...)", "") + " (Ready to play)";
  });

  // Add play/pause event listeners for better user feedback
  audioElement.addEventListener("play", function () {
    console.log("Audio started playing");
  });

  audioElement.addEventListener("pause", function () {
    console.log("Audio paused");
  });

  audioElement.addEventListener("ended", function () {
    console.log("Audio finished playing");
    audioInfo.textContent = audioInfo.textContent.replace(" (Ready to play)", "") + " (Completed)";
  });
}

// Call audio setup when DOM is ready
document.addEventListener("DOMContentLoaded", setupAudioControls);

// Export functions for global access (if needed)
window.startTour = startTour;
window.changeImage = changeImage;
window.previousStop = previousStop;
window.nextStop = nextStop;
window.goToStop = goToStop;
