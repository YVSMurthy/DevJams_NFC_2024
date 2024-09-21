const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the default home page");
})

app.listen(3001);