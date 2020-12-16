export class HTTPError extends Error {
  code: number
  constructor(message?: string, code?: number){
    super(message)
    this.code = code || 500
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class InternalServerError extends HTTPError {
  constructor(message: string) {
    super(message, 500)
  }
}
export class PreconditionError extends HTTPError {
  constructor(message: string) {
    super(message, 412)
  }
}