export default class UtilisateurDejaExistant extends Error {
  constructor(codeStatut, message) {
    super();
    this.message = message;
    this.codeStatut = codeStatut;
  }
}
