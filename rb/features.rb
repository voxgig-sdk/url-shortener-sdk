# UrlShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UrlShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      UrlShortenerBaseFeature.new
    when "ratelimit"
      UrlShortenerRatelimitFeature.new
    when "retry"
      UrlShortenerRetryFeature.new
    when "test"
      UrlShortenerTestFeature.new
    when "timeout"
      UrlShortenerTimeoutFeature.new
    else
      UrlShortenerBaseFeature.new
    end
  end
end
