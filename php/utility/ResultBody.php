<?php
declare(strict_types=1);

// UrlShortener SDK utility: result_body

class UrlShortenerResultBody
{
    public static function call(UrlShortenerContext $ctx): ?UrlShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
