module.exports = (sequelize, Sequalize) => {

    const Book = sequelize.define("books", {
        
        title: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        author: {
            type: Sequalize.STRING,
            allowNull: false,
        },

        description: {
            type: Sequalize.TEXT,
            allowNull: false,
        },

        image: {
            type: Sequalize.TEXT,
            allowNull: false,
            get() {
                const url = this.getDataValue('image');
                return url ? 'http://localhost:3000/'+url : '';
            }
        },     

    },
    {
        paranoid: true,
    
        //deletedAt: 'destroyTime' //custom name for deletedAt
    });
  

    return Book;
};