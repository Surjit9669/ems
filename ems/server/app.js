const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const { router } = require('./routes');

const app = express();

//port Number
const port = 4000;

// connection with DataBase
const url = 'mongodb://localhost:27017';
const dbName = 'ems_data';

//connection with mongoDB
mongoose
    .connect(`${url}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully Connection with Database');

        //listen server on given port
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    })
    .catch((err) => {
        console.log(`${err} did not connect`);
    });
app.use(cors())
app.use(express.json())
app.use("/employee", router)

