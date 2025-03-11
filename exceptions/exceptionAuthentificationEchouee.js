export default class ExceptionAuthentificationEchouee extends Error {
  constructor(codeStatut, message) {
    super();
    this.message = message;
    this.codeStatut = codeStatut;
  }
}
