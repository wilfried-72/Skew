-- MySQL Script generated by MySQL Workbench
-- mar. 15 févr. 2022 16:43:02
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Skew
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Skew
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Skew` ;
USE `Skew` ;

-- -----------------------------------------------------
-- Table `Skew`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(45) NULL,
  `pass` VARCHAR(255) NULL,
  `isAdmin` TINYINT NULL DEFAULT 0,
  `isCandidat` TINYINT NULL DEFAULT 0,
  `isRecruteur` TINYINT NULL DEFAULT 0,
  `isVerified` TINYINT NULL DEFAULT 0,
  `isBanned` TINYINT NULL DEFAULT 0,
  `date_update` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`contactProfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`contactProfil` (
  `user_id` INT NULL,
  `name` VARCHAR(45) NULL DEFAULT 'name',
  `lastName` VARCHAR(45) NULL DEFAULT 'prénom',
  `address` VARCHAR(255) NULL DEFAULT 'adresse',
  `town` VARCHAR(32) NULL DEFAULT 'ville',
  `zipCode` CHAR(5) NULL DEFAULT '00000',
  `avatar` VARCHAR(60) NULL DEFAULT ' ',
  `phone` VARCHAR(20) NULL DEFAULT '06 06 06 06 06',
  `siret` BIGINT NULL DEFAULT NULL,
  `siren` BIGINT NULL DEFAULT NULL,
  `category` VARCHAR(45) NULL,
  `badge` TINYINT NULL DEFAULT 0,
  INDEX `fk_contact_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_contact_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`certificate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`certificate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `school` VARCHAR(45) NULL DEFAULT 'ecole',
  `title` VARCHAR(45) NULL DEFAULT 'titre',
  `year` INT NULL DEFAULT 1900,
  `validate` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_experiences_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_experiences_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
PACK_KEYS = DEFAULT;


-- -----------------------------------------------------
-- Table `Skew`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `firstname` VARCHAR(45) NULL,
  `tel` INT NULL,
  `mail` VARCHAR(45) NULL,
  `message` LONGTEXT NULL,
  `sujet` VARCHAR(45) NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `skill` VARCHAR(45) NULL DEFAULT 'compétence',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_aptitudes_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_aptitudes_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`offre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`offre` (
  `offer_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `title` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `period` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `profil` LONGTEXT NULL,
  `createDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`offer_id`),
  UNIQUE INDEX `id_UNIQUE` (`offer_id` ASC) VISIBLE,
  INDEX `fk_offre_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_offre_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`postuled`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`postuled` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `offre_id` INT NULL,
  `user_id` INT NULL,
  `pdf` VARCHAR(45) NULL,
  `statut` TINYINT NULL,
  `document_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_postuled_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_postuled_offre1_idx` (`offre_id` ASC) VISIBLE,
  CONSTRAINT `fk_postuled_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postuled_offre1`
    FOREIGN KEY (`offre_id`)
    REFERENCES `Skew`.`offre` (`offer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`favoris`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`favoris` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `offre_id` INT NULL,
  `user_id` INT NULL,
  `is_favoris` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_favoris_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_favoris_offre1_idx` (`offre_id` ASC) VISIBLE,
  CONSTRAINT `fk_favoris_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favoris_offre1`
    FOREIGN KEY (`offre_id`)
    REFERENCES `Skew`.`offre` (`offer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`interest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`interest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `interest` VARCHAR(45) NULL DEFAULT 'interet',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_aptitudes_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_aptitudes_user10`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Skew`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`experience` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `job` VARCHAR(45) NULL DEFAULT 'poste',
  `compagny` VARCHAR(45) NULL DEFAULT 'entreprise',
  `description` VARCHAR(45) NULL DEFAULT 'description du poste',
  `dateStart` TIMESTAMP NULL,
  `dateEnd` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_experiences_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_experiences_user10`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
PACK_KEYS = DEFAULT;


-- -----------------------------------------------------
-- Table `Skew`.`document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skew`.`document` (
  `id_document` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `title` VARCHAR(255),
  `document` VARCHAR(45) NULL DEFAULT 'compétence',
  INDEX `fk_aptitudes_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_aptitudes_user11`
    FOREIGN KEY (`user_id`)
    REFERENCES `Skew`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO user(mail, pass, isAdmin) 
VALUES ("admin@gmail.com", "$2b$10$/kIYeZiDw374HmyM5reJr.QRJ6Lij1LyQXu8XcnAIHLHJfRD6p2Iu", 1);

INSERT INTO user(mail, pass, isCandidat) 
VALUES ("candidat@gmail.com", "$2b$10$uUzLNFtK50jqYPENRMjepurWn3ZztfYmooY.LBLo4MKwvPHkRZR.a", 1);

INSERT INTO user(mail, pass, isRecruteur) 
VALUES ("recruteur@gmail.com", "$2b$10$dUI1Q8evYKmevTzVHk.Q5O7QEQYXKiFwRLbZL5jqv64adG5YXZ4bO", 1);
