const db = require("../models");
const SubFamily = db.subFamily;
const Family = db.family;
const AddSub_family = db.subFamily;
const Op = db.Sequelize.Op;

exports.createSub_family = (req, res) => {
    SubFamily.create({
        name_sub_family: req.body.name_sub_family,
        id_family: req.body.id_family
    })
    .then(user => {
        res.send({ message: "sub family was registered successfully" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAddSub_familyList = async (req, res) => {
    try {
        const addSub_familyList = await AddSub_family.findAll();
        res.send(addSub_familyList);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAddSub_familyById = async (req, res) => {
    try {
        const addSub_family = await AddSub_family.findByPk(req.params.id, { include: [SubFamily, Family] });
        res.send({ addSub_family });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


