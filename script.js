document.getElementById('movieForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const query = document.getElementById('movieInput').value;
  const apiKey = '16d4f284';
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      alert("No movies found!");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});

function displayMovies(movies) {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : '💩';
    const movieBlock = document.createElement('div');
    movieBlock.className = 'col-md-3 my-3 movie-block';
    movieBlock.innerHTML = `
      <div class="card">
        <img src="${poster}" class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year}</p>
          <button class="btn btn-primary" onclick="showDetails('${movie.imdbID}')">Read More</button>
        </div>
      </div>
    `;
    movieList.appendChild(movieBlock);
  });
}

async function showDetails(imdbID) {
  const apiKey = '16d4f284'; // Replace with your API key
  const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      document.getElementById('movieDetails').innerText = data.Plot;
      const modal = new bootstrap.Modal(document.getElementById('movieModal'));
      modal.show();
    } else {
      alert("No details found!");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}
