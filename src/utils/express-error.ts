export class ExpressError extends Error {
  statusCode: number
  constructor(code: number, message: string) {
    super()
    this.message = message
    this.statusCode = code
  }
}
