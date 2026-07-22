# UrlShortener SDK utility: make_context
require_relative '../core/context'
module UrlShortenerUtilities
  MakeContext = ->(ctxmap, basectx) {
    UrlShortenerContext.new(ctxmap, basectx)
  }
end
