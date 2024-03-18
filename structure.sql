CREATE DATABASE capucafe_db;

CREATE TABLE `capucafe_db`.`usuarios` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `rol` INT NOT NULL,
  `avatar` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

CREATE TABLE `capucafe_db`.`categorias` (
  `id` INT NOT NULL auto_increment,
  `categoria` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `capucafe_db`.`colores` (
  `id` INT NOT NULL auto_increment,
  `color` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `capucafe_db`.`productos` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `categoriaId` INT NOT NULL,
  `imagenes` VARCHAR(50) NOT NULL,
  `colorId` INT NULL,
  `precio` DECIMAL(12) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_categoria_producto`
    FOREIGN KEY (`id`)
    REFERENCES `capucafe_db`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_color_producto`
    FOREIGN KEY (`id`)
    REFERENCES `capucafe_db`.`colores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `capucafe_db`.`usuariosproductos` (
  `id` INT NOT NULL auto_increment,
  `usuariosId` INT NOT NULL,
  `productoId` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuariosid`
    FOREIGN KEY (`id`)
    REFERENCES `capucafe_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productoid`
    FOREIGN KEY (`id`)
    REFERENCES `capucafe_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);