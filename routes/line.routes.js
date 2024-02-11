const controller = require("../controllers/line.controller");

module.exports = function(app) {
    app.post(
        "/api/lines",
        controller.createLine
    );

    app.get("/api/lines", controller.getLines)
    app.get("/api/lines/:id", controller.getLine)
    app.put("/api/lines/:id", controller.updateLine)

};
