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
  movieList.innerHTML = ''; // Efface les résultats précédents

  movies.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : 'path_to_default_image.jpg'; // Image par défaut
    const movieBlock = document.createElement('div');
    movieBlock.className = 'col-12 my-3 movie-block'; // col-12 pour prendre toute la largeur
    movieBlock.innerHTML = `
      <div class="card">
        <img src="${poster}" class="card-img-top" alt="${movie.Title}" style="width: 100px; margin: 0 auto;">
        <div class="card-body text-center">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year}</p>
          <button class="btn btn-primary" onclick="showDetails('${movie.imdbID}')">Read More</button>
        </div>
      </div>
    `;
    movieList.appendChild(movieBlock);
  });

  // Appel de la fonction pour ajouter l'animation sur le scroll
  addScrollAnimation();
}

function addScrollAnimation() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is visible:', entry.target); // Log pour vérifier l'élément visible
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // On arrête d'observer une fois que l'élément est visible
      }
    });
  }, { threshold: 0.1 });

  const movieBlocks = document.querySelectorAll('.movie-block');
  movieBlocks.forEach(block => {
    observer.observe(block);
    console.log('Observing block:', block); // Log pour vérifier l'observation
  });
}

async function showDetails(imdbID) {
  const apiKey = '16d4f284';
  const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const movie = await response.json();

    if (movie.Response === "True") {
      // Affiche les détails dans le modal
      document.getElementById('movieModalLabel').textContent = movie.Title;
      document.getElementById('movieDetails').innerHTML = `
        <strong>Year:</strong> ${movie.Year}<br>
        <strong>Rated:</strong> ${movie.Rated}<br>
        <strong>Released:</strong> ${movie.Released}<br>
        <strong>Genre:</strong> ${movie.Genre}<br>
        <strong>Director:</strong> ${movie.Director}<br>
        <strong>Plot:</strong> ${movie.Plot}
      `;

      // Ouvre le modal
      const modal = new bootstrap.Modal(document.getElementById('movieModal'));
      modal.show();
    } else {
      alert("Movie details not found!");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

