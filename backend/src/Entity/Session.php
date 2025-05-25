<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SessionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\ExerciseSession;

#[ORM\Entity(repositoryClass: SessionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['session:read']],
    denormalizationContext: ['groups' => ['session:write']]
)]
class Session
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['session:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['session:read', 'session:write'])]
    private ?User $user_id = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['session:read', 'session:write'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['session:read', 'session:write'])]
    private ?\DateTimeInterface $day = null;

    #[ORM\OneToMany(mappedBy: 'session_id', targetEntity: ExerciseSession::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['session:read', 'session:write'])]
    private Collection $exerciseSessions;

    public function __construct()
    {
        $this->exerciseSessions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getDay(): ?\DateTimeInterface
    {
        return $this->day;
    }

    public function setDay(\DateTimeInterface $day): static
    {
        $this->day = $day;
        return $this;
    }

    /**
     * @return Collection<int, ExerciseSession>
     */
    public function getExerciseSessions(): Collection
    {
        return $this->exerciseSessions;
    }

    public function addExerciseSession(ExerciseSession $exerciseSession): static
    {
        if (!$this->exerciseSessions->contains($exerciseSession)) {
            $this->exerciseSessions[] = $exerciseSession;
            $exerciseSession->setSessionId($this);
        }
        return $this;
    }

    public function removeExerciseSession(ExerciseSession $exerciseSession): static
    {
        if ($this->exerciseSessions->removeElement($exerciseSession)) {
            if ($exerciseSession->getSessionId() === $this) {
                $exerciseSession->setSessionId(null);
            }
        }
        return $this;
    }
}
