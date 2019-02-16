<?php

namespace RI\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use RI\UserBundle\Entity\User;
use RI\AdminBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;

class AccessController extends Controller {

    /**
     * @Route("/Register")
     */
    public function RegisterAction(Request $request) {
        $user = new User();

        $form = $this->get('form.factory')->create(UserType::class, $user);

        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()) {
            
            $user->setRole('ROLE_ADMIN');
            $user->setCv("");
            $user->setLettre("");
            $user->setSkills("");
            $pwd = $user->getPassword();
            $encoder = $this->container->get('security.password_encoder');
            $pwd = $encoder->encodePassword($user, $pwd);
            $user->setPassword($pwd);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->redirectToRoute('ri_user_login');
        }

        return $this->render('RIAdminBundle:Access:register.html.twig', array(
                    'form' => $form->createView(),
        ));
    }

}
