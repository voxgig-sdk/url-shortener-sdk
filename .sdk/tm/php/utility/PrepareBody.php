<?php
declare(strict_types=1);

// UrlShortener SDK utility: prepare_body

class UrlShortenerPrepareBody
{
    public static function call(UrlShortenerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
