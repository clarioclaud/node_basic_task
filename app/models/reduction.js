module.exports = (sequelize, Sequalize) => {

    const Reduction = sequelize.define("reductions", {
        
        cost_deley_per_day: {
            type: Sequalize.INTEGER,
            allowNull: false,
        },

        damage_cost: {
            type: Sequalize.INTEGER,
            allowNull: false,
        } 

    });
  

    return Reduction;
};