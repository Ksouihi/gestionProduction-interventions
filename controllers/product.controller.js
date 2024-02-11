const db = require("../models");
const Product = db.product;
const Family = db.family;
const SubFamily = db.subFamily;
const Line = db.line;
const Have = db.have;

const Op = db.Sequelize.Op;

exports.createProduct = (req, res) => {
  const {
    objective_fpy,
    objective_trg,
    name_prog,
    item_code,
    face,
    cadence,
    id_sub_family,
    id_family,
    id_line,
  } = req.body;

  // First, create the product
  Product.create({
    objective_fpy: req.body.objective_fpy,
    objective_trg: req.body.objective_trg,
    name_prog: req.body.name_prog,
    item_code: req.body.item_code,
    face: req.body.face,
    cadence: req.body.cadence,
    id_sub_family: req.body.sub_family.id,
    id_family: req.body.family.id,
    id_line: req.body.line.id,
  })
    .then((product) => {
      // Once the product is created, associate it with the line(s) in the have table
      if (id_line && id_line.length > 0) {
        console.log("adding have");
        // If there are lines associated with the product
        /*const haveEntries = id_line.map((lineId) => {
          return { id_fpy_trg: product.id, id_ligne: lineId, cadence_h: 0 }; // Adjust cadence_h according to your needs
        });*/
        Have.create({ id_fpy_trg: product.id, id_ligne: id_line, cadence_h: 0 })
        // Bulk insert the haveEntries into the have table
        //Have.bulkCreate(haveEntries)
          .then(() => {
            res.send({ message: "Product was added successfully!" });
          })
          .catch((err) => {
            res
              .status(500)
              .send({
                message:
                  "Error associating lines with the product: " + err.message,
              });
          });
      } else {
        res.send({ message: "Product was added successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error creating product: " + err.message });
    });
};

exports.getProducts = async (req, res) => {
  const products = await Product.findAll({
    include: [db.subFamily, db.line, db.family],
  });
  res.send({ products });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [db.subFamily, db.line, db.family],
  });
  res.send({ product });
};

exports.updateProduct = (req, res) => {
  Product.update(
    {
      objective_fpy: req.body.objective_fpy,
      objective_trg: req.body.objective_trg,
      name_prog: req.body.name_prog,
      item_code: req.body.item_code,
      face: req.body.face,
      cadence: req.body.cadence,
      id_sub_family: req.body.sub_family.id,
      id_family: req.body.family.id,
      id_line: req.body.line.id,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((user) => {
      res.send({ message: "product was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getProductRelations = async (req, res) => {
  const families = await Family.findAll();
  const subFamilies = await SubFamily.findAll();
  const lines = await Line.findAll();
  res.send({
    families,
    subFamilies,
    lines,
  });
};
