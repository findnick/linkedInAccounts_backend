const mongoose = require('mongoose');

const connectDB = (server) => {
    mongoose.connect(process.env.mongoURI)
        .then(() => { console.log('Db Connected') })
        .then(() => { server() })
        .catch((err) => { console.log('The Err is: ', err.message) })
}

module.exports = connectDB