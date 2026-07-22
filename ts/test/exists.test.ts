
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UrlShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UrlShortenerSDK.test()
    equal(null !== testsdk, true)
  })

})
