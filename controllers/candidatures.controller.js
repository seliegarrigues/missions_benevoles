import CandidaturesRepository from "../repositories/candidatures.repository.js";
import { verifEnumCandidature } from "../utils/verifEnumCandidature.js";

// ----- Partie Service -----
class CandidaturesService {
  constructor() {
    this.candidaturesRepository = new CandidaturesRepository();
  }

  async getCandidatures() {
    return await this.candidaturesRepository.getCandidatures();
  }

  async getCandidatureById(id) {
    if (!id) throw new Error("L'id de la candidature est requis.");
    return await this.candidaturesRepository.getCandidatureById(id);
  }

  async createCandidature({ id_miss, id_util, date_cand }) {
    return await this.candidaturesRepository.createCandidature(
      id_miss,
      id_util,
      date_cand
    );
  }

  async updateCandidatureById(id, status) {
    const validStatus = verifEnumCandidature(status);
    return await this.candidaturesRepository.updateCandidatureById(
      id,
      validStatus
    );
  }

  async deleteCandidatureById(id) {
    if (!id)
      throw new Error("L'id de la candidature est requis pour la suppression.");
    return await this.candidaturesRepository.deleteCandidatureById(id);
  }
}

// ----- Partie Controller -----
class CandidaturesController {
  constructor() {
    this.candidaturesService = new CandidaturesService();
  }

  async getCandidatures(req, res, next) {
    try {
      const candidatures = await this.candidaturesService.getCandidatures();
      res.json({
        message: "Bravo! vous pouvez consulter les éléments demandés",
        candidatures,
      });
    } catch (error) {
      console.error("Erreur dans getCandidatures:", error);
      next(error);
    }
  }

  async getCandidatureById(req, res, next) {
    try {
      const { id } = req.params;
      const candidature = await this.candidaturesService.getCandidatureById(id);
      res.status(200).json({
        message: "Bravo! voici l'élément demandé",
        candidature,
      });
    } catch (error) {
      console.error("Erreur dans getCandidatureById:", error);
      next(error);
    }
  }

  async createCandidature(req, res, next) {
    try {
      const candidature = await this.candidaturesService.createCandidature(
        req.body
      );
      res.status(201).json({
        message: "Bravo! la candidature a été correctement créée",
        candidature,
      });
    } catch (error) {
      console.error("Erreur dans createCandidature:", error);
      next(error);
    }
  }

  async updateCandidatureById(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await this.candidaturesService.updateCandidatureById(id, status);
      res.status(200).json({
        message: "Bravo! la candidature a bien été mise à jour.",
      });
    } catch (error) {
      console.error("Erreur dans updateCandidatureById:", error);
      next(error);
    }
  }

  async deleteCandidatureById(req, res, next) {
    try {
      const { id } = req.params;
      await this.candidaturesService.deleteCandidatureById(id);
      res.status(200).json({
        message: "La suppression de la candidature est correctement effectuée",
      });
    } catch (error) {
      console.error("Erreur dans deleteCandidatureById:", error);
      next(error);
    }
  }
}

export default new CandidaturesController();
