-- UrlShortener SDK error

local UrlShortenerError = {}
UrlShortenerError.__index = UrlShortenerError


function UrlShortenerError.new(code, msg, ctx)
  local self = setmetatable({}, UrlShortenerError)
  self.is_sdk_error = true
  self.sdk = "UrlShortener"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UrlShortenerError:error()
  return self.msg
end


function UrlShortenerError:__tostring()
  return self.msg
end


return UrlShortenerError
