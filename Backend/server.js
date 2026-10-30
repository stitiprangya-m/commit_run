
const app = require("./src/index");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
console.log(PORT);

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();