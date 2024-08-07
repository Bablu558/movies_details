const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3001; // Or any port you prefer
app.use(cors({
    origin:'http://127.0.0.1:5500'
}));
// Serve static files from the movies_details directory
app.use(express.static(path.join(__dirname, '..')));

// API endpoint
app.get('/api/search', async (req, res) => {
    const movieTitle = req.query.title;
    const omdbApiKey = process.env.OMDB_API_KEY;
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;

    try {
        const omdbResponse = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(movieTitle)}`);
        const youtubeResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle)}&key=${youtubeApiKey}`);

        console.log('OMDb Response:', omdbResponse.data); // Log OMDb response
        console.log('YouTube Response:', youtubeResponse.data); // Log YouTube response

        res.json({
            omdb: omdbResponse.data,
            youtube: youtubeResponse.data
        });
    } catch (error) {
        console.error('Error:', error); // Log errors
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Handle root route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../movies_details/index.html'));
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
