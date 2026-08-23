-- UrlShortener SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UrlShortener",
      slug = "url-shortener",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://li.page.gd",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["index"] = {},
      },
    },
    entity = {
      ["index"] = {
        ["fields"] = {
          {
            ["name"] = "C",
            ["short"] = "Status type: G for information, R for error.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "M",
            ["short"] = "Server message (present on error).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "code",
            ["short"] = "The shortened URL (present on success).",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "index",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "https://google.com",
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/set/index.php",
                ["parts"] = {
                  "api",
                  "set",
                  "index.php",
                },
                ["select"] = {
                  ["exist"] = {
                    "url",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
