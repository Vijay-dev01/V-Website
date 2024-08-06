const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URL)
    .then((con) => {
      console.log(`Mongoose is connected to the host: ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
