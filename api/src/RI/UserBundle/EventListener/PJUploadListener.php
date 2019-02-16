<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace RI\UserBundle\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use RI\UserBundle\Entity\User;
use RI\UserBundle\Service\FileUploader;

class PJUploadListener
{
    private $uploader;

    public function __construct(FileUploader $uploader)
    {
        $this->uploader = $uploader;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {
        // upload only works for Product entities
        if (!$entity instanceof User) {
            return;
        }

        $file1 = $entity->getCv();
        
        $file2 = $entity->getLettre();

        // only upload new files
        if (!$file1 instanceof UploadedFile) {
            return;
        }
        if (!$file2 instanceof UploadedFile) {
            return;
        }

        $fileName1 = $this->uploader->upload($file1,'/CV/');
        $fileName2 = $this->uploader->upload($file2,'/Lettre/');
        $entity->setCv($fileName1);
        $entity->setLettre($fileName2);
    }
}