export function verifTypeUtilisateur(TypeOk = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: " Utilisateur non authentifié " });
    }
    if (!TypeOk.includes(req.user.types)) {
      return res.status(403).json({ message: "cet accès n'est pas autorisé" });
    }
    next();
  };
}
