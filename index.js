const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const ConnectDB = require("./config/db.js");

const port = process.env.PORT || 4321;



 app.listen(port, async () => {
    await ConnectDB();
    console.log(`Server running on ${port}`);
});


