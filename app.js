const express = require("express");
 const bodyParser = require("body-parser");
const apiRouters = require("./routers/apiRouters")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended:true}));

app.use(apiRouters)


const port = 6000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
