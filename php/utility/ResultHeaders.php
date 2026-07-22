<?php
declare(strict_types=1);

// UrlShortener SDK utility: result_headers

class UrlShortenerResultHeaders
{
    public static function call(UrlShortenerContext $ctx): ?UrlShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
