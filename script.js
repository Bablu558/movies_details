document.getElementById('searchBtn').addEventListener('click', searchMovie);
document.getElementById('movieTitle').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchMovie();
    }
});

function searchMovie() {
    const movieTitle = document.getElementById('movieTitle').value;
    const proxyUrl = `http://localhost:3001/api/search?title=${encodeURIComponent(movieTitle)}`;

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetails = document.getElementById('movieDetails');
            if (data.omdb.Response === "True") {
                const youtubeLink = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(data.omdb.Title);

                movieDetails.innerHTML = `
                    <div class="movie">
                        <h2>${data.omdb.Title}</h2>
                        <img src="${data.omdb.Poster}" alt="${data.omdb.Title} poster">
                        <p><strong>Year:</strong> ${data.omdb.Year}</p>
                        <p><strong>Genre:</strong> ${data.omdb.Genre}</p>
                        <p><strong>Director:</strong> ${data.omdb.Director}</p>
                        <p><strong>Actors:</strong> ${data.omdb.Actors}</p>
                        <p><strong>Plot:</strong> ${data.omdb.Plot}</p>
                        <p><strong>Rating:</strong> ${data.omdb.imdbRating}</p>
                        <p><strong>Box Office:</strong> ${data.omdb.BoxOffice}</p>
                        <a href="${youtubeLink}" target="_blank" class="watch-button">Watch on YouTube</a>
                    </div>
                `;
            } else {
                movieDetails.innerHTML = `<p>No details found for the movie.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching from proxy server:', error);
            document.getElementById('movieDetails').innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}
