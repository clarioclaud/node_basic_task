module.exports = (sequelize, Sequalize) => {

    const User = sequelize.define("users", {
        
        first_name: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        last_name: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        email: {
            type: Sequalize.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        mobile: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        role_id: {
            type: Sequalize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'roles',          
                },
                key: 'id'
            }
        },       

    },

    ///hidden the password in response 
    options = {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },

        scopes: {
            withHashedPassword: {
                attributes: { }
            }
        }
    }
        
    );

    return User;
};