<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250325142222 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, name VARCHAR(50) NOT NULL, INDEX IDX_64C19C19D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercise (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, category_id_id INT DEFAULT NULL, label VARCHAR(100) NOT NULL, weight INT DEFAULT NULL, reps INT DEFAULT NULL, sets INT DEFAULT NULL, rest_time INT DEFAULT NULL, distance DOUBLE PRECISION DEFAULT NULL, INDEX IDX_AEDAD51C9D86650F (user_id_id), INDEX IDX_AEDAD51C9777D11E (category_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercise_session (id INT AUTO_INCREMENT NOT NULL, session_id_id INT NOT NULL, exercise_id_id INT NOT NULL, INDEX IDX_A512291A4392681 (session_id_id), INDEX IDX_A5122915A726995 (exercise_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE goal (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, exercise_id_id INT DEFAULT NULL, target_value DOUBLE PRECISION DEFAULT NULL, unit VARCHAR(20) DEFAULT NULL, due_date DATETIME DEFAULT NULL, is_completed TINYINT(1) NOT NULL, INDEX IDX_FCDCEB2E9D86650F (user_id_id), INDEX IDX_FCDCEB2E5A726995 (exercise_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE motivational_quote (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, category_id INT DEFAULT NULL, quote LONGTEXT NOT NULL, sent_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', like_quote TINYINT(1) NOT NULL, notification TINYINT(1) NOT NULL, INDEX IDX_808BED959D86650F (user_id_id), INDEX IDX_808BED9512469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE session (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, name VARCHAR(50) DEFAULT NULL, day DATE NOT NULL, INDEX IDX_D044D5D49D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE workout (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, category_id_id INT NOT NULL, session_id_id INT DEFAULT NULL, duration INT DEFAULT NULL, intensity VARCHAR(50) DEFAULT NULL, notes LONGTEXT DEFAULT NULL, INDEX IDX_649FFB729D86650F (user_id_id), INDEX IDX_649FFB729777D11E (category_id_id), INDEX IDX_649FFB72A4392681 (session_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C19D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51C9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51C9777D11E FOREIGN KEY (category_id_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE exercise_session ADD CONSTRAINT FK_A512291A4392681 FOREIGN KEY (session_id_id) REFERENCES session (id)');
        $this->addSql('ALTER TABLE exercise_session ADD CONSTRAINT FK_A5122915A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id)');
        $this->addSql('ALTER TABLE goal ADD CONSTRAINT FK_FCDCEB2E9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE goal ADD CONSTRAINT FK_FCDCEB2E5A726995 FOREIGN KEY (exercise_id_id) REFERENCES exercise (id)');
        $this->addSql('ALTER TABLE motivational_quote ADD CONSTRAINT FK_808BED959D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE motivational_quote ADD CONSTRAINT FK_808BED9512469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D49D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE workout ADD CONSTRAINT FK_649FFB729D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE workout ADD CONSTRAINT FK_649FFB729777D11E FOREIGN KEY (category_id_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE workout ADD CONSTRAINT FK_649FFB72A4392681 FOREIGN KEY (session_id_id) REFERENCES session (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C19D86650F');
        $this->addSql('ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51C9D86650F');
        $this->addSql('ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51C9777D11E');
        $this->addSql('ALTER TABLE exercise_session DROP FOREIGN KEY FK_A512291A4392681');
        $this->addSql('ALTER TABLE exercise_session DROP FOREIGN KEY FK_A5122915A726995');
        $this->addSql('ALTER TABLE goal DROP FOREIGN KEY FK_FCDCEB2E9D86650F');
        $this->addSql('ALTER TABLE goal DROP FOREIGN KEY FK_FCDCEB2E5A726995');
        $this->addSql('ALTER TABLE motivational_quote DROP FOREIGN KEY FK_808BED959D86650F');
        $this->addSql('ALTER TABLE motivational_quote DROP FOREIGN KEY FK_808BED9512469DE2');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D49D86650F');
        $this->addSql('ALTER TABLE workout DROP FOREIGN KEY FK_649FFB729D86650F');
        $this->addSql('ALTER TABLE workout DROP FOREIGN KEY FK_649FFB729777D11E');
        $this->addSql('ALTER TABLE workout DROP FOREIGN KEY FK_649FFB72A4392681');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE exercise');
        $this->addSql('DROP TABLE exercise_session');
        $this->addSql('DROP TABLE goal');
        $this->addSql('DROP TABLE motivational_quote');
        $this->addSql('DROP TABLE session');
        $this->addSql('DROP TABLE workout');
    }
}
