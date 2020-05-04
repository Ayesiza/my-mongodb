const jwt = require("jsonwebtoken");
const db = require("../config/connect");
const User = require("../models/Users");
const dotenv = require ('dotenv');

dotenv.config();

db.once("open", () => {
  console.log("Connection Successful... !");
});

db.on("error", (err) => {
  console.log(err);
});

module.exports = {
  signUp: (req, res) => {
    const { userName, password, firstName, lastName } = req.body;
  
    User.findOne({userName: req.body.userName})
      .then((user) => {
        if (user) {
          return res.status(409).send({ message: "User already Exist" });
        } else {          
        const NewUser = new User({ userName, password, firstName, lastName });  
        const token = jwt.sign({userName,password,firstName,lastName}, process.env.SECRETE_KEY, {expiresIn:"24 hours"})
            
        NewUser.save().then(() => {
          return res
            .status(201)
            .send({ message: "Data Successifully saved", NewUser,token });
        });
      }
      })
      .catch((error) => {
        return res.status(400).send({ message: error.message });
      });
  },
  Login: (req, res) => {
    const { userName, password } = req.body;
    User.findOne({ userName: userName, password: password })
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .send({ message: "You have successfully logged in ",user });
        } else {
          return res.status(400).send({ error: "User not found" });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error: error });
      });
  },
};
