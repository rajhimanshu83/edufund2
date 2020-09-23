const moment = require("moment");
const colors = require("colors");

const logger = (req, res, next) => {
  console.log(
    colors.cyan(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
  );
  // http://localhost:5000/ :  2019-06-23T21:18:43+05:30
  next();
};

module.export = logger;