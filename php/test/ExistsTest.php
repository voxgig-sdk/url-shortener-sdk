<?php
declare(strict_types=1);

// UrlShortener SDK exists test

require_once __DIR__ . '/../urlshortener_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UrlShortenerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
