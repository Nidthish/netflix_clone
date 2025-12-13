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