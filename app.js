import express from "express";
import "dotenv/config";

const app = express();
app
  .use(express.json())
  .use("/missions", missionsRoutes)
  .use("/candidatures", candidaturesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
console.info(`le serveur tourne actuellement sur le port: ${PORT}`);
