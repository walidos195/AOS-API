<?php

namespace RI\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use RI\UserBundle\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class UserController extends Controller {

    
    /**
     * Fonction pour se connecter
     * 
     * @param Request $request
     * @return Response
     */
    public function NgLoginAction(Request $request) {

        $_username = $request->request->get('_username');
        $_password = $request->request->get('_password');
        $factory = $this->get('security.encoder_factory');
        $user_manager = $this->get('fos_user.user_manager');
        $user = $user_manager->findUserByUsername($_username);

        // Check if the user exists !
        if (!$user) {
            $data = $this->get('jms_serializer')->serialize(array("error" => 0), 'json');
            $response = new Response($data);
            $response->setStatusCode(404, "Utilisateur introuvable");
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        /// Start verification
        $encoder = $factory->getEncoder($user);
        $salt = $user->getSalt();

        if (!$encoder->isPasswordValid($user->getPassword(), $_password, $salt)) {
            $data = $this->get('jms_serializer')->serialize(array("error" => 1), 'json');
            $response = new Response($data);
            $response->setStatusCode(400, "mot de passe incorrect");
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        /// End Verification

        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->get('security.token_storage')->setToken($token);

        $this->get('session')->set('_security_main', serialize($token));

        // Fire the login event manually
        $event = new InteractiveLoginEvent($request, $token);
        $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);

        $data = $this->get('jms_serializer')->serialize(array("error" => -1, $user), 'json');
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

    /**Fonction pour s'inscrire
     * 
     * @param Request $request
     * @return Response
     */
    public function NgRegisterAction(Request $request) {
        $_username = $request->request->get('_username');
        $_email = $request->request->get('_email');
        $_password = $request->request->get('_password');

        $user = new User();
        $user->setUsername($_username);
        $user->setEmail($_email);
        $user->setPassword($_password);

        // attribuer le role :ROLE_USER à l'utilisateur 
        //hachage du mot de passer
        $pwd = $user->getPassword();
        $encoder = $this->container->get('security.password_encoder');
        $pwd = $encoder->encodePassword($user, $pwd);
        $user->setPassword($pwd);
        //utilisation de l'ORM doctrine pour saisir l'utilisateur sur la base de donnée
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        //redirection vers la page de connexion

        $data = $this->get('jms_serializer')->serialize(array("error" => -1, $user), 'json');
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

    /**Recuperer tous les utilisateurs
     * 
     * @param Request $request
     * @return Response
     */
    
    public function UsersAction(Request $request) {
    
        
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository('RIUserBundle:User');
       
        $user = $rep->findAll();
         if(count($user)==0){
        $data = $this->get('jms_serializer')->serialize(null, 'json');
        $error=2;
         }
         else{
        $data = $this->get('jms_serializer')->serialize($user, 'json');
        $error=-1;
         }
        $response = new Response($data);
        if ($error == 2) {
            $response->setStatusCode(404, "Aucun utilisateur ");
        }
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
    /**
     * Recuperer un profil
     * 
     * @param type $username
     * @param Request $request
     * @return Response
     */
    public function UserAction($username,Request $request) {
    
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository('RIUserBundle:User');

        $user = $rep->findOneBy(array('username'=>$username));
        if(count($user)==0){
            
        $data = $this->get('jms_serializer')->serialize(null, 'json');
            $error=2;
        }
      else{
        $data = $this->get('jms_serializer')->serialize($user, 'json');
        $error=-1;
      }
        $response = new Response($data);
         if ($error == 2) {
            $response->setStatusCode(404, "Utilisateur  non trouvé ");
        }
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

}
