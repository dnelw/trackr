const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.TRACKR_API_PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const helloworldRouter = require("./routes/helloworld");
app.use("/", helloworldRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
