# UrlShortener SDK utility: make_context

from projectname_sdk.core.context import UrlShortenerContext


def make_context_util(ctxmap, basectx):
    return UrlShortenerContext(ctxmap, basectx)
