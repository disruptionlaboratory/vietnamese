CREATE TABLE `users`
(
    `id`               INT                                                                             NOT NULL AUTO_INCREMENT,
    `slug`             VARCHAR(45) UNIQUE                                                              NOT NULL,
    `status`           ENUM ('New', 'Active', 'Inactive', 'Removed', 'Suppressed', 'Banned', 'Locked') NOT NULL,
    `email`            VARCHAR(255) UNIQUE                                                             NOT NULL,
    `password`         VARCHAR(45)                                                                     NULL,
    `title`            VARCHAR(255)                                                                    NULL,
    `firstname`        VARCHAR(255)                                                                    NOT NULL,
    `lastname`         VARCHAR(255)                                                                    NOT NULL,
    `profile`          LONGTEXT                                                                        NULL,
    `profile_name`     VARCHAR(250)                                                                    NULL,
    `profile_size`     VARCHAR(250)                                                                    NULL,
    `profile_mimetype` VARCHAR(250)                                                                    NULL,
    `created`          DATETIME                                                                        NOT NULL,
    `updated`          DATETIME                                                                        NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `tokens`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `users_id`     INT(11)      NULL,
    `access_token` VARCHAR(255) NULL,
    `expiry`       DATETIME     NULL,
    `created`      DATETIME     NOT NULL,
    `updated`      DATETIME     NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_tokens_users_idx` (`users_id` ASC),
    CONSTRAINT `fk_tokens_users`
        FOREIGN KEY (`users_id`)
            REFERENCES `users` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `permissions`
(
    `id`      INT          NOT NULL AUTO_INCREMENT,
    `slug`    VARCHAR(255) UNIQUE NOT NULL,
    `name`    VARCHAR(255) NOT NULL,
    `created` DATETIME     NOT NULL,
    `updated` DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE `users_permissions`
(
    `id`             INT      NOT NULL AUTO_INCREMENT,
    `permissions_id` INT      NOT NULL,
    `users_id`       INT      NOT NULL,
    `created`        DATETIME NOT NULL,
    `updated`        DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_users_permissions_permissions1_idx` (`permissions_id` ASC),
    CONSTRAINT `fk_users_permissions_permissions1`
        FOREIGN KEY (`permissions_id`)
            REFERENCES `permissions` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    INDEX `fk_users_permissions_users1_idx` (`users_id` ASC),
    CONSTRAINT `fk_users_permissions_users1`
        FOREIGN KEY (`users_id`)
            REFERENCES `users` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

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