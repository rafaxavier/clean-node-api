import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']
    const invalidFilds = ['email']
    try {
      for (const fild of requiredFilds) {
        if (!httpRequest.body[fild]) {
          return badRequest(new MissingParamError(fild))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      for (const fild of invalidFilds) {
        if (!isValid) {
          return badRequest(new InvalidParamError(fild))
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
