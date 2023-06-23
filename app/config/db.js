const mongoose = require("mongoose");
const { MONGO_PROD_URL } = process.env;
exports.connect = async () => {
  try {
    const dbConnn = await mongoose.connect(MONGO_PROD_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database ${dbConnn.connections[0].name} `);
  } catch (err) {
    console.log(`Error connecting to DB : ${err.message}`);
  }
};
