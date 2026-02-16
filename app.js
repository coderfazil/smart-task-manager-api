const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("./config/env");

const cookieParser = require('cookie-parser');
const {errorMiddleware} = require("./middlewares/errorMiddleware");
const authRouter= require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize")


app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(helmet());

app.use(
    mongoSanitize({
        replaceWith: "_"
    })
);
app.use(morgan("dev"));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(cookieParser());

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/auth",authRouter);
app.use(taskRouter);
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});


app.use(errorMiddleware);
module.exports = app;
