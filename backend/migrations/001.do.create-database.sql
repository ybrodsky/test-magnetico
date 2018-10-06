SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `magnetico` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `magnetico`;

CREATE TABLE `appartments` (
  `id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `night` double(10,2) NOT NULL,
  `month` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `appartments` (`id`, `location`, `size`, `night`, `month`) VALUES
(1, 'Capital Federal', 33, 1000.00, 25000.00),
(2, 'Cordoba', 55, 1500.00, 30000.00);

CREATE TABLE `rents` (
  `id` int(11) NOT NULL,
  `appartment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `discount` double(10,2) NOT NULL DEFAULT '0.00',
  `subtotal` double(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `appartments`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rents`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `appartments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `rents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
