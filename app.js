import express from "express";
import "dotenv/config";
import missionsRoutes from "./routes/missions.routes.js";
import candidaturesRoutes from "./routes/candidatures.routes.js";

const app = express();
app.use(express.json());
app.use("/missions", missionsRoutes);
app.use("/candidatures", candidaturesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
console.info(`le serveur tourne actuellement sur le port: ${PORT}`);
