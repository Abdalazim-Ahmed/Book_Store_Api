const asyncHandler = require('express-async-handler')
const { Author, validationCreateAuthor, validationUpdateAuthor } = require('../models/Author')


/**
 * @decs Get all authors
 * @method Get
 * @route /api/authors
 * @access public
**/
module.exports.getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find().sort({ 'firstName': -1 })
    res.status(200).json(authors)
});



/**
 * @decs Get an author By Id
 * @method GET
 * @route /api/authors/:id
 * @access public
**/
module.exports.getAuthorById = asyncHandler(async (req, res) => {
    const getAuthor = await Author.findById(req.params.id)
    res.status(200).json(getAuthor)
});



/**
 * @decs Create New author
 * @method POST
 * @route /api/authors
 * @access private
**/
module.exports.createAuthor = asyncHandler(async (req, res) => {
    const { error } = validationCreateAuthor(req.body)
    if (error) { return res.status(404).json(error['message']) }

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        image: req.body.image
    })

    const result = await author.save()
    res.status(201).json(result);
});


/**
 * @decs Update author by id
 * @method PUT
 * @route /api/authors/:id
 * @access private
**/
module.exports.updateAuthor = asyncHandler(async (req, res) => {
    const { error } = validationUpdateAuthor(req.body)
    if (error) { return res.status(404).json(error['message']) }

    const id = req.params.id;
    const author = await Author.findByIdAndUpdate(id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            image: req.body.image
        }
    },
        {
            new: true
        })
    res.status(200).json(author)
})


/**
 * @decs Delete author by id
 * @method DELETE
 * @route /api/authors/:id
 * @access private
**/
module.exports.deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json("Author has been deleted!")
    } else {
        res.status(404).json({ massege: "Author Not Found" })
    }
});