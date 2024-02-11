const controller = require("../controllers/stats.controller");

module.exports = function(app) {

    app.get("/api/stats/:name_line", controller.getStatsLine );

  

};
