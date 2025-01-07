CREATE TABLE `definitions`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `language`   ENUM ('vi')  NOT NULL,
    `key`        VARCHAR(45)  NOT NULL,
    `value`      VARCHAR(45)  NOT NULL,
    `definition` VARCHAR(255) NOT NULL,
    `grammar`    VARCHAR(255) NOT NULL,
    `phonetic`   VARCHAR(45)  NOT NULL,
    `audio`      LONGTEXT     NULL,
    `created`    DATETIME     NOT NULL,
    `updated`    DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;