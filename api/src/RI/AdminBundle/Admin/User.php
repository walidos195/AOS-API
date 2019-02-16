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

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class User extends AbstractAdmin {

    protected function configureRoutes(RouteCollection $collection)
    {
        /* Removing the edit route will disable editing entities. It will also
         * use the 'show' view as default link on the identifier columns in the list view.
         */
        $collection->remove('edit');

        /* Removing the create route will disable creating new entities. It will also
         * remove the 'Add new' button in the list view.
         */
        $collection->remove('create');
    }
    
    public function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->tab('General') // the tab call is optional
                ->with('Infos personnel', [
                    'class'       => 'col-md-8',
                    'box_class'   => 'box box-solid box-danger',
                    'description' => 'Lorem ipsum',
                ])
                    ->add('username')
                ->add('nom')
                ->add('prenom')
                ->add('telephone')
                ->add('email')
               ->add('cv')
                ->add('lettre')
                  
                ->end()
            ->end()
        ;
    }
    protected function configureDatagridFilters(DatagridMapper $datagridMapper) {
        $datagridMapper->add('username')->add('nom')->add('prenom');
    }

    protected function configureListFields(ListMapper $listMapper) {
        $listMapper
                ->addIdentifier('username')->add('email')

        ;
    }

    public function getNewInstance() {
        $instance = parent::getNewInstance();
        $instance->setCode('0222');

        return $instance;
    }

}
