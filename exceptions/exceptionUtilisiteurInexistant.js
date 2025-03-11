export default class ExceptionUtilisateurInexistant extends Error {
  constructor(codeStatut, message) {
    super();
    this.message = message;
    this.codeStatut = codeStatut;
  }
}
