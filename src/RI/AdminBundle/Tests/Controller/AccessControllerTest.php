<?php

namespace RI\AdminBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AccessControllerTest extends WebTestCase
{
    public function testLogin()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Login');
    }

    public function testConfig()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Config');
    }

}
