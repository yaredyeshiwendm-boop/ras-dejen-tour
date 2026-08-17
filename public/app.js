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
      showScreen("nearbyScreen");
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
  // PLACE DATA
  // ==============================

  const places = {};


  // ==============================
  // PLACE CARDS
  // ==============================

  const placeCards =
    document.querySelectorAll(".place-list-card");

  placeCards.forEach(card => {

    card.addEventListener("click", () => {

      const placeId = card.dataset.place;
      const place = places[placeId];

      if (!place) return;

      document.getElementById("detailsName").textContent =
        place.name;

      document.getElementById("detailsRating").textContent =
        place.rating;

      document.getElementById("detailsLocation").textContent =
        place.location;

      document.getElementById("detailsDescription").textContent =
        place.description;

      const image =
        document.getElementById("detailsImage");

      image.className =
        `details-hero ${place.image}`;

      image.textContent =
        place.icon;

      showScreen("placeDetailsScreen");

    });

  });


  // ==============================
  // BACK TO PLACES
  // ==============================

  const backToPlaces =
    document.getElementById("backToPlaces");

  if (backToPlaces) {

    backToPlaces.addEventListener("click", () => {
      showScreen("placesScreen");
    });

  }


  // ==============================
  // SAVE PLACE
  // ==============================

  document.querySelectorAll(".save-btn, .heart-btn")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.stopPropagation();

        if (button.textContent.trim() === "♡") {

          button.textContent = "♥";

        } else {

          button.textContent = "♡";

        }

      });

    });


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

      // If database has places, replace the static cards
      if (data.places.length > 0) {

        const placesGrid =
          document.querySelector(".places-grid");

        if (!placesGrid) return;

        placesGrid.innerHTML = "";

        data.places.forEach(place => {

          const article =
            document.createElement("article");

          article.className = "place-list-card";

          article.dataset.place = `db-${place.id}`;

          article.innerHTML = `
            <div class="large-place-image">
              ${place.image_url
                ? `<img src="${place.image_url}" alt="${place.name}">`
                : "🏛️"
              }
            </div>

            <div class="place-list-info">
              <h2>${place.name}</h2>

              <p>
                ${place.description || ""}
              </p>

              <small>
                📍 ${place.location || "North Gondar"}
              </small>
            </div>

            <button class="heart-btn">♡</button>
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
          });

          // Save button
          const heart =
            article.querySelector(".heart-btn");

          if (heart) {
            heart.addEventListener("click", event => {

              event.stopPropagation();

              heart.textContent =
                heart.textContent.trim() === "♡"
                  ? "♥"
                  : "♡";

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

            <strong>
              ${Number(tour.price).toLocaleString()} ETB
            </strong>

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

  const price =
    document.getElementById("tourDetailsPrice");

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

  if (price) {
    price.textContent =
      `${Number(tour.price || 0).toLocaleString()} ETB`;
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

      alert(
        `Booking for ${tour.name} will be available soon.`
      );

    };

  }

    const routeButton =
    document.querySelector(
      "#tourDetailsScreen .directions-btn"
    );

  if (routeButton) {

    routeButton.onclick = () => {

      const routeName =
        document.getElementById("routeTourName");

      const routeSummary =
        document.getElementById("routeTourSummary");

      const routeStart =
        document.getElementById("routeStart");

      const routeDestination =
        document.getElementById("routeDestination");

      const timeline =
        document.getElementById("routeTimeline");

      if (routeName) {
        routeName.textContent = tour.name;
      }

      if (routeSummary) {
        routeSummary.textContent =
          `${tour.starting_location || "Debark"} to ${tour.destination || "Simien Mountains"}`;
      }

      if (routeStart) {
        routeStart.textContent =
          tour.starting_location || "Debark";
      }

      if (routeDestination) {
        routeDestination.textContent =
          tour.destination || "Simien Mountains";
      }

      if (timeline) {

        const stops = [
          tour.starting_location || "Debark",
          tour.destination || "Simien Mountains"
        ];

        timeline.innerHTML = stops.map(
          (stop, index) => `
            <div class="route-stop">

              <div class="route-dot"></div>

              <div class="route-stop-content">

                <strong>
                  ${stop}
                </strong>

                <small>
                  ${
                    index === 0
                      ? "Starting point of your journey"
                      : "Tour destination"
                  }
                </small>

              </div>

            </div>
          `
        ).join("");

      }

      showScreen("tourRouteScreen");

    };

  }

  showScreen("tourDetailsScreen");

}
const backToTours =
  document.getElementById("backToTours");

if (backToTours) {

  backToTours.addEventListener("click", () => {
    showScreen("toursScreen");
  });

}
const backToTourDetails =
  document.getElementById("backToTourDetails");

if (backToTourDetails) {

  backToTourDetails.addEventListener("click", () => {
    showScreen("tourDetailsScreen");
  });

}
  loadPlacesFromAPI();
  loadToursFromAPI();
});
