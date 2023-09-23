const express = require('express');
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const connection = require("./Config/db");
const registerRoutes = require("./Router/register.router");
const signInRoute = require("./Router/signin.router");
const contactUsRouter = require("./Router/contactus.router");


app.use(cors());
app.use(express.json());
app.use('/register', registerRoutes);
app.use("/signin",signInRoute);
app.use("/contactus",contactUsRouter)

app.listen(port, async() => {
    try {
        await connection;
        console.log("Connected to db");
      } catch (err) {
        console.log({ message: "Failed to connect Database", err });
      }
});
