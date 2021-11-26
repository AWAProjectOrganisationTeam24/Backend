-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 17. lis 2021, 13:15
-- Verze serveru: 10.4.18-MariaDB
-- Verze PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `awa_project`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `id_manager` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `mail` text NOT NULL,
  `psw` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `customer`
--

INSERT INTO `customer` (`id_customer`, `id_manager`, `firstname`, `lastname`, `mail`, `psw`, `address`, `city`) VALUES
(1, 1, 'Alex', 'Niektro', 'alex@mail.fi', 'alex', 'Nunfekujia 4', 'Oulu'),
(2, 2, 'Alice', 'Wreckor', 'alice@mail.fi', 'alice', 'Kuserritika 79', 'Oulu'),
(3, 3, 'Ferb', 'Finias', 'ferb@mail.fi', 'ferb', 'Anakondova 12', 'Rovaniemi'),
(8, 0, 'Mark', 'Borek', 'mark@mail.fi', 'mark', 'Markova 13', 'Helsinki'),
(9, 0, 'Jakub', 'Diesel', 'jakub@mail.fi', 'jakub', 'Jakubova 13', 'Helsinki');

-- --------------------------------------------------------

--
-- Struktura tabulky `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `price` float NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `status` text NOT NULL,
  `content` text NOT NULL,
  `paid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `orders`
--

INSERT INTO `orders` (`id_order`, `id_restaurant`, `id_customer`, `price`, `time`, `date`, `status`, `content`, `paid`) VALUES
(1, 1, 1, 2000, '13:56:01', '2021-11-16', 'Delivered', 'Burger, fries, ketchup', 1),
(2, 3, 3, 130, '10:34:27', '2021-11-16', 'Delivered', 'Sushi set Maki', 1),
(3, 3, 8, 350, '10:06:38', '2021-11-17', 'Delivered', 'Sushi box', 1),
(4, 2, 9, 790, '17:45:17', '2021-11-15', 'Delivered', 'Kebab roll', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `category` text NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `products`
--

INSERT INTO `products` (`id_product`, `id_restaurant`, `category`, `name`, `description`, `price`, `image`) VALUES
(1, 3, 'sushi', 'Sushi set Maki', '4 maki, 4 california salmon', 130, ''),
(2, 3, 'sushi', 'Sushi box', '16 maki, 16 california salmon', 350, ''),
(3, 2, 'kebab', 'Kebab roll', 'meat, roll, vegetables', 395, ''),
(4, 1, 'burger', 'Burger', 'pork meat, tomato, fries, ketchup', 2000, '');

-- --------------------------------------------------------

--
-- Struktura tabulky `restaurant`
--

CREATE TABLE `restaurant` (
  `id_restaurant` int(11) NOT NULL,
  `id_manager` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `image` text NOT NULL,
  `type` text NOT NULL,
  `openHr` text NOT NULL,
  `priceLevel` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `restaurant`
--

INSERT INTO `restaurant` (`id_restaurant`, `id_manager`, `name`, `address`, `city`, `image`, `type`, `openHr`, `priceLevel`) VALUES
(1, 1, 'The lobster', 'Tutkijantioe 2', 'Oulu', '', 'fast food', '10:00-22:00', '$$'),
(2, 2, 'Foodoo ', 'Alerinka31', 'Rovaniemi', '', 'fast food', '12:00-20:00', '$'),
(3, 3, 'Sushi bar', 'Lakontakita 3', 'Helsinki', '', 'fast food', '11:00-16:00', '$$$');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexy pro tabulku `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexy pro tabulku `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Indexy pro tabulku `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id_restaurant`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
