console.log("JS connected");
const API_URL = "https://www.omdbapi.com/?apikey=ae8789a2";
const trendingTitles = [
  "Guardians of the Galaxy Vol. 2",
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame",
  "Joker",
  "John Wick",
  "War",
  "Andhadhun",
  "Dangal",
  "Vikram",
  "Kaithi",
  "RRR",
  "Parasite",
  "Train to Busan"
];
function buildSearchUrl(title) {
  return `${API_URL}&t=${encodeURIComponent(title)}`;
}
async function fetchTrendingMovies() {
  try {
    const requests = trendingTitles.map(title =>
      fetch(buildSearchUrl(title)).then(res => res.json())
    );
    const movies = await Promise.all(requests);
    console.log("Trending movies data:", movies);
    renderTrendingRow(movies);
  } catch (err) {
    console.error("Error fetching trending movies:", err);
  }
}
function renderTrendingRow(movies) {
  const container = document.getElementById("trending-row");
  if (!container) 
    return;
  container.innerHTML = "";
  movies.forEach(movie => {
    if (!movie || movie.Response === "False") return;
    const card = document.createElement("div");
    card.className = "movie-card";
    const img = document.createElement("img");
    img.src = movie.Poster !== "N/A" ? movie.Poster : "";
    img.alt = movie.Title || "Movie poster";
    const title = document.createElement("h3");
    title.textContent = movie.Title || "Untitled";
    const year = document.createElement("p");
    year.textContent = movie.Year ? `Year: ${movie.Year}` : "";
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(year);

    container.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded", fetchTrendingMovies);

const featuredMovies = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame",
  "Gladiator",
  "Joker",
  "Titanic",
  "The Matrix",
  "Forrest Gump",
  "The Shawshank Redemption",
  "3 Idiots",
  "Dangal",
  "Lagaan",
  "Andhadhun",
  "PK",
  "Bajrangi Bhaijaan",
  "Vikram",
  "Kaithi",
  "Enthiran",
  "Thuppakki",
  "Jai Bhim",
  "RRR",
  "Baahubali: The Beginning",
  "Baahubali: The Conclusion",
  "Pushpa: The Rise",
  "Parasite",
  "Train to Busan",
  "Oldboy",
  "Memories of Murder"
];
async function loadBannerMovie() {
  const movieTitle =
    featuredMovies[Math.floor(Math.random() * featuredMovies.length)];
  try {
    const res = await fetch(`${API_URL}&t=${encodeURIComponent(movieTitle)}`);
    const movie = await res.json();
    if (movie.Response === "False" || movie.Poster === "N/A") return;
    const img = document.getElementById("banner-img");
    const title = document.getElementById("banner-title");
    const desc = document.getElementById("banner-desc");
    if (!img || !title || !desc) return;
    img.src = movie.Poster;
    title.textContent = movie.Title;
    desc.textContent = movie.Plot;
    banner.style.backgroundImage =
  `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.3)), url(${movie.Poster})`;
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
    title.textContent = movie.Title;
    desc.textContent = movie.Plot;
  } catch (err) {
    console.log("Banner error", err);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingMovies();
  loadBannerMovie();
});
const actionMovies = [
  "Mad Max: Fury Road",
  "John Wick",
  "The Dark Knight",
  "Gladiator",
  "Inception",
  "Avengers: Infinity War",
  "War",
  "Dhoom 2",
  "Baahubali: The Beginning",
  "Baahubali: The Conclusion",
  "Krrish",
  "Ek Tha Tiger",
  "Vikram",
  "Kaithi",
  "Master",
  "Enthiran",
  "Thuppakki",
  "Leo",
  "RRR",
  "Pushpa: The Rise",
  "Eega",
  "Magadheera",
  "Saaho",
  "Train to Busan",
  "The Man from Nowhere",
  "The Villainess",
  "Oldboy",
  "I Saw the Devil"
];
const comedyMovies = [
  "The Hangover",
  "Superbad",
  "Dumb and Dumber",
  "Home Alone",
  "Jumanji",
  "Mr. Bean's Holiday",
  "Hera Pheri",
  "Phir Hera Pheri",
  "3 Idiots",
  "Golmaal: Fun Unlimited",
  "Chup Chup Ke",
  "Andaz Apna Apna",
  "Panchathanthiram",
  "Boss Engira Baskaran",
  "Naduvula Konjam Pakkatha Kaanom",
  "Doctor",
  "Soodhu Kavvum",
  "DJ Tillu",
  "F2: Fun and Frustration",
  "Jathi Ratnalu",
  "Kick",
  "Ready",
  "Extreme Job",
  "My Sassy Girl",
  "Midnight Runners",
  "The Accidental Detective"
];
async function renderMovieRow(movieTitles, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let title of movieTitles) {
    try {
      const res = await fetch(`${API_URL}&t=${encodeURIComponent(title)}`);
      const movie = await res.json();

      if (movie.Response === "False" || movie.Poster === "N/A") continue;

      const card = document.createElement("div");
      card.addEventListener("click", () => openModal(movie));
      card.className = "movie-card";
      const img = document.createElement("img");
      img.src = movie.Poster;
      img.alt = movie.Title;
      const info = document.createElement("div");
      info.className = "movie-info";
      info.innerHTML = `
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
      `;
      card.appendChild(img);
      card.appendChild(info);
      container.appendChild(card);

    } catch (err) {
      console.log("Movie fetch failed", err);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingMovies();
  loadBannerMovie();
  renderMovieRow(actionMovies, "action-row");
  renderMovieRow(comedyMovies, "comedy-row");
});
document.querySelectorAll(".movie-list").forEach(row => {
  row.addEventListener("wheel", e => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      row.scrollLeft += e.deltaY;
    }
  });
});
function openModal(movie) {
  const modal = document.getElementById("movie-modal");

  document.getElementById("modal-img").src = movie.Poster;
  document.getElementById("modal-title").textContent = movie.Title;
  document.getElementById("modal-year").textContent = movie.Year;
  document.getElementById("modal-plot").textContent = movie.Plot;

  modal.style.display = "flex";

  requestAnimationFrame(() => {
    modal.style.opacity = "1";
    modal.querySelector(".modal-content").style.transform = "scale(1)";
  });
}
function closeModal() {
  const modal = document.getElementById("movie-modal");
  const content = modal.querySelector(".modal-content");

  modal.style.opacity = "0";
  content.style.transform = "scale(0.95)";

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

document.getElementById("close-modal").addEventListener("click", closeModal);

document.getElementById("movie-modal").addEventListener("click", e => {
  if (e.target.id === "movie-modal") closeModal();
});
document.getElementById("movie-modal").addEventListener("click", e => {
  if (e.target.id === "movie-modal") {
    e.currentTarget.style.display = "none";
  }
});
