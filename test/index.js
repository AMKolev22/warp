const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit-form', (req, res) => {
    console.log("Received", req.body);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
