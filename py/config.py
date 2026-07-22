# UrlShortener SDK configuration


def make_config():
    return {
        "main": {
            "name": "UrlShortener",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://li.page.gd",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "index": {},
            },
        },
        "entity": {
      "index": {
        "fields": [
          {
            "active": True,
            "name": "c",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "code",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "m",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "index",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "https://google.com",
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/set/index.php",
                "parts": [
                  "api",
                  "set",
                  "index.php",
                ],
                "select": {
                  "exist": [
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
