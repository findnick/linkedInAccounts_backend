const express = require('express');
const app = express();
const db = require('./db/db');
require('dotenv').config();

const cors = require('cors');

const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json({ extended: false }))


// Routes
app.use('/api/user', require('./Routes/user'));


function database() {
    try {
        const node = server
        db(node)
    } catch (error) {
        console.log(error);
    }
}

database()

function server() {
    app.listen(port, () => { console.log('Server Listening on PORT: ', port) })
}
