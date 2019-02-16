<?php

namespace RI\InfoBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PresentationControllerTest extends WebTestCase
{
    public function testHome()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Home');
    }

    public function testApropos()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Apropos');
    }

}
