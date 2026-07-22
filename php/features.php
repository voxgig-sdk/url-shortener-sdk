<?php
declare(strict_types=1);

// UrlShortener SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UrlShortenerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UrlShortenerBaseFeature();
            case "test":
                return new UrlShortenerTestFeature();
            default:
                return new UrlShortenerBaseFeature();
        }
    }
}
