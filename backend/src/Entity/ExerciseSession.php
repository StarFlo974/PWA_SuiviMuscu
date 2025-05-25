<?php

namespace App\Entity;

use App\Repository\ExerciseSessionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Exercise;
use App\Entity\Session;

#[ApiResource(
    normalizationContext: ['groups' => ['exercise_session:read']],
    denormalizationContext: ['groups' => ['exercise_session:write']]
)]
#[ORM\Entity(repositoryClass: ExerciseSessionRepository::class)]
class ExerciseSession
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['exercise_session:read', 'session:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['exercise_session:read', 'exercise_session:write', 'session:write'])]
    private ?Session $session_id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['exercise_session:read', 'exercise_session:write', 'session:write'])]
    private ?Exercise $exercise_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSessionId(): ?Session
    {
        return $this->session_id;
    }

    public function setSessionId(?Session $session_id): static
    {
        $this->session_id = $session_id;

        return $this;
    }

    public function getExerciseId(): ?Exercise
    {
        return $this->exercise_id;
    }

    public function setExerciseId(?Exercise $exercise_id): static
    {
        $this->exercise_id = $exercise_id;

        return $this;
    }
}
