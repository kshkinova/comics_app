const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/public')))
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/public', 'index.html'))
  })
}

app.get('/current', cors(), async (req, res) => {
    try {
        await axios.get('https://xkcd.com/info.0.json').then(response => {
            res.json(response.data);
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/:id', cors(), async (req, res) => {
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
    console.log(`Listening at ${PORT}`);
});
