const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  fname: String,
  lname: String,
  email: String,
  password: String

});

module.exports = {
  user_data: mongoose.model("user_data",userSchema)
};
