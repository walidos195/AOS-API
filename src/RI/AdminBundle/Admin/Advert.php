<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Advert
 *
 * @author walidos195
 */

namespace RI\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Ivory\CKEditorBundle\Form\Type\CKEditorType;
use Sonata\AdminBundle\Show\ShowMapper;

class Advert extends Admin {

    protected function configureFormFields(FormMapper $formMapper) {


        $formMapper
                ->with('Content', array('class' => 'col-md-9'))
                ->add('title', 'text')
                ->add('description', 'textarea')
                ->add('detail', CKEditorType::class, array(
                    'config_name' => 'my_config_3',
                ))
                ->add('type', 'choice', array('choices' => array('CDD' => "CDD", 'CDI' => "CDI", 'Stage' => "stage")))
                ->add('duree', 'choice', array('choices' => array('1 mois' => 1, '3 mois' => 3, '6 mois' => 6, 'plus' => 12)))
                ->add('time', 'datetime')
                ->add('date', 'datetime')
                ->add('begin', 'datetime')
                ->end()

//            ->with('Category', array('class' => 'col-md-9'))
//                ->add('category', 'entity', array(
//                    'class' => ' RI\AdvertBundle\Entity\Advert',
//                    'choice_label' => 'name',
//                ))
//            ->end()
//            ->with('Metadata', array('class' => 'col-md-9'))
//                ->add('draft')
//                ->add('createdAt', 'datetime')
//            ->end()
        ;
    }

    public function configureShowFields(ShowMapper $showMapper) {
        $showMapper
                ->tab('General') // the tab call is optional
                ->with('title', [
                    'class' => 'col-md-8',
                    'box_class' => 'box box-solid box-danger',
                    'description' => 'Lorem ipsum',
                ])
                ->add('title')
                ->add('description' )
                ->add('detail')
                ->add('type')
                ->add('duree')
                ->add('time')
                ->add('date')
                ->add('begin')
                ->end()
                ->end()
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper) {
        $datagridMapper->add('title')->add('description')->add('date', 'doctrine_orm_datetime_range', array('input_type' => 'datetime'));
    }

    protected function configureListFields(ListMapper $listMapper) {
        $listMapper
                ->addIdentifier('title')->add('description')

        ;
    }

    public function getNewInstance() {
        $instance = parent::getNewInstance();
        $instance->setCode('0222');

        return $instance;
    }

}
