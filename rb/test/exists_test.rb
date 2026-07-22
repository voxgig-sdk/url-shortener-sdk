# UrlShortener SDK exists test

require "minitest/autorun"
require_relative "../UrlShortener_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UrlShortenerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
