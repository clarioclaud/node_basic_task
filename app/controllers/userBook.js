const db = require('../models');
const momentTime = require('moment');
const Userbook = db.userBooks;
const Book = db.books;
const User = db.users;
const Reduction = db.reductions;
const Op = db.Sequalize.Op;

class UserBooks{

    create = async (req, res) => {
        const {user_id, book_id, return_date} = req.body;
        
        const book = await Book.findOne({ where: {id: req.body.book_id}});

        if (!book) {

            return res.status(404).send({
                message: 'Book not found',
            });

        }

        const userbook = {
            user_id: req.body.user_id,
            book_id: req.body.book_id,
            buy_date: momentTime().format('YYYY-MM-D'),
            return_date: req.body.return_date
        }

        await Userbook.create(userbook)

        .then(result => {

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

    updateUserBook = async (req, res) => {

        if (!req.params.id) {

            return res.status(404).send({

                message: 'id is required'

            })
        }

        const book = await Userbook.findOne({ where: {id: req.params.id }});

        if (book) {
            
            const bookupdate = {
               submitted_at : momentTime().format('YYYY-MM-D h:mm:ss a'),
               status: 1,
               is_damage: req.params.is_damage
            };

            const update = await Userbook.update(bookupdate,{
                where: {id: req.params.id}
            });

            if (update) {

                return res.status(200).send({
                    message: 'Updated'
                })

            } else {

                return res.status(500).send({
                    message: 'Updated Failed'
                })
            }
        }else {

            return res.status(404).send({
                message: 'Search Id is not found'
            })
        }
    }

    UserBookOne = async (req, res) => {

        const userbook = await Userbook.findByPk(req.params.id, {include: ['user','book']});

        const details = await Reduction.findByPk(1);

        if (userbook) {

            if(userbook.return_date < momentTime().format('YYYY-MM-D')){

                var todayDate = momentTime();

                var endDate = userbook.return_date;

                var diff = await todayDate.diff(endDate,'days');

                var delay_cost = diff * details.cost_deley_per_day;

            }else{

                var delay_cost = 0;
            }

            if(userbook.is_damage == 1){

                var damage_cost = details.damage_cost;

            } else {

                var damage_cost = 0;

            }

            return res.status(200).send({

                message: 'Details Fetched',
                data: userbook,
                due_charges: {
                    damage_charge: damage_cost,
                    delay_charge: delay_cost
                }
            });

        } else {

            return res.status(404).send({
                message: 'Details not found'
            });
        }
    }

    UserBookAll = async (req, res) => {

        const books = await Userbook.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],

            include: ['user','book']

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


    UserBookDelete = async (req, res) => {
        
        const Userbooks = await Userbook.findByPk( req.params.id );

        if (Userbooks) {

            await Userbooks.destroy().then(data => {
            //await book.destroy({ force:true }).then(data => {

                return res.status(200).send({
                    message: 'Deleted!',
                });

            }).catch(err => {

                return res.status(500).send({
                    message: err.message,
                });

            });
        }

    }

    bookAllUser = async (req, res) => {

        const Userbooks = await Userbook.findAll({where: {user_id: req.user.id}, 
                                order: [
                                    ['id', 'DESC']
                                ],
                                
                                include: ['user','book'] 
                            });

        if (Userbooks) {
            
            return res.status(200).send({
                message: 'Books Details Fetched',
                data: Userbooks
            });

        } else {

            return res.status(404).send({
                message: 'Books Details Not found',
                data: Userbooks
            });
        }
    }
}

module.exports = new UserBooks();