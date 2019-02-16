<?php

namespace RI\InfoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PresentationController extends Controller
{
    public function HomeAction()
    {
        return $this->render('RIInfoBundle:Presentation:home.html.twig', array(
            // ...
        ));
    }

    public function AproposAction()
    {
        return $this->render('RIInfoBundle:Presentation:apropos.html.twig', array(
            // ...
        ));
    }
    public function ContactAction()
    {
        return $this->render('RIInfoBundle:Presentation:contact.html.twig', array(
            // ...
        ));
    }

}
