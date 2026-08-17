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
  loadPlacesFromAPI();
});
