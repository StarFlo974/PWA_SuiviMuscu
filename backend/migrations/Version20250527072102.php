<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250527072102 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exercise_session DROP FOREIGN KEY FK_A5122915A726995');
        $this->addSql('ALTER TABLE exercise_session CHANGE exercise_id_id exercise_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE exercise_session ADD CONSTRAINT FK_A5122915A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exercise_session DROP FOREIGN KEY FK_A5122915A726995');
        $this->addSql('ALTER TABLE exercise_session CHANGE exercise_id_id exercise_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE exercise_session ADD CONSTRAINT FK_A5122915A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
