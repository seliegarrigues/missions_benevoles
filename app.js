import express from "express";
import "dotenv/config";
import missionsRoutes from "./routes/missions.routes.js";
import candidaturesRoutes from "./routes/candidatures.routes.js";
import utilisateursRoutes from "./routes/utilisateurs.routes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocumentUser from "./user.swagger.json" with { type: "json" };
import errorHandler from "./middlewares/erreur.middleware.js";

const app = express();
const DOC = "api-docs";

app.use(cookieParser());
app.use(express.json());
app.use("/missions", missionsRoutes);
app.use("/candidatures", candidaturesRoutes);
app.use("/utilisateurs", utilisateursRoutes);
app.use("/auth", authRoutes);

app.use(
  `/${DOC}/utilisateurs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentUser)
);

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {});
console.info(`le serveur tourne actuellement sur le port: ${PORT}`);
console.info(`la documentation est disponible sur le port : ${PORT}/${DOC}`);
