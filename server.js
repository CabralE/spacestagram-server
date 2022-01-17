///////////////////////////////
// Dependencies
///////////////////////////////
require("dotenv").config();

const { PORT = 3000, MONGODB_URL, API_KEY } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const axios = require('axios').default

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// Models
////////////////////////////////
const NasaImagesSchema = new mongoose.Schema({
    date: String,
    explanation: String,
    hdurl: String,
    mediaType: String,
    serviceVersion: String,
    title: String,
    link: String,
})

const NasaImages = mongoose.model("NasaImages", NasaImagesSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



app.get("/", (req, res) => {
    const options = {
        method: 'GET',
        url: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
        data: {
            nasaImages: req.body
        }
    }
    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    })
})

app.post('/', async (req, res) => {
    const options = {
        method: 'POST',
        url: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
        headers: {
            'content-type': 'application/json',
        },
        data: {
            nasaImages: req.body
        }
    }
    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    })
})

app.listen(PORT, () => console.log(`listenting on PORT URL ${PORT}`));