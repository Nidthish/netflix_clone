console.log("JS connected");
const API_URL = "https://www.omdbapi.com/?apikey=ae8789a2";
const trendingTitles = [
  "Guardians of the Galaxy Vol. 2",
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame"
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
  "Leo",
  "Dragon",
  "Thunivu",
  "My Secret Santa",
  "Rio",
  "Stranger Things"
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
