# UrlShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UrlShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      UrlShortenerBaseFeature.new
    when "test"
      UrlShortenerTestFeature.new
    else
      UrlShortenerBaseFeature.new
    end
  end
end
