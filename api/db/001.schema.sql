CREATE TABLE `translations`
(
    `id`       INT          NOT NULL AUTO_INCREMENT,
    `key`      VARCHAR(255) NOT NULL,
    `value`    VARCHAR(255) NOT NULL,
    `language` VARCHAR(10)  NOT NULL,
    `created`  DATETIME     NOT NULL,
    `updated`  DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `words`
(
    `id`          INT          NOT NULL AUTO_INCREMENT,
    `term`        VARCHAR(45)  NOT NULL,
    `translation` VARCHAR(45)  NOT NULL,
    `definition`  VARCHAR(255) NULL,
    `grammar`     VARCHAR(255) NULL,
    `phonetic`    VARCHAR(45)  NULL,
    `audio`       LONGTEXT     NULL,
    `image`       LONGTEXT     NULL,
    `created`     DATETIME     NOT NULL,
    `updated`     DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `levels`
(
    `id`          INT          NOT NULL AUTO_INCREMENT,
    `level`       VARCHAR(45)  NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created`     DATETIME     NOT NULL,
    `updated`     DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `scenarios`
(
    `id`          INT          NOT NULL AUTO_INCREMENT,
    `levels_id`   INT          NOT NULL,
    `scenario`    VARCHAR(255) NOT NULL,
    `translation` VARCHAR(45)  NOT NULL,
    `phonetic`    VARCHAR(45)  NOT NULL,
    `audio`       LONGTEXT     NULL,
    `image`       LONGTEXT     NULL,
    `created`     DATETIME     NOT NULL,
    `updated`     DATETIME     NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_scenarios_levels_idx` (`levels_id` ASC),
    CONSTRAINT `fk_attachments_levels_id`
        FOREIGN KEY (`levels_id`)
            REFERENCES `levels` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `scenarios_messages`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `scenarios_id` INT          NOT NULL,
    `position`     INT          NOT NULL,
    `message`      VARCHAR(255) NOT NULL,
    `translation`  VARCHAR(45)  NOT NULL,
    `phonetic`     VARCHAR(45)  NOT NULL,
    `audio`        LONGTEXT     NULL,
    `image`        LONGTEXT     NULL,
    `created`      DATETIME     NOT NULL,
    `updated`      DATETIME     NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_scenarios_messages_scenarios_idx` (`scenarios_id` ASC),
    CONSTRAINT `fk_scenarios_messages_scenarios_id`
        FOREIGN KEY (`scenarios_id`)
            REFERENCES `scenarios` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;