module.exports = (sequelize, Sequalize) => {
    const Roles = sequelize.define('roles',{
        name: {
            type: Sequalize.STRING,
            allowNull: false,
        },
        role_id: {
            type: Sequalize.INTEGER,
            allowNull: false,
        }
    });

    return Roles;
};