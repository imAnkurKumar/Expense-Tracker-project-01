const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const userRouter = require("./router/user");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/user", userRouter);

app.listen(4000);
