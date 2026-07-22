# UrlShortener SDK feature factory

from feature.base_feature import UrlShortenerBaseFeature
from feature.test_feature import UrlShortenerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UrlShortenerBaseFeature(),
        "test": lambda: UrlShortenerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
