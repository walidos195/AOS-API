<?php

namespace RI\AdvertBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApplicationControllerTest extends WebTestCase
{
    public function testPost()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Post');
    }

    public function testView()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/View');
    }

}
