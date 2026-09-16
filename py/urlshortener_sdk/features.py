# UrlShortener SDK feature factory

from urlshortener_sdk.feature.base_feature import UrlShortenerBaseFeature
from urlshortener_sdk.feature.ratelimit_feature import UrlShortenerRatelimitFeature
from urlshortener_sdk.feature.retry_feature import UrlShortenerRetryFeature
from urlshortener_sdk.feature.test_feature import UrlShortenerTestFeature
from urlshortener_sdk.feature.timeout_feature import UrlShortenerTimeoutFeature


_FEATURES = {
    "base": lambda: UrlShortenerBaseFeature(),
    "ratelimit": lambda: UrlShortenerRatelimitFeature(),
    "retry": lambda: UrlShortenerRetryFeature(),
    "test": lambda: UrlShortenerTestFeature(),
    "timeout": lambda: UrlShortenerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
