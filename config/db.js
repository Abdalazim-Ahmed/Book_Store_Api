
const mongoose = require('mongoose');
require('dotenv').config()

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to database succesfuly');

    } catch (error) {
        console.log('Connected filld');
    }
}

module.exports = {
    connectToDB
}