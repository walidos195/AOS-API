<?php

namespace RI\AdvertBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AdvertControllerTest extends WebTestCase
{
    public function testAdd()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Add');
    }

    public function testUpdate()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Update');
    }

    public function testDelete()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Delete');
    }

    public function testGet()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/Get');
    }

    public function testList()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/List');
    }

}
