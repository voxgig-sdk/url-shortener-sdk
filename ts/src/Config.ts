
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UrlShortener',
        slug: "url-shortener",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://li.page.gd",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      index: {
      },

    }
  }


  entity = {
    "index": {
      "fields": [
        {
          "name": "C",
          "short": "Status type: G for information, R for error.",
          "type": "`$STRING`"
        },
        {
          "name": "M",
          "short": "Server message (present on error).",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "short": "The shortened URL (present on success).",
          "type": "`$STRING`"
        }
      ],
      "name": "index",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "https://google.com",
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/set/index.php",
              "parts": [
                "api",
                "set",
                "index.php"
              ],
              "select": {
                "exist": [
                  "url"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

