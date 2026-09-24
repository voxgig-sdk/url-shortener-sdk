
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UrlShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UrlShortenerSDK.test()
    equal(testsdk instanceof UrlShortenerSDK, true,
      'UrlShortenerSDK.test() must return a client synchronously')
  })

})
