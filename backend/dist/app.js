import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
config(); // Load environment variables from .env file
const app = express();
// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.use(morgan("dev")); // Remove this in production
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
export default app;
//# sourceMappingURL=app.js.map