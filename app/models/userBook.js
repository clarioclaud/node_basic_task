const User = require('./users');
const Book = require('./book');

module.exports = (sequelize, Sequalize) => {

    const UserBooks = sequelize.define("user_books", {
        
        user_id: {
            type: Sequalize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'users',          
                },
                key: 'id'
            }
        },

        book_id: {
            type: Sequalize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'books',          
                },
                key: 'id'
            }
        },

        buy_date: {
            type: Sequalize.STRING,
            allowNull: false
        },

        return_date: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        submitted_at: {
            type: Sequalize.STRING,
            allowNull: true,
        },

        is_damage: {
            type: Sequalize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        
        status: {
            type: Sequalize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }

    });

    // UserBooks.belongsTo(User, { 
    //     foreignKey: 'user_id', 
    //     as: "user" 
    // });

    // UserBooks.belongsTo(Book, { 
    //     foreignKey: 'book_id', 
    //     as: "book" 
    // });

    // UserBooks.associate = (models) => {
    //     UserBooks.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' })
    // }

    return UserBooks;
};