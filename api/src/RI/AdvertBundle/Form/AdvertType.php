<?php

namespace RI\AdvertBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AdvertType extends AbstractType {

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder->add('title', TextType::class)
        ->add('description', TextareaType::class)
        ->add('duree',  ChoiceType::class, array( 'choices' => array('1 mois' => 1,'3 mois' => 3,'6 mois' => 6, 'plus'=> 12,)))
        ->add('type',  ChoiceType::class, array( 'choices' => array('CDD' => "CDD",'CDI' => "CDI",'Stage' => "stage")))
        ->add('begin',  DateType::class)
        ->add('mission',  TextareaType::class)
        ->add('profil',TextareaType::class)
        ->add('sub', SubmitType::class, array('label' => 'Valider'));
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'RI\AdvertBundle\Entity\Advert'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix() {
        return 'ri_advertbundle_advert';
    }

}
