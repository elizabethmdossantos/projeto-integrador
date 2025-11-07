-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2025 at 09:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `truckgestão`
--

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `ID_cliente` int(11) NOT NULL,
  `ID_produto` int(11) NOT NULL,
  `Tipo` text NOT NULL COMMENT '(radio)',
  `Onde_levar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empresa`
--

CREATE TABLE `empresa` (
  `ID_empresa` int(11) NOT NULL,
  `Nome` text NOT NULL,
  `Email` text NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `CNPJ` varchar(255) NOT NULL,
  `Telefone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `empresa`
--

INSERT INTO `empresa` (`ID_empresa`, `Nome`, `Email`, `Senha`, `CNPJ`, `Telefone`) VALUES
(18, 'Gabriel Alves Costa', 'gollumalvescosta@gmail.com', '$2y$10$xgNty27um86O4onH5jbEMuQWAENHZETtAhyAiETfhajCeOehs5QJ6', '08808494445', '82981261561'),
(19, 'Gabriel Alves Costa', 'gollumalvescosta@gmail.com', '$2y$10$r0SuWt6p1EMJpi5nHpD6JeXjf7/Hod8aYUcOjM66I2qheFp44JYiC', '08808494446', '82981261561');

-- --------------------------------------------------------

--
-- Table structure for table `estoque`
--

CREATE TABLE `estoque` (
  `ID_estoque` int(11) NOT NULL,
  `Produto` text NOT NULL,
  `Quantidade` int(11) NOT NULL,
  `ID_venda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produto`
--

CREATE TABLE `produto` (
  `ID_produto` int(11) NOT NULL,
  `produto` text NOT NULL,
  `preço` char(255) NOT NULL,
  `custo` char(255) NOT NULL,
  `tipo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `truckcentral`
--

CREATE TABLE `truckcentral` (
  `ID_central` int(11) NOT NULL,
  `ID_empresa` int(11) NOT NULL,
  `ID_produto` int(11) NOT NULL,
  `ID_cliente` int(11) NOT NULL,
  `ID_venda` int(11) NOT NULL,
  `ID_estoque` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venda`
--

CREATE TABLE `venda` (
  `ID_venda` int(11) NOT NULL,
  `ID_produto` int(11) NOT NULL,
  `ID_cliente` int(11) NOT NULL,
  `Tipo` int(11) NOT NULL COMMENT 'radio',
  `Forma_pagamento` int(11) NOT NULL COMMENT 'radio'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_cliente`),
  ADD KEY `ID_produto` (`ID_produto`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`ID_empresa`);

--
-- Indexes for table `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`ID_estoque`),
  ADD KEY `ID_venda` (`ID_venda`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`ID_produto`);

--
-- Indexes for table `truckcentral`
--
ALTER TABLE `truckcentral`
  ADD PRIMARY KEY (`ID_central`),
  ADD KEY `ID_produto` (`ID_produto`),
  ADD KEY `ID_venda` (`ID_venda`),
  ADD KEY `ID_estoque` (`ID_estoque`),
  ADD KEY `ID_cliente` (`ID_cliente`),
  ADD KEY `ID_empresa` (`ID_empresa`);

--
-- Indexes for table `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`ID_venda`),
  ADD KEY `ID_cliente` (`ID_cliente`),
  ADD KEY `ID_produto` (`ID_produto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `ID_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `estoque`
--
ALTER TABLE `estoque`
  MODIFY `ID_estoque` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `ID_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `truckcentral`
--
ALTER TABLE `truckcentral`
  MODIFY `ID_central` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venda`
--
ALTER TABLE `venda`
  MODIFY `ID_venda` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `ID_produto` FOREIGN KEY (`ID_produto`) REFERENCES `produto` (`ID_produto`);

--
-- Constraints for table `truckcentral`
--
ALTER TABLE `truckcentral`
  ADD CONSTRAINT `truckcentral_ibfk_1` FOREIGN KEY (`ID_produto`) REFERENCES `produto` (`ID_produto`),
  ADD CONSTRAINT `truckcentral_ibfk_2` FOREIGN KEY (`ID_venda`) REFERENCES `venda` (`ID_venda`),
  ADD CONSTRAINT `truckcentral_ibfk_3` FOREIGN KEY (`ID_estoque`) REFERENCES `estoque` (`ID_estoque`),
  ADD CONSTRAINT `truckcentral_ibfk_4` FOREIGN KEY (`ID_cliente`) REFERENCES `cliente` (`ID_cliente`),
  ADD CONSTRAINT `truckcentral_ibfk_5` FOREIGN KEY (`ID_empresa`) REFERENCES `empresa` (`ID_empresa`);

--
-- Constraints for table `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `ID_cliente` FOREIGN KEY (`ID_cliente`) REFERENCES `cliente` (`ID_cliente`),
  ADD CONSTRAINT `venda_ibfk_1` FOREIGN KEY (`ID_produto`) REFERENCES `produto` (`ID_produto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
