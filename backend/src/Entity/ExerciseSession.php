<?php

namespace App\Entity;

use App\Repository\ExerciseSessionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciseSessionRepository::class)]
class ExerciseSession
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?session $session_id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?exercise $exercise_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSessionId(): ?session
    {
        return $this->session_id;
    }

    public function setSessionId(?session $session_id): static
    {
        $this->session_id = $session_id;

        return $this;
    }

    public function getExerciseId(): ?exercise
    {
        return $this->exercise_id;
    }

    public function setExerciseId(?exercise $exercise_id): static
    {
        $this->exercise_id = $exercise_id;

        return $this;
    }
}
