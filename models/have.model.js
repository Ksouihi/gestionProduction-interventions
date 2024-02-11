module.exports = (sequelize, Sequelize) => {
    const Have = sequelize.define("have", {
        id_fpy_trg: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'produit',
                key: 'id'
            }
        },
        id_ligne: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'line',
                key: 'id'
            }
        },
        cadence_h: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'have',
        timestamps: false
    });

    return Have;
};
