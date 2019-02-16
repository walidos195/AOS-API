<?php

namespace RI\InfoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('RIAdvertBundle:Advert');
        $listAdverts = $repository->findBy(array(), array('date' => 'DESC'),5);
        
        


        return $this->render('RIInfoBundle:Default:index.html.twig',
        array(
                    'list' => $listAdverts
        ));
    }
    
}
