const mongoose = require("mongoose");


const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    }, 
    city:{
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    }
  },
  {
    timeTamps: true,
  }
);

module.exports = mongoose.model("User",UserSchema);
