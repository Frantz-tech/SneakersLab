require("dotenv").config();
import express from "express";
import { router } from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://locahost:${PORT}`);
});
