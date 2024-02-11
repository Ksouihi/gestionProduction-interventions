module.exports = (sequelize, Sequelize) => {
    const vision_sanction = sequelize.define("vision_sanction", {
        anomaly_br: {
            type: Sequelize.INTEGER
        },
        anomaly_ar: {
            type: Sequelize.INTEGER
        },
        sanction: {
            type: Sequelize.STRING
        },
        status_aoi: {
            type: Sequelize.STRING
        },
        sanction: {
            type: Sequelize.STRING
        },
    }, {
        tableName: 'vision_sanction',
        timestamps: false
    });

    return vision_sanction;
};

