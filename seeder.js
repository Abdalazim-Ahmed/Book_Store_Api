
const { connectToDB } = require('./config/db');
const { Book } = require('./models/Book');
const { books } = require('./data');
// require('dotenv').config();

// Connecte to database
connectToDB();

// Import books
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log('Books imported')

    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

// Remove Books
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books Removed")

    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}


if (process.argv[2] === '-import') {
    importBooks();

} else if (process.argv[2] === '-remove') {
    removeBooks();

}