const db = require('../models');
const Reduction = db.reductions;
const Op = db.Sequalize.Op;

class Reductions{

    create = async (req, res) => {
        
        const {cost_deley_per_day, damage_cost} = req.body;
        
        const reductionss = {
            cost_deley_per_day,
            damage_cost
        }

        await Reduction.create(reductionss)

        .then(result => {

            return res.status(200).send({
                message: 'Reduction Successfully',
                data: result
            })

        }).catch(err => {

            return res.status(500).send({
                message: err.message,
            })

        });
    }

    updateReduction = async (req, res) => {

        if (!req.params.id) {

            return res.status(404).send({

                message: 'id is required'

            })
        }

        const reduction = await Reduction.findOne({ where: {id: req.params.id }});

        if (reduction) {
            
            const reductionupdate = {
               cost_deley_per_day : req.body.cost_deley_per_day,
               damage_cost: req.body.damage_cost
            };

            const update = await Reduction.update(reductionupdate,{
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

    getReduction = async (req, res) => {

        const books = await Reduction.findAll().then(result => {

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

}

module.exports = new Reductions();