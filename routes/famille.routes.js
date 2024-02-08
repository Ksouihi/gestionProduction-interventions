const controller = require("../controllers/famille.controller");

module.exports = function(app) {
    app.post(
        "/api/famille",
        controller.createFamily
    );
   app.get("/api/famille", controller.getFamilies)
   app.put("/api/famille/:id", controller.updateFamilies)
   app.get("/api/famille/:id", controller.getFamily)
   

}; 
