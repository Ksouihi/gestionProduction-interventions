module.exports = (sequelize, Sequelize) => {
    const Vision_synchro = sequelize.define("vision_synchro", {
        smd_line: {
            type: Sequelize.STRING
        },
        card_bar_code: {
            type: Sequelize.STRING
        },
        face: {
            type: Sequelize.STRING
        },
        anomaly_br: {
            type: Sequelize.INTEGER
        },
        anomaly_ar: {
            type: Sequelize.INTEGER
        },
        panel_bar_code: {
            type: Sequelize.INTEGER
        },panel_numeric_date: {
            type: Sequelize.STRING
        },
        panel_numeric_timestamp: {
            type: Sequelize.DATE
        },
        product_name: {
            type: Sequelize.STRING
        },
        lane_number: {
            type: Sequelize.INTEGER
        },
        check_team: {
            type: Sequelize.INTEGER
        },
        team: {
            type: Sequelize.STRING
        },
        date_assoc: {
            type: Sequelize.DATE
        },
    
    }, {
        tableName: 'vision_synchro',
        timestamps: false
    });
    
    return Vision_synchro;
};