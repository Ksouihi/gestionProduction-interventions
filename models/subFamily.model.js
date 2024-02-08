module.exports = (sequelize, Sequelize) => {
    const Sub_Family = sequelize.define("sub_family", {
        name_sub_family: {
            type: Sequelize.STRING
        },
     
    }, {
        tableName: 'sub_family',
        timestamps: false
    });

    return Sub_Family;
};