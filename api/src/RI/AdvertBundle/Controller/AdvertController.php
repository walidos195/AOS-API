<?php

namespace RI\AdvertBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use RI\AdvertBundle\Entity\Advert;
use Symfony\Component\HttpFoundation\Request;
use DateTime;
use Symfony\Component\HttpFoundation\Response;

class AdvertController extends Controller {

    public function AnnonceAction(Request $request) {

        $method = $request->getMethod();
        $result = "";

        if ($method == "GET") {
            $result = $this->NgGet();
            $error = -1;
        } elseif ($method == "POST") {
            $result = $this->NgAdd($request);
            $error = result['error'];
        }

        $data = $this->get('jms_serializer')->serialize($result, 'json');
        $response = new Response($data);
        if ($error == 1) {
            $response->setStatusCode(405, "Un champ manquant");
        } else {
            $response->setStatusCode(200);
        }

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function AnnonceidAction($id, Request $request) {
    if(is_int($id)){
        $method = $request->getMethod();
        $result = array();
        if ($method == "DELETE") {
            $result = $this->NgDelete($id);
            $error = $result['error'];
        } elseif ($method == "PUT") {
            $result = $this->NgUpdate($id, $request);
            $error = $result['error'];
        } elseif ($method == "GET") {
            $result = $this->NgGetId($id);
            $error = -1;
        }
    }
        else{
            $error=3;
        }
        
        $data = $this->get('jms_serializer')->serialize($result, 'json');
        $response = new Response($data);
        if ($error == 1) {
            $response->setStatusCode(405, "un champ  manquant");
        } else if ($error == 2) {
            $response->setStatusCode(404, "Annonce non trouvé");
        } 
        else if ($error == 3) {
            $response->setStatusCode(400, "ID est invalide ");
        } 
        else {
            $response->setStatusCode(200);
        }
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /* Méthode pour récupérer les annonces
     * GET
     * param NULL
     * return les annnonces 
     */

    public function NgGet() {

        $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('RIAdvertBundle:Advert');
        $advert = $repository->findAll();
        return $advert;
    }

    /* Méthode pour récupérer une annonce dont l'id
     * GET
     * param id
     * return les annnonces 
     */

    public function NgGetId($id) {

        $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('RIAdvertBundle:Advert');
        $advert = $repository->find($id);
        if (count($advert) > 0) {
            $response = $advert;
        } else {
            $response = array("error" => 2);
        }
        return $response;
    }

    /* Méthode pour modifier une annonce
     * PUT
     * param requete  et l'id de l'annonce
     * return l'annnonce crée JSON
     */

    public function NgUpdate($id, Request $request) {
        $isvide = $this->isvide($request->request->get('title')) && $this->isvide($request->request->get('description')) && $this->isvide($request->request->get('detail')) && $this->isvide($request->request->get('begin')) && $this->isvide($request->request->get('type')) && $this->isvide($request->request->get('duree'));
        if (!$isvide) {
            return array("error" => 1);
        } else {
            $repository = $this->getDoctrine()->getManager()->getRepository('RIAdvertBundle:Advert');
            $advert = $repository->find($id);
            $advert->setTitle($request->request->get('title'));
            $advert->setDescription($request->request->get('description'));
            $advert->setDetail($request->request->get('detail'));
            $advert->setBegin($request->request->get('begin'));
            $advert->setType($request->request->get('type'));
            $advert->setDuree($request->request->get('duree'));
            $date = new DateTime('NOW');
            $advert->setDate($date->format('Y-m-d'));
            $advert->setCode("XCCD");
            $advert->setTime($date);
            $em = $this->getDoctrine()->getManager();
            $em->persist($advert);
            $em->flush();
            $response = array("error" => -1, $advert);
        }
        return $response;
    }

    /* Méthode pour ajouter une annonce
     * POST
     * param requete 
     * return l'annnonce crée JSON
     */

    public function NgAdd(Request $request) {

        $isvide = $this->isvide($request->request->get('title')) && $this->isvide($request->request->get('description')) && $this->isvide($request->request->get('detail')) && $this->isvide($request->request->get('begin')) && $this->isvide($request->request->get('type')) && $this->isvide($request->request->get('duree'));
        if (!$isvide) {
            return array("error" => 1);
        } else {

            $advert = new Advert();
            $advert->setTitle($request->request->get('title'));
            $advert->setDescription($request->request->get('description'));
            $advert->setDetail($request->request->get('detail'));
            $advert->setBegin($request->request->get('begin'));
            $advert->setType($request->request->get('type'));
            $advert->setDuree($request->request->get('duree'));
            $date = new DateTime('NOW');
            $advert->setDate($date->format('Y-m-d'));
            $advert->setCode("XCCD");
            $advert->setTime($date);
            $em = $this->getDoctrine()->getManager();
            $em->persist($advert);
            $em->flush();
            return array("error" => -1, $advert);
        }
    }

    /* Méthode pour supprimer une annonce
     * DELETE
     * param id de l'annonce à supprimer
     * return l'erreur si  erreur
     */

    public function NgDelete($id) {
        $es = $this->getDoctrine()
                ->getManager();
        $rep = $es->getRepository('RIAdvertBundle:Advert');
        $advert = $rep->find($id);
        if ($advert) {
            $repository = $es->getRepository('RIAdvertBundle:Application');
            $app = $repository->findBy(['advert' => $advert]);
            foreach ($app as $ap) {
                $es->remove($ap);
            }
            $es->flush();
            $es->remove($advert);
            $es->flush();
            $error = -1;
        } else {
            $error = 2;
        }


        return array("error" => $error);
    }

    public function isvide($var) {
        if ($var == "") {
            return false;
        } else if (is_null($var)) {
            return false;
        } else {
            return true;
        }
    }

}
