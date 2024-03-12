
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/process-xml', (req, res) => {
    const xmlData = req.body;

    // Parse XML
    xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
            return res.status(500).send('Error parsing XML');
        }

        // Render processed data
        res.render('result', { data: result });
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
