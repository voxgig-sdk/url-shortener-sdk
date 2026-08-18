# UrlShortener SDK configuration

module UrlShortenerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "UrlShortener",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://li.page.gd",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "index" => {},
        },
      },
      "entity" => {
        "index" => {
          "fields" => [
            {
              "name" => "C",
              "type" => "`$STRING`",
            },
            {
              "name" => "M",
              "type" => "`$STRING`",
            },
            {
              "name" => "code",
              "type" => "`$STRING`",
            },
          ],
          "name" => "index",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "https://google.com",
                        "kind" => "query",
                        "name" => "url",
                        "orig" => "url",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/set/index.php",
                  "parts" => [
                    "api",
                    "set",
                    "index.php",
                  ],
                  "select" => {
                    "exist" => [
                      "url",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UrlShortenerFeatures.make_feature(name)
  end
end
