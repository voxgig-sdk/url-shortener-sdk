

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UrlShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('IndexEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when URL_SHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('URL_SHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UrlShortenerSDK.test()
    const ent = testsdk.Index()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.URL_SHORTENER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"C":{"a":true,"h":"C","n":"C","r":false,"sh":"Status type: G for information, R for error.","t":"`$STRING`","key$":"C","index$":0},"M":{"a":true,"h":"M","n":"M","r":false,"sh":"Server message (present on error).","t":"`$STRING`","key$":"M","index$":1},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The shortened URL (present on success).","t":"`$STRING`","key$":"code","index$":2}},"name":"index","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/set/index.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"https://google.com","k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/set/index.php","q":{"exist":["url"]},"r":{},"s":[{"lit":"api"},{"lit":"set"},{"lit":"index.php"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"index","name__orig":"index","Name":"Index","name_":"index","name-":"index","NAME":"INDEX","index$":0}, {"active":true,"entity":"index","key$":"BasicIndexFlow","kind":"basic","name":"BasicIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"index_ref01","srcdatavar":"index_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-index_ref01"}}],"index$":0}]}, 'Index', {"GET /api/set/index.php":{"protocol":"http","operationId":"createShortLink","responses":{"200":{"description":"Result of the shorten operation. A success carries the shortened URL in `code`; an error carries a message in `M` and a status type in `C`.","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"description":"The shortened URL (present on success).","example":"https://li.page.gd/abc123","key$":"code","type":"string"},"M":{"description":"Server message (present on error).","key$":"M","type":"string"},"C":{"description":"Status type: G for information, R for error.","enum":["G","R"],"key$":"C","type":"string"}},"index$":0}}}}},"parameters":[{"name":"url","in":"query","required":true,"description":"The full URL to shorten (must start with http:// or https://).","schema":{"type":"string","format":"uri","example":"https://google.com"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let index_ref01_data = Object.values(setup.data.existing.index)[0] as any

    // LOAD
    const index_ref01_ent = client.Index()
    const index_ref01_match_dt0: any = {}
    const index_ref01_data_dt0 = (await index_ref01_ent.load(index_ref01_match_dt0)).data()
    assert(null != index_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/index/IndexTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UrlShortenerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['index01','index02','index03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'URL_SHORTENER_TEST_INDEX_ENTID': idmap,
    'URL_SHORTENER_TEST_LIVE': 'FALSE',
    'URL_SHORTENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['URL_SHORTENER_TEST_INDEX_ENTID']

  const live = 'TRUE' === env.URL_SHORTENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['URL_SHORTENER_TEST_INDEX_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UrlShortenerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.URL_SHORTENER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
