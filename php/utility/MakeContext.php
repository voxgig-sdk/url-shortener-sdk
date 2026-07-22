<?php
declare(strict_types=1);

// UrlShortener SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UrlShortenerMakeContext
{
    public static function call(array $ctxmap, ?UrlShortenerContext $basectx): UrlShortenerContext
    {
        return new UrlShortenerContext($ctxmap, $basectx);
    }
}
