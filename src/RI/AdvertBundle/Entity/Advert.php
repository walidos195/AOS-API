<?php

namespace RI\AdvertBundle\Entity;

/**
 * Advert
 */
class Advert
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $description;
    /**
     * @var string
     */
    private $detail;

    /**
     * @var string
     */
    private $type;

    /**
     * @var string
     */
    private $date;
    /**
     * @var string
     */
    private $begin;

    
    /**
     * @var integer
     */
    private $duree;
    
    /**
     * @var \Date
     */
    private $time;


    /**
     * @var string
     */
    private $code;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Advert
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Advert
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
/**
     * Set detail
     *
     * @param string detail
     *
     * @return Advert
     */
    public function setDetail($detail)
    {
        $this->detail = $detail;

        return $this;
    }

    /**
     * Get detail
     *
     * @return string
     */
    public function getDetail()
    {
        return $this->detail;
    }
    /**
     * Set type
     *
     * @param string $type
     *
     * @return Advert
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }


    /**
     * Set time
     *
     * @param \Date $time
     *
     * @return Advert
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return \Date
     */
    public function getTime()
    {
        return $this->time;
    }

      
    /**
     * Set code
     *
     * @param string $code
     *
     * @return Advert
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }


    /**
     * Set date
     *
     * @param \Date $date
     *
     * @return Advert
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \Date
     */
    public function getDate()
    {
        return $this->date;
    }


    /**
     * Set begin
     *
     * @param \Date $date
     *
     * @return Advert
     */
    public function setBegin($begin)
    {
        $this->begin = $begin;

        return $this;
    }

    /**
     * Get begin
     *
     * @return \Date
     */
    public function getBegin()
    {
        return $this->begin;
    }
    


    /**
     * Set duree
     *
     * @param integer $duree
     *
     * @return Advert
     */
    public function setDuree($duree)
    {
        $this->duree = $duree;

        return $this;
    }

    /**
     * Get duree
     *
     * @return integer
     */
    public function getDuree()
    {
        return $this->duree;
    }
}
