# UrlShortener SDK exists test

import pytest
from urlshortener_sdk import UrlShortenerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UrlShortenerSDK.test(None, None)
        assert testsdk is not None
