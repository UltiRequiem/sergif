export class KumeroError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KumeroError";
  }
}
