const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("This is the default home page");
})

app.get('/getPieDataGender', (req, res) => {
    console.log("Request receied")
    try {
        res.status(200).send({data: [57,34], ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.get('/getPieDataCustomerType', (req, res) => {
    try {
        res.status(200).send({data: [47,53], ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.get('getLineData', (req, res) => {
    try {
        res.status(200).send({data: [34, 40, 57, 50, 65], ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.listen(3001);