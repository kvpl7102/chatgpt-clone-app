import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Connection and listeners
const PORT = process.env.PORT || 3000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
});
//# sourceMappingURL=index.js.map