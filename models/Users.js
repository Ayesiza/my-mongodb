const mongoose = require("mongoose");
const UsersSchema =require("./schemas/UsersSchema");

const Users = mongoose.model("users", UsersSchema);



module.exports = Users;

