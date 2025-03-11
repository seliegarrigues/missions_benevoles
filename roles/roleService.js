import RoleRepository from "./RoleRepository.js";

class RoleService {
  constructor() {
    this.RoleRepository = new RoleRepository();
  }
  async isAdmin(userId, organizationId) {
    return this.RoleRepository.isAdminAssociation(userId, organizationId);
  }
}
export default RoleService;
