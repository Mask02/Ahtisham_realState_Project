import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Properties from './dbModel.js';

// config
const app = express();
const port = process.env.PORT || 5000


// middlewares
app.use(express.json());
app.use(cors())


// connection to the Database
const connection_url = 'mongodb+srv://ahtisham:1234@cluster0.aikmvqk.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true
}).then(() => {
    console.log('connection successful')
}).catch((error)=>[
    console.log(error)
])


// API endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})

// API to get videos from the database
app.get('/getProperties', (req, res) => {
    Property.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

// API to add videos to the database
app.post('/addProperty', (req, res) => {
    const newProperty = req.body;

    Properties.create(newProperty, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })

})


// listener
app.listen(port, () => {
    console.log('server is running on ' + port);
})