const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const publicDir = path.join(__dirname, 'public');
app.use('/public', express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ar.html'));
  });

app.post('/api/model', (req, res) => {
  const selectedModel = req.body.model;
  const arHtmlPath = path.join(__dirname, 'public', 'ar.html');

  fs.readFile(arHtmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading ar.html:', err);
      res.sendStatus(500);
      return;
    }

    const updatedHtml = data.replace(
      /src="\/public\/models\/(.+?)"/,
      `src="${selectedModel}"`
    );

    fs.writeFile(arHtmlPath, updatedHtml, (err) => {
      if (err) {
        console.error('Error writing ar.html:', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});