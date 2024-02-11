const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.userRole = require("../models/userRole.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model")(sequelize, Sequelize);
db.family = require("../models/family.model")(sequelize, Sequelize);
db.subFamily = require("../models/subFamily.model")(sequelize, Sequelize);
db.line = require("../models/line.model")(sequelize, Sequelize);
db.intervention = require("../models/intervention.model")(sequelize, Sequelize);
db.typeIntervention = require("../models/typeIntervention.model")(sequelize, Sequelize);
db.vision_synchro = require("../models/vision_synchro.model")(sequelize,Sequelize);
db.vision_sanction = require("../models/vision_sanction.model.js")(sequelize,Sequelize);
db.have=require("../models/have.model.js")(sequelize,Sequelize);

db.user.belongsTo(db.userRole, { foreignKey: 'role_id' });
db.userRole.hasMany(db.user, { foreignKey: 'role_id' });


db.subFamily.belongsTo(db.family, { foreignKey: 'id_family' });
db.family.hasMany(db.subFamily, { foreignKey: 'id_family' });

db.product.belongsTo(db.family, { foreignKey: 'id_family' });
db.family.hasMany(db.product, { foreignKey: 'id_family' });
db.product.belongsTo(db.subFamily, { foreignKey: 'id_sub_family' });
db.subFamily.hasMany(db.product, { foreignKey: 'id_sub_family' });

db.product.belongsTo(db.line, { foreignKey: 'id_line' });
db.line.hasMany(db.product, { foreignKey: 'id_line' });

db.intervention.belongsTo(db.line, { foreignKey: 'id_line' });
db.line.hasMany(db.intervention, { foreignKey: 'id_line' });

db.intervention.belongsTo(db.typeIntervention, { foreignKey: 'id_type_intervention' });
db.typeIntervention.hasMany(db.intervention, { foreignKey: 'id_type_intervention' });



//db.product.belongsTo(db.have, { foreignKey: 'id_'});
db.have.belongsTo(db.product, { foreignKey:'id_fpy_trg'});
db.product.hasMany(db.have, { foreignKey:'id_fpy_trg'});

module.exports = db;