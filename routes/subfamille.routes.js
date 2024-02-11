const controller = require("../controllers/subfamille.controller");

module.exports = function(app) {
    app.post(
        "/api/famille/add",
        controller.createSub_family
    );

    app.get("/api/famille/add/:id", controller.getAddSub_familyList)
   app.get("/api/famille/add/:id", controller.getAddSub_familyById)
   app.get("/api/subfamily", controller.getAddSub_familyList)

}; 
