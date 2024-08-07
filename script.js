document.getElementById('searchBtn').addEventListener('click', searchMovie);
document.getElementById('movieTitle').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchMovie();
    }
});

function searchMovie() {
    const omdbApiKey = '92d9a90d'; // Replace with your OMDb API key
    const youtubeApiKey = 'AIzaSyAYxyII1X42e50FWITbV30rQ4UyZABbAYE'; // Replace with your YouTube API key
    const movieTitle = document.getElementById('movieTitle').value;
    const omdbUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(movieTitle)}`;
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle)}&key=${youtubeApiKey}`;

    fetch(omdbUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('OMDb API response not OK');
            }
            return response.json();
        })
        .then(data => {
            const movieDetails = document.getElementById('movieDetails');
            if (data.Response === "True") {
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
                         <p><strong>Ratting:</strong> ${data.imdbRating}</p>
                         <p><strong>Box Office:</strong> ${data.BoxOffice}</p>

                        <a href="${youtubeLink}" target="_blank" class="watch-button">Watch on YouTube</a>
                    </div>
                `;
            } else {
                // Movie not found in OMDb, fallback to YouTube
                fetch(youtubeUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('YouTube API response not OK');
                        }
                        return response.json();
                    })
                    .then(youtubeData => {
                        console.log('YouTube data:', youtubeData); // Log YouTube data for debugging
                        if (youtubeData && youtubeData.items && youtubeData.items.length > 0) {
                            const video = youtubeData.items[0].snippet;
                            const youtubeVideoLink = `https://www.youtube.com/watch?v=${youtubeData.items[0].id.videoId}`;

                            movieDetails.innerHTML = `
                                <div class="movie">
                                    <h2>${movieTitle}</h2>
                                    <img src="${video.thumbnails.high.url}" alt="${movieTitle} thumbnail">
                                    <p><strong>Description:</strong> ${video.description}</p>
                                    <a href="${youtubeVideoLink}" target="_blank" class="watch-button">Watch on YouTube</a>
                                </div>
                            `;
                        } else {
                            movieDetails.innerHTML = `<p>No details found for the movie.</p>`;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching from YouTube:', error);
                        document.getElementById('movieDetails').innerHTML = '<p>Something went wrong. Please try again later.</p>';
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching from OMDb:', error);
            document.getElementById('movieDetails').innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
}


