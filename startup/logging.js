require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");

module.exports = function () {
  winston.createLogger({
    exceptionHandlers: [
      new winston.transports.File({
        filename: "uncoughtException.log",
      }),
      new winston.transports.Console(),
    ],
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "info",
    })
  );
};
