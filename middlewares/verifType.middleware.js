const verifTypeUtilisateur = async (req, res, next) => {
  const typeOk = req.user.role;
  if (typeOk !== "associations") {
    return res.status(401).json({ message: " Utilisateur non authentifié " });
  }
  next();
};
export { verifTypeUtilisateur };
