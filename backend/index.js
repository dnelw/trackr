const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const helloworldRouter = require("./routes/helloworld");
app.use("/", helloworldRouter);

app.listen(4000, () => {
  console.log(`Listening on port ${port}`);
});
