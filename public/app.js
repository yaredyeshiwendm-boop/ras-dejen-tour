// ==========================================
// RAS DEJEN TOUR
// Main App JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const navItems = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".screen");

  function showScreen(screenId) {

    screens.forEach(screen => {
      screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
      target.classList.add("active");
    }

    navItems.forEach(item => {
      item.classList.remove("active");

      if (item.dataset.screen === screenId) {
        item.classList.add("active");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  // ==============================
  // BOTTOM NAVIGATION
  // ==============================

  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const screenId = item.dataset.screen;

      if (screenId) {
        showScreen(screenId);
      }

    });

  });


  // ==============================
  // PROFILE
  // ==============================

  const profileButton =
    document.querySelector(".profile-btn");

  if (profileButton) {

    profileButton.addEventListener("click", () => {
      showScreen("accountScreen");
    });

  }


  // ==============================
  // EXPLORE NEAR ME
  // ==============================

  const nearbyButton =
    document.querySelector(".nearby-btn");

  if (nearbyButton) {

    nearbyButton.addEventListener("click", () => {
      showScreen("nearbyScreen");
    });

  }


  // ==============================
  // OPEN MAP
  // ==============================

  const openMapButton =
    document.querySelector(".map-preview button");

  if (openMapButton) {

  openMapButton.addEventListener("click", () => {

    if (!navigator.geolocation) {

      alert("Location is not supported on this device.");

      return;

    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        const googleUrl =
          `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        const appleUrl =
          `https://maps.apple.com/?ll=${lat},${lng}`;

        const useApple =
          /iPhone|iPad|iPod/i.test(
            navigator.userAgent
          );

        if (useApple) {

          window.open(
            appleUrl,
            "_blank"
          );

        } else {

          window.open(
            googleUrl,
            "_blank"
          );

        }

      },

      () => {

        alert(
          "Please allow location access to explore the map."
        );

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }

    );

  });

}


  // ==============================
  // CATEGORY BUTTONS
  // ==============================

  const categoryButtons =
    document.querySelectorAll(".category-card");

  categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.querySelector("span:last-child")
          ?.textContent
          .trim();

      console.log("Category clicked:", category);

      if (category === "Places") {

  showScreen("placesScreen");

  return;
}

if (category === "Tours") {

  showScreen("toursScreen");

  return;
}

      alert(
        `${category}\n\nThis section will be available soon.`
      );

    });

  });


  // ==============================
  // ==============================
  // SEARCH
  // ==============================

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.addEventListener("keydown", event => {

      if (event.key !== "Enter") return;

      const query =
        searchInput.value.trim().toLowerCase();

      if (!query) return;

      const matchedPlace =
        Object.entries(places).find(([id, place]) => {

          return (
            place.name.toLowerCase().includes(query) ||
            place.location.toLowerCase().includes(query)
          );

        });

      if (matchedPlace) {

        const placeId = matchedPlace[0];

        const card =
          document.querySelector(
            `.place-list-card[data-place="${placeId}"]`
          );

        if (card) {
          card.click();
          return;
        }

      }

      showScreen("placesScreen");

      alert(
        `No exact result found for "${query}".`
      );

    });

  }


  // ==============================
  // INITIAL SCREEN
  // ==============================

  showScreen("exploreScreen");

  console.log("Ras Dejen Tour loaded successfully.");

// ==========================================
// PLACE MAP DIRECTIONS
// ==========================================

let selectedPlaceForMap = null;

function openPlaceDirections(place) {

  if (!place) return;

  const latitude = Number(place.latitude);
  const longitude = Number(place.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    alert("Map location is not available for this place yet.");
    return;
  }

  const destination =
    `${latitude},${longitude}`;

  const googleUrl =
    "https://www.google.com/maps/dir/?api=1" +
    `&destination=${encodeURIComponent(destination)}` +
    "&travelmode=driving";

  const appleUrl =
    "https://maps.apple.com/?daddr=" +
    encodeURIComponent(destination) +
    "&dirflg=d";

  const useApple =
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

  window.open(
    useApple ? appleUrl : googleUrl,
    "_blank"
  );
}

  // ==============================
  // LOAD PLACES FROM DATABASE
  // ==============================

  async function loadPlacesFromAPI() {
    try {
      const response = await fetch("/api/places");

      if (!response.ok) {
        throw new Error("Failed to load places");
      }

      const data = await response.json();

      if (!data.success || !Array.isArray(data.places)) {
        return;
      }

      // Database is the single source of truth.
      // Clear static HTML cards immediately.
      const placesGrid =
        document.querySelector(".places-grid");

      if (!placesGrid) return;

      placesGrid.innerHTML = "";

      if (data.places.length > 0) {

        data.places.forEach(place => {

          const article =
            document.createElement("article");

          article.className = "place-list-card";

          article.dataset.place = `db-${place.id}`;

          const placeName = (place.name || "").toLowerCase();

          let placeIcon = "🏛️";
          let placeClass = "place-natural";

          if (
            placeName.includes("simien") ||
            placeName.includes("ras dejen") ||
            placeName.includes("bwahit") ||
            placeName.includes("chenek") ||
            placeName.includes("mountain") ||
            placeName.includes("peak")
          ) {
            placeIcon = "🏔️";
            placeClass = "place-mountain";
          } else if (
            placeName.includes("waterfall") ||
            placeName.includes("jinbar")
          ) {
            placeIcon = "💧";
            placeClass = "place-water";
          } else if (
            placeName.includes("gondar") ||
            placeName.includes("castle") ||
            placeName.includes("palace")
          ) {
            placeIcon = "🏰";
            placeClass = "place-historical";
          } else if (
            placeName.includes("debar") ||
            placeName.includes("buyit") ||
            placeName.includes("sankaber") ||
            placeName.includes("geech") ||
            placeName.includes("imet")
          ) {
            placeIcon = "📍";
            placeClass = "place-destination";
          }

          article.innerHTML = `
            <div class="large-place-image ${placeClass}">
              ${
                place.image_url
                  ? `<img src="${place.image_url}" alt="${place.name}">`
                  : `<div class="place-icon">${placeIcon}</div>`
              }

              <div class="place-image-overlay"></div>

              <div class="place-type-badge">
                ${place.category || "Explore"}
              </div>
            </div>

            <div class="place-list-info">

              <div class="place-title-row">
                <h2>${place.name}</h2>
                <span class="place-rating">★ 5.0</span>
              </div>

              <p>
                ${place.description || "Discover this beautiful destination in North Gondar."}
              </p>

              <small>
                📍 ${place.location || "North Gondar"}
              </small>

            </div>

            <button
              class="heart-btn"
              type="button"
              aria-label="Save ${place.name}"
            >♡</button>
          `;

          placesGrid.appendChild(article);

          // Open database place details
          article.addEventListener("click", () => {

            document.getElementById("detailsName")
              .textContent = place.name;

            document.getElementById("detailsRating")
              .textContent = "★ 5.0";

            document.getElementById("detailsLocation")
              .textContent =
                `📍 ${place.location || "North Gondar"}`;

            document.getElementById("detailsDescription")
              .textContent =
                place.description ||
                "Discover this beautiful destination in North Gondar.";

            const image =
              document.getElementById("detailsImage");

            image.className = "details-hero";

            if (place.image_url) {
              image.style.backgroundImage =
                `url("${place.image_url}")`;

              image.style.backgroundSize = "cover";
              image.style.backgroundPosition = "center";
              image.textContent = "";
            } else {
              image.style.backgroundImage = "";
              image.textContent = "🏛️";
            }

            showScreen("placeDetailsScreen");
            selectedPlaceForMap = place;
          });

          // Save button
          const heart =
            article.querySelector(".heart-btn");

          if (heart) {

            const savedPlaces =
              JSON.parse(
                localStorage.getItem("savedPlaces") || "[]"
              );

            const isSaved =
              savedPlaces.some(
                saved => Number(saved.id) === Number(place.id)
              );

            heart.textContent =
              isSaved ? "♥" : "♡";

            heart.addEventListener("click", event => {

              event.stopPropagation();

              let saved =
                JSON.parse(
                  localStorage.getItem("savedPlaces") || "[]"
                );

              const index =
                saved.findIndex(
                  item => Number(item.id) === Number(place.id)
                );

              if (index === -1) {

                saved.push(place);
                heart.textContent = "♥";

              } else {

                saved.splice(index, 1);
                heart.textContent = "♡";

              }

              localStorage.setItem(
                "savedPlaces",
                JSON.stringify(saved)
              );

              renderSavedPlaces();

            });

          }

        });
      }

    } catch (error) {

      console.error(
        "Places API error:",
        error.message
      );

    }
  }

  // Load database places
  // ==========================================
// TOURS API
// ==========================================

async function loadToursFromAPI() {

  try {

    const response = await fetch("/api/tours");

    if (!response.ok) {
      throw new Error("Failed to load tours");
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.tours)) {
      return;
    }

    const toursGrid =
      document.getElementById("toursGrid");

    if (!toursGrid) return;

    toursGrid.innerHTML = "";

    data.tours.forEach(tour => {

      const card =
        document.createElement("article");

      card.className = "tour-card";

      card.dataset.category =
        tour.category || "Other";

      card.innerHTML = `

        <div class="tour-image">
          ${
            tour.image_url
              ? `<img src="${tour.image_url}" alt="${tour.name}">`
              : "🏔️"
          }
        </div>

        <div class="tour-info">

          <div class="tour-category">
            ${tour.category || "Tour"}
          </div>

          <h2>${tour.name}</h2>

          <p>
            ${tour.description || ""}
          </p>

          <div class="tour-meta">

            <span>
              🕐 ${tour.duration || "—"}
            </span>

            <span>
              👥 Max ${tour.max_people || "—"}
            </span>

          </div>

          <div class="tour-route">

            <span>
              📍 ${tour.starting_location || "Debark"}
            </span>

            <span>→</span>

            <span>
              ${tour.destination || ""}
            </span>

          </div>

          <div class="tour-bottom">

            <button class="tour-view-btn">
              View Tour
            </button>

          </div>

        </div>
      `;

      toursGrid.appendChild(card);
          // ==============================
      // OPEN TOUR DETAILS
      // ==============================

      card.addEventListener("click", event => {

        // Ignore click when View Tour button is handled separately
        if (
          event.target.closest(".tour-view-btn")
        ) {
          return;
        }

        openTourDetails(tour);

      });

      const viewButton =
        card.querySelector(".tour-view-btn");

      if (viewButton) {

        viewButton.addEventListener("click", event => {

          event.stopPropagation();

          openTourDetails(tour);

        });

      }

    });

    // ==============================
    // TOUR FILTERS
    // ==============================

    document
      .querySelectorAll("[data-tour-category]")
      .forEach(button => {

        button.addEventListener("click", () => {

          document
            .querySelectorAll("[data-tour-category]")
            .forEach(btn =>
              btn.classList.remove("active")
            );

          button.classList.add("active");

          const category =
            button.dataset.tourCategory;

          document
            .querySelectorAll(".tour-card")
            .forEach(card => {

              if (
                category === "All" ||
                card.dataset.category === category
              ) {

                card.style.display = "";

              } else {

                card.style.display = "none";

              }

            });

        });

      });

  } catch (error) {

    console.error(
      "Tours API error:",
      error.message
    );

  }

}
// ==========================================
// TOUR DETAILS
// ==========================================

function openTourDetails(tour) {

  const name =
    document.getElementById("tourDetailsName");

  const description =
    document.getElementById("tourDetailsDescription");

  const duration =
    document.getElementById("tourDetailsDuration");

  const maxPeople =
    document.getElementById("tourDetailsMaxPeople");

  const start =
    document.getElementById("tourDetailsStartingLocation");

  const destination =
    document.getElementById("tourDetailsDestination");

  const image =
    document.getElementById("tourDetailsImage");


  if (name) {
    name.textContent = tour.name;
  }

  if (description) {
    description.textContent =
      tour.description || "";
  }

  if (duration) {
    duration.textContent =
      tour.duration || "—";
  }

  if (maxPeople) {
    maxPeople.textContent =
      `${tour.max_people || "—"} people`;
  }

  if (start) {
    start.textContent =
      tour.starting_location || "Debark";
  }

  if (destination) {
    destination.textContent =
      tour.destination || "Simien Mountains";
  }


  if (image) {

    image.textContent = "🥾";

    image.style.backgroundImage = "";

    if (tour.image_url) {

      image.style.backgroundImage =
        `url("${tour.image_url}")`;

      image.style.backgroundSize = "cover";
      image.style.backgroundPosition = "center";

      image.textContent = "";

    }

  }
      const bookTourBtn =
    document.getElementById("bookTourBtn");

  if (bookTourBtn) {

    bookTourBtn.onclick = () => {

      window.currentTour = tour;


    };

  }

    const routeButton =
  document.querySelector(
    "#tourDetailsScreen .directions-btn"
  );

if (routeButton) {

  routeButton.onclick = () => {

    const start =
      tour.starting_location || "Debark, Ethiopia";

    const destination =
      tour.destination || "Simien Mountains, Ethiopia";

    const mapsUrl =
      "https://www.google.com/maps/dir/?api=1" +
      `&origin=${encodeURIComponent(start)}` +
      `&destination=${encodeURIComponent(destination)}` +
      "&travelmode=driving";

    window.open(mapsUrl, "_blank");

  };

}

const mapChoiceModal =
  document.getElementById("mapChoiceModal");

const closeMapChoice =
  document.getElementById("closeMapChoice");

const openGoogleMaps =
  document.getElementById("openGoogleMaps");

const openAppleMaps =
  document.getElementById("openAppleMaps");

let selectedTourForMap = null;


if (routeButton) {

  routeButton.onclick = () => {

    selectedTourForMap = tour;

    if (mapChoiceModal) {
      mapChoiceModal.classList.add("active");
    }

  };

}


if (closeMapChoice) {

  closeMapChoice.onclick = () => {

    mapChoiceModal.classList.remove("active");

  };

}


if (openGoogleMaps) {

  openGoogleMaps.onclick = () => {

    if (!selectedTourForMap) return;

    const start =
      selectedTourForMap.starting_location ||
      "Debark, Ethiopia";

    const destination =
      selectedTourForMap.destination ||
      "Simien Mountains, Ethiopia";

    const url =
      "https://www.google.com/maps/dir/?api=1" +
      `&origin=${encodeURIComponent(start)}` +
      `&destination=${encodeURIComponent(destination)}` +
      "&travelmode=driving";

    window.open(url, "_blank");

    mapChoiceModal.classList.remove("active");

  };

}


if (openAppleMaps) {

  openAppleMaps.onclick = () => {

    if (!selectedTourForMap) return;

    const start =
      selectedTourForMap.starting_location ||
      "Debark, Ethiopia";

    const destination =
      selectedTourForMap.destination ||
      "Simien Mountains, Ethiopia";

    const url =
      "https://maps.apple.com/?saddr=" +
      encodeURIComponent(start) +
      "&daddr=" +
      encodeURIComponent(destination) +
      "&dirflg=d";

    window.open(url, "_blank");

    mapChoiceModal.classList.remove("active");

  };

}

  showScreen("tourDetailsScreen");

}
// ==========================================
  // PLACE DETAILS — GET DIRECTIONS
  // ==========================================

  const placeDirectionsButton =
    document.querySelector(
      "#placeDetailsScreen .directions-btn"
    );

  if (placeDirectionsButton) {

    placeDirectionsButton.addEventListener("click", () => {

      if (!selectedPlaceForMap) {
        alert("Please select a place first.");
        return;
      }

      openPlaceDirections(selectedPlaceForMap);

    });

  }

  // ==========================================
  // SAVED PLACES / MY TRIPS
  // ==========================================

  function renderSavedPlaces() {

    const container =
      document.getElementById("savedPlacesContainer");

    if (!container) return;

    const saved =
      JSON.parse(
        localStorage.getItem("savedPlaces") || "[]"
      );

    if (saved.length === 0) {

      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🌍</div>

          <h2>No saved places yet</h2>

          <p>
            Save places you want to visit and they will appear here.
          </p>
        </div>
      `;

      return;
    }

    container.innerHTML = "";

    saved.forEach(place => {

      const article =
        document.createElement("article");

      article.className = "place-list-card";

      article.innerHTML = `
        <div class="large-place-image place-natural">
          ${
            place.image_url
              ? `<img src="${place.image_url}" alt="${place.name}">`
              : `<div class="place-icon">🏛️</div>`
          }
        </div>

        <div class="place-list-info">

          <div class="place-title-row">
            <h2>${place.name}</h2>
            <span class="place-rating">★ 5.0</span>
          </div>

          <p>
            ${place.description || "Discover this beautiful destination in North Gondar."}
          </p>

          <small>
            📍 ${place.location || "North Gondar"}
          </small>

        </div>

        <button
          class="heart-btn"
          type="button"
          aria-label="Remove ${place.name}"
        >♥</button>
      `;

      container.appendChild(article);

      article.addEventListener("click", event => {

        if (event.target.closest(".heart-btn")) return;

        document.getElementById("detailsName")
          .textContent = place.name;

        document.getElementById("detailsRating")
          .textContent = "★ 5.0";

        document.getElementById("detailsLocation")
          .textContent =
            `📍 ${place.location || "North Gondar"}`;

        document.getElementById("detailsDescription")
          .textContent =
            place.description ||
            "Discover this beautiful destination in North Gondar.";

        const image =
          document.getElementById("detailsImage");

        image.className = "details-hero";

        if (place.image_url) {

          image.style.backgroundImage =
            `url("${place.image_url}")`;

          image.style.backgroundSize = "cover";
          image.style.backgroundPosition = "center";
          image.textContent = "";

        } else {

          image.style.backgroundImage = "";
          image.textContent = "🏛️";

        }

        selectedPlaceForMap = place;

        showScreen("placeDetailsScreen");

      });

      const heart =
        article.querySelector(".heart-btn");

      heart.addEventListener("click", event => {

        event.stopPropagation();

        const current =
          JSON.parse(
            localStorage.getItem("savedPlaces") || "[]"
          );

        const updated =
          current.filter(
            item => Number(item.id) !== Number(place.id)
          );

        localStorage.setItem(
          "savedPlaces",
          JSON.stringify(updated)
        );

        renderSavedPlaces();

        // Refresh hearts on Places screen
        document.querySelectorAll(".place-list-card").forEach(card => {

          if (
            card.dataset.place === `db-${place.id}`
          ) {

            const cardHeart =
              card.querySelector(".heart-btn");

            if (cardHeart) {
              cardHeart.textContent = "♡";
            }

          }

        });

      });

    });

  }

  const tripsNav =
    document.querySelector(
      '.nav-item[data-screen="tripsScreen"]'
    );

  if (tripsNav) {

    tripsNav.addEventListener("click", () => {
      renderSavedPlaces();
    });

  }

  // Load places from database

  loadPlacesFromAPI();
  renderSavedPlaces();
  loadToursFromAPI();
});
