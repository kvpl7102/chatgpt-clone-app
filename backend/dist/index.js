import express from "express";
const app = express();
// Middlewares
app.use(express.json());
/*-------------------------Routes---------------------------*/
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Connection and listeners
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map