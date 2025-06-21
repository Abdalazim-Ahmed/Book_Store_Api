const express = require('express');
const { connectToDB } = require('./config/db');
const { logger } = require('./middleware/logger')
const { notFound, errorHandler } = require('./middleware/errors')
require('dotenv').config()


// Connecte to mongoose
connectToDB();


// App Var
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(logger);

app.set('view engine', 'ejs');


// Routers
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/password', require('./routes/password'));


// Middleware Error Handler
app.use(notFound)
app.use(errorHandler)


// Run Server
const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`Server is running in ${process.env.MODE} mode on port :${port}`)
})