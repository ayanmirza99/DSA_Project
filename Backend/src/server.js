import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully!" });
});

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/students", studentRoutes);

app.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
