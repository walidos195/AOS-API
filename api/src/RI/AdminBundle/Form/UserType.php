<?php

namespace RI\AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class UserType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        $skills=array("Java"=>"Java","PHP"=>"PHP","HTML"=>"HTML","CSS"=>"CSS","J2EE"=>"J2EE");
        $builder->add('nom', TextType::class)
                ->add('prenom', TextType::class)
                ->add('username', TextType::class)
                ->add('telephone', TextType::class)
                ->add('mail', EmailType::class)
                ->add('password',PasswordType::class)
                ->add('sub', SubmitType::class, array('label' => 'Valider'));
        
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'RI\UserBundle\Entity\User'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'ri_clientbundle_user';
    }


}
