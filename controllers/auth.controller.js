import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UtilisateursRepository from "../repositories/utilisateurs.repository.js";

const utilisateursRepository = new UtilisateursRepository();

export async function inscription(req, res, next) {
  const { email, username, password, types } = req.body;
  if (!email || !username || !password) {
    return res
      .status(400)
      .json("Désolé il y a une erreur de données manquantes");
  }
  try {
    const utilisateurExist = await utilisateursRepository.getUtilisateurByEmail(
      email.trim()
    );
    if (utilisateurExist) {
      return res
        .status(400)
        .json(
          "Erreur, enregistrement impossible car cet utilisateur existe déjà"
        );
    }
    const hashedPassword = await argon2.hash(password);
    const userType = types || "benevoles";
    await utilisateursRepository.createUtilisateur(
      userType,
      username.trim(),
      email.trim(),
      hashedPassword
    );
    res.status(200).json("Bravo, l'inscription s'est bien déroulé");
  } catch (err) {
    console.error("Erreur lors de l'inscription : ", err);
    next(err);
  }
}

export async function connexion(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json("Erreur : l'email et le mot de passe sont requis");
  }
  try {
    const utilisateur = await utilisateursRepository.getUtilisateurByEmail(
      email.trim()
    );
    if (!utilisateur) {
      return res.status(400).json("Erreur : l'utilisateur non trouvé");
    }
    if (await argon2.verify(utilisateur.mdp, password.trim())) {
      const token = jwt.sign(
        { id: utilisateur.id_util, types: utilisateur.types },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("cookieToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json("Connexion Réussie");
    } else {
      res.status(401).json("Mot de passe incorrect");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    next(error);
  }
}

export function deconnexion(req, res, next) {
  try {
    res.clearCookie("cookieToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.json({ message: "Au revoir : déconnexion résusie" });
  } catch (error) {
    next(error);
  }
}

export function profil(req, res, next) {
  try {
    res.json({
      message: "Bienvenue dans votre profil",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
}
