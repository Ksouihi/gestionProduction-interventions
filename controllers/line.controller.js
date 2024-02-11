const db = require("../models");
const Line =  db.line;
const Op = db.Sequelize.Op;


exports.createLine = (req, res) => {
    Line.create({
        name_line: req.body.name_line,
        
    })
        .then(line => {
            res.send({ message: "Line  was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.getLines = async (req, res) => {
    const lines = await Line.findAll();
    res.send({lines})
};
exports.getLine = async (req, res) => {
    const line = await Line.findByPk(req.params.id);
    res.send({line})
};

exports.updateLine = async (req, res) => {
    try {
        const lineToUpdate = await Line.findByPk(req.params.id);
        if (!lineToUpdate) {
            return res.status(404).send({ message: "La ligne à mettre à jour n'existe pas." });
        }
  
        const { name_line } = req.body;
  
        // Vérifier si un autre enregistrement de famille utilise déjà le nom spécifié (à l'exception de la famille en cours de mise à jour)
        const existingLine = await Line.findOne({
            where: {
                name_line,
                id: { [Op.not]: req.params.id }
            }
        });
  
        if (existingLine) {
            return res.status(400).send({ message: "Le nom de famille est déjà utilisé par une autre famille." });
        }
  
        // Mettre à jour la famille si aucune autre famille n'utilise le nom spécifié
        await lineToUpdate.update({ name_line });
        
        return res.send({ message: "La famille a été mise à jour avec succès." });
    } catch (err) {
      res.status(500).send({ message: err.message });
  } 

};



