<?php

namespace RI\AdvertBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use RI\AdvertBundle\Entity\Application;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplicationController extends Controller {
    /* Méthode pour Candidater
     * Methode GET
     * retour l'etat de l'annonce   
     */

    public function ngPostAction(Request $request) {
        $error;
        $methode = $request->getMethod();
        $idadvert = $request->query->get('idadvert');
        $username = $request->query->get('username');

        if (intval($idadvert) != 0) {
            $etat = false;
            $em = $this->getDoctrine()->getManager();
            $rep = $em->getRepository('RIAdvertBundle:Advert');
            $advert = $rep->find($idadvert);
            $repi = $em->getRepository('RIUserBundle:User');
            $user = $repi->findBy(array('username' => $username));
            // On récupère la liste des candidatures de cette annonce
            $Application = $em->getRepository('RIAdvertBundle:Application')->findBy(array('advert' => $idadvert, 'username' => $username));
            if ($methode == 'PUT') {
                if (count($Application) == 0) {
                    if (count($advert) == 0 || count($user) == 0) {
                        $error = 2;
                        $etat = false;
                    } else {
                        $application = new Application();
                        $application->setUsername($username);
                        $application->setMessage("precision sur l'annonce dont l'identifiant est" . $idadvert);
                        $application->setDate(new DateTime('NOW'));
                        $application->setAdvert($advert);
                        $em->persist($application);
                        $em->flush();
                        $etat = true;
                        $error = -1;
                    }
                } else {
                    foreach ($Application as $ap) {
                        $em->remove($ap);
                    }
                    $em->flush();
                    $etat = false;
                    $error = -1;
                }
            } else if ($methode == 'GET') {
                if (count($advert) == 0 || count($user) == 0) {
                    $error = 2;
                    $etat = false;
                } else {
                    $counter = count($Application);
                    $error = -1;
                    if ($counter > 0) {
                        $etat = true;
                    } elseif ($counter == 0) {
                        $etat = false;
                    }
                }
            } else {
                $error = 3;
                $etat = false;
            }
            $res = array('etatpost', $etat);
        } else {
            $error = 3;
            $res = array('etatpost', false);
        }
        $data = $this->get('jms_serializer')->serialize($res, 'json');
        $response = new Response($data);
        if ($error == 3) {
            $response->setStatusCode(400, "ID est invalide ");
        } else if ($error == 2) {
            $response->setStatusCode(404, "Utilisateur ou Annonce non trouvé ");
        }
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /* Méthode pour voir la liste des personnes qui ont postulé pour un offre precis
     * Méthode GET 
     * param id de l'annonce
     * return liste des candidatures
     */

    public function ViewAction(Request $request) {
        $id = $request->query->get('idadvert');
        $em = $this->getDoctrine()->getManager();
        if (intval($id) != 0) {
            // On récupère l'annonce dont l'id est $id
            $rep = $em->getRepository('RIAdvertBundle:Advert');
            $advert = $rep->find($id);


            if (null === $advert) {
                $Application = array("error" => "L'annonce d'id " . $id . " n'existe pas.");
                $error = 2;
            } else {
                // On récupère la liste des candidatures de cette annonce
                $Application = $em
                        ->getRepository('RIAdvertBundle:Application')
                        ->findBy(array('advert' => $advert))
                ;
                $error = -1;
            }
        } else {
            $error = 3;
            $Application = array("error" => "L'annonce d'id " . $id . " n'existe pas.");
        }
        $data = $this->get('jms_serializer')->serialize($Application, 'json');
        $response = new Response($data);
        if ($error == 3) {
            $response->setStatusCode(400, "ID est invalide ");
        } else if ($error == 2) {
            $response->setStatusCode(404, " Annonce non trouvé ");
        }

        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
