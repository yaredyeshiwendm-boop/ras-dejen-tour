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

  const places = {

    gondar: {
      name: "Historic Gondar",
      rating: "★ 4.8",
      location: "📍 Gondar, North Gondar",
      image: "gondar-image",
      icon: "🏛️",
      description:
        "Discover the history, culture and beautiful attractions of North Gondar. Explore the area and experience the unique heritage of the region."
    },

    simien: {
      name: "Simien Mountains",
      rating: "★ 4.9",
      location: "📍 North Gondar",
      image: "simien-image",
      icon: "🏔️",
      description:
        "Experience spectacular mountain landscapes, dramatic scenery and the natural beauty of North Gondar."
    },

    "lake-tana": {
      name: "Lake Tana Area",
      rating: "★ 4.7",
      location: "📍 Near Gondar",
      image: "lake-image",
      icon: "🌊",
      description:
        "Explore the beautiful lake area, surrounding attractions and unique cultural experiences."
    }

  };


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

});
