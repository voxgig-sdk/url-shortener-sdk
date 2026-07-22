# UrlShortener SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UrlShortenerUtility.registrar = ->(u) {
  u.clean = UrlShortenerUtilities::Clean
  u.done = UrlShortenerUtilities::Done
  u.make_error = UrlShortenerUtilities::MakeError
  u.feature_add = UrlShortenerUtilities::FeatureAdd
  u.feature_hook = UrlShortenerUtilities::FeatureHook
  u.feature_init = UrlShortenerUtilities::FeatureInit
  u.fetcher = UrlShortenerUtilities::Fetcher
  u.make_fetch_def = UrlShortenerUtilities::MakeFetchDef
  u.make_context = UrlShortenerUtilities::MakeContext
  u.make_options = UrlShortenerUtilities::MakeOptions
  u.make_request = UrlShortenerUtilities::MakeRequest
  u.make_response = UrlShortenerUtilities::MakeResponse
  u.make_result = UrlShortenerUtilities::MakeResult
  u.make_point = UrlShortenerUtilities::MakePoint
  u.make_spec = UrlShortenerUtilities::MakeSpec
  u.make_url = UrlShortenerUtilities::MakeUrl
  u.param = UrlShortenerUtilities::Param
  u.prepare_auth = UrlShortenerUtilities::PrepareAuth
  u.prepare_body = UrlShortenerUtilities::PrepareBody
  u.prepare_headers = UrlShortenerUtilities::PrepareHeaders
  u.prepare_method = UrlShortenerUtilities::PrepareMethod
  u.prepare_params = UrlShortenerUtilities::PrepareParams
  u.prepare_path = UrlShortenerUtilities::PreparePath
  u.prepare_query = UrlShortenerUtilities::PrepareQuery
  u.result_basic = UrlShortenerUtilities::ResultBasic
  u.result_body = UrlShortenerUtilities::ResultBody
  u.result_headers = UrlShortenerUtilities::ResultHeaders
  u.transform_request = UrlShortenerUtilities::TransformRequest
  u.transform_response = UrlShortenerUtilities::TransformResponse
}
