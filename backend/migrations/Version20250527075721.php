<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250527075721 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51C9777D11E
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51C9777D11E FOREIGN KEY (category_id_id) REFERENCES category (id) ON DELETE SET NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session DROP FOREIGN KEY FK_A5122915A726995
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session CHANGE exercise_id_id exercise_id_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session ADD CONSTRAINT FK_A5122915A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51C9777D11E
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51C9777D11E FOREIGN KEY (category_id_id) REFERENCES category (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session DROP FOREIGN KEY FK_A5122915A726995
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session CHANGE exercise_id_id exercise_id_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise_session ADD CONSTRAINT FK_A5122915A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id)
        SQL);
    }
}
