export default function errorHandler(err, req, res, next) {
  console.error(" Erreur détectée :", err);
  res
    .status(500)
    .json({ message: "Erreur interne du serveur", error: err.message });
}
