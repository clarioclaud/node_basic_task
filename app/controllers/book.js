const db = require('../models');
const Book = db.books;
const Op = db.Sequalize.Op;
const url = require('url');

class Books{

    create = async (req, res) => {
        const {title, author, description, image} = req.body;
        
        const book = {
            title,
            author,
            description,
            image: req.file.filename
        }

        await Book.create(book)

        .then(result => {

            //result.image = 'http://localhost:3000/'+result.image;

            return res.status(200).send({
                message: 'Book Added Successfully',
                data: result
            })

        }).catch(err => {

            return res.status(500).send({
                message: err.message,
            })

        });
    }

    updateBook = async (req, res) => {

        if (!req.params.id) {

            return res.status(404).send({

                message: 'id is required'

            })
        }

        const { title, author, description, image} = req.body;

        const book = await Book.findOne({ where: {id: req.params.id }});

        if (book) {
            
            const bookupdate = {
                title,
                author,
                description,
                image: req.file.filename
            };

            const update = await Book.update(bookupdate,{
                where: {id: req.params.id}
            });

            if (update) {

                return res.status(200).send({
                    message: 'Updated'
                })

            } else {

                return res.status(500).send({
                    message: 'Book is not updated'
                })
            }
        }else {

            return res.status(404).send({
                message: 'Book is not found'
            })
        }
    }

    bookOne = async (req, res) => {

        const book = await Book.findOne({ where: {id: req.params.id }});

        if (book) {
            
            return res.status(200).send({
                message: 'Details Fetched',
                data: book
            });

        } else {

            return res.status(404).send({
                message: 'Book not found'
            });
        }
    }

    bookAll = async (req, res) => {

        const books = await Book.findAndCountAll({
            order: [
                ['id', 'DESC']
            ]
        }).then(result => {

            return res.status(200).send({
                message: 'Details Fetched',
                data: result
            });

        }).catch(err => {

            return res.status(404).send({
                message: err.message
            });

        });

    }


    bookDelete = async (req, res) => {
        
        const book = await Book.findOne({ where: {id: req.params.id }});

        if (book) {
            await book.destroy().then(data => {
            //await book.destroy({ force:true }).then(data => {

                return res.status(200).send({
                    message: 'Book Deleted',
                });

            }).catch(err => {

                return res.status(500).send({
                    message: err.message,
                });

            });
        }

    }

    bookAllSearch = async (req, res) => {

        if (req.query.search) {
            
            var search = req.query.search;

        }else{

            var search = ''
        }

        await Book.findAll({ where: {
                [Op.or]: {
                    title: { [Op.like]: '%' + search + '%' },
                    author: { [Op.like]: '%' + search + '%' }
                }
            }
        }).then(result => {

            return res.status(200).send({
                message: 'Book Fetched',
                data: result
            });

        }).catch(err => {

            return res.status(200).send({
                message: err.message,
            });
        });
    }
}

module.exports = new Books();