const app = require("./app.js");
const connectToDb = require("./config/db.js");

connectToDb();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})