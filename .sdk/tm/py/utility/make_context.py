# UrlShortener SDK utility: make_context

from core.context import UrlShortenerContext


def make_context_util(ctxmap, basectx):
    return UrlShortenerContext(ctxmap, basectx)
