const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  dob: String,
  sex: String,
  email: String,
  password: String

});

const activeUser = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  sid: String,
  email: String

});

const fileData = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  path: String,
  date: Date,
  email: String

});

module.exports = {
  user_data: mongoose.model("user_data",userSchema),
  active_user: mongoose.model("active_user",activeUser),
  file_data: mongoose.model("file_data",fileData)
};
