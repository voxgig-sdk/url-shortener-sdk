
import { Context } from './Context'


class UrlShortenerError extends Error {

  isUrlShortenerError = true

  sdk = 'UrlShortener'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UrlShortenerError
}

