const db = require("../models");
const Family = db.family;
const Op = db.Sequelize.Op;

exports.createFamily = (req, res) => {
  Family.findOne({
    where: {
      name_family: req.body.name_family
    },
})
    .then(family => {
      console.log('here')  

           if (family) {
            return res.status(404).send({ message: "le nom de famille est déja utilisé." });
        }
        Family.create({
          name_family: req.body.name_family
      })
          .then(user => {
              res.send({ message: "family was registered  successfully" });
          })
        
         

               })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
    
    };
    
//ajout une contrainte si famille déja exixte 

exports.getFamilies = async (req, res) => {  
  const familles = await Family.findAll();
    res.send(familles)
};
exports.updateFamilies = async (req, res) => {
  try {
      const familyToUpdate = await Family.findByPk(req.params.id);
      if (!familyToUpdate) {
          return res.status(404).send({ message: "La famille à mettre à jour n'existe pas." });
      }

      const { name_family } = req.body;

      // Vérifier si un autre enregistrement de famille utilise déjà le nom spécifié (à l'exception de la famille en cours de mise à jour)
      const existingFamily = await Family.findOne({
          where: {
              name_family,
              id: { [Op.not]: req.params.id }
          }
      });

      if (existingFamily) {
          return res.status(400).send({ message: "Le nom de famille est déjà utilisé par une autre famille." });
      }

      // Mettre à jour la famille si aucune autre famille n'utilise le nom spécifié
      await familyToUpdate.update({ name_family });
      
      return res.send({ message: "La famille a été mise à jour avec succès." });
  } catch (err) {
    res.status(500).send({ message: err.message });
}
};


exports.getFamily = async (req, res) => {  
  const family = await Family.findByPk(req.params.id);
  res.send({family})
};
