const db = require("../models");
const Line = db.line;
const vision_synchro = db.vision_synchro;
const vision_sanction = db.vision_sanction;
const Op = db.Sequelize.Op;

exports.getStatsLine = async (req, res) => {
  const smd_line = req.params.name_line;
  const visions = await vision_synchro.findAll({ where: { smd_line } });

  const passedTimestamp = new Date();
  passedTimestamp.setHours(passedTimestamp.getHours());

  const currentTimestamp = new Date();
  currentTimestamp.setHours(currentTimestamp.getHours() + 1);

  const counts = await vision_synchro.count({
    where: {
      panel_numeric_timestamp: {
        [Op.between]: [
          passedTimestamp, // start of the current hour
          currentTimestamp, // start of the next hour
        ],
      },
      smd_line,
    },
  });

  const results = {
    PASS: 0,
    FAIL: 0,
    DNR: 0,
  };

  for (const vision of visions) {
    const anomaly_br = vision.dataValues.anomaly_br;
    const san = await vision_sanction.findOne({ where: { anomaly_br } });

    switch (san.dataValues.sanction) {
      case "PASS":
        results.PASS++;
        break;
      case "FAIL":
        results.FAIL++;
        break;
      case "DNR":
        results.DNR++;
        break;
    }
  }

  res.send({
    visions: visions.length,
    counts,
    results,
  });
};
