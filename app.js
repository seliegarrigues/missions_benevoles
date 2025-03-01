import express from "express";
import "dotenv/config";
import missionsRoutes from "./routes/missions.routes.js";
import candidaturesRoutes from "./routes/candidatures.routes.js";
import utilisateursRoutes from "./routes/utilisateurs.routes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/missions", missionsRoutes);
app.use("/candidatures", candidaturesRoutes);
app.use("/utilisateurs", utilisateursRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
console.info(`le serveur tourne actuellement sur le port: ${PORT}`);
