import OrganizationRepository from "./organizationRepository.js";
import ArgumentRequiredException from "../../exceptions/argumentRequis.js";

class OrganizationServiceController {
  constructor() {
    // On instancie le repository pour accéder aux données
    this.organizationRepository = new OrganizationRepository();
  }

  // Méthode de service : encapsule la logique métier
  async createOrganizationWithAdminService(organizationData, adminUserId) {
    if (!adminUserId) throw new ArgumentRequiredException(400, "id Required");

    // Créer l'organisation
    const organization = await this.organizationRepository.create(
      organizationData
    );

    // Ajouter l'utilisateur en tant qu'admin
    await this.organizationRepository.addUserToOrganization(
      adminUserId,
      organization.id,
      "admin"
    );

    return organization;
  }

  // Méthode de contrôleur : gère la requête HTTP
  async createOrganizationWithAdmin(req, res, next) {
    const { name, description } = req.body;
    try {
      const organization = await this.createOrganizationWithAdminService(
        { name, description },
        req.user.id
      );
      res.status(201).json(organization);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default OrganizationServiceController;
