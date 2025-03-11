export default class ExceptionArgumentRequis extends Error {
  constructor(codeStatut, message) {
    super();
    this.codeStatut = codeStatut;
    this.message = message;
  }
}
