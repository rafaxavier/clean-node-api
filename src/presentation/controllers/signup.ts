import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-params-error'
import { ServerError } from '../errors/server-error'

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
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
