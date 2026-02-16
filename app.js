const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("./config/env");

const cookieParser = require('cookie-parser');
const {errorMiddleware} = require("./middlewares/errorMiddleware");
const authRouter= require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/auth",authRouter);
app.use(taskRouter);

app.use(errorMiddleware);
module.exports = app;
