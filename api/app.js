const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = 5000;
const app = express();

const api_env = `http://localhost:${PORT}`;
const client_env = "http://localhost:3000"; 

app.use(cors());
const corsOptions = {
    origin: client_env
};

app.get('/current', cors(corsOptions), async (req, res) => {
    try {
        await axios.get('https://xkcd.com/info.0.json').then(response => {
            res.json(response.data);
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/:id', cors(corsOptions), async (req, res) => {
    try {
        var id = req.params.id;
        await axios.get(`https://xkcd.com/${id}/info.0.json`).then(response => {
            res.json(response.data);
        });
    }
    catch(err) {
        console.log(err);
    }
});


app.listen(PORT, () => {
    console.log(`Listening at ${api_env}`);
});
