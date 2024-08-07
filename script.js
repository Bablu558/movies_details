document.getElementById('searchBtn').addEventListener('click', function() {
    const apiKey = '92d9a90d'; // Replace with your OMDb API key
    const movieTitle = document.getElementById('movieTitle').value;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movieDetails = document.getElementById('movieDetails');
            if (data.Response === "True") {
                // Example YouTube link (you would need to use an API or manually provide these)
                const youtubeLink = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(data.Title);

                movieDetails.innerHTML = `
                    <div class="movie">
                        <h2>${data.Title}</h2>
                        <img src="${data.Poster}" alt="${data.Title} poster">

                        <p><strong>Year:</strong> ${data.Year}</p>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Director:</strong> ${data.Director}</p>
                        <p><strong>Actors:</strong> ${data.Actors}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <a href="${youtubeLink}" target="_blank" class="watch-button">Watch on YouTube</a>
                    </div>
                `;
            } else {
                movieDetails.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('movieDetails').innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
});