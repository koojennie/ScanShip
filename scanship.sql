-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Aug 07, 2024 at 11:46 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scanship`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` varchar(6) NOT NULL,
  `usn_admin` varchar(20) NOT NULL,
  `pw_admin` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `usn_admin`, `pw_admin`) VALUES
('ADM001', 'admin', '$2y$10$jc3UM5tL61wPkWM0KVlDYeBZiv4J2/ycOo9eS.W2iejlgpFFomZP.');

-- --------------------------------------------------------

--
-- Table structure for table `kurir`
--

CREATE TABLE `kurir` (
  `id_kurir` varchar(6) NOT NULL,
  `usn_kurir` varchar(15) NOT NULL,
  `nama_kurir` varchar(20) NOT NULL,
  `pw_kurir` varchar(256) NOT NULL,
  `email_kurir` varchar(100) NOT NULL,
  `notelp_kurir` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kurir`
--

INSERT INTO `kurir` (`id_kurir`, `usn_kurir`, `nama_kurir`, `pw_kurir`, `email_kurir`, `notelp_kurir`) VALUES
('KR001', 'aanrach', 'Aan', '$2y$10$J.BSyZwCH2qxpIT6d4dZV.9JipnXINkoZ772t30GbCRngbRCcS1Du', 'aankurirscanship@gmail.com', '0812151617'),
('KR002', 'asepkur', 'Asep', '$2y$10$/b7khRPA85/Xjmyj5Jm6Je6etFoTu5qW4BvGj9lpL9ZOpcVEAZ60i', 'asepkurirscanship@gmail.com', '0855789654'),
('KR003', 'arista_', 'Aris', '$2y$10$WCZPeVDEoIPFuntdWR8Q0.JOaZ5/MLSUGoVdNOznrBp0SFP9x70uu', 'ariskurirscanship@gmail.com', '0821789567'),
('KR004', 'suryy', 'Suryono', '$2y$10$bMgIeBBQFGSr4brgq86W9O3vYDbYBz28RhSKLZivjCeImrloKC9ru', 'suryokurirscanship@gmail.com', '0875469720'),
('KR005', 'muheko', 'Eko', '$2y$10$qdcQY8ZuCeLhQbS8WNCyOuJjXUPFZozfvGit.a5KT7kZ7o4VAZiKi', 'ekokurirscanship@gmail.com', '0813475219');

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `no_resi` varchar(15) NOT NULL,
  `tanggal_pengiriman` date NOT NULL,
  `nama_pengirim` varchar(50) NOT NULL,
  `asal_pengirim` varchar(50) NOT NULL,
  `nama_penerima` varchar(50) NOT NULL,
  `notelp_penerima` varchar(10) NOT NULL,
  `alamat_tujuan` varchar(100) NOT NULL,
  `id_kurir` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`no_resi`, `tanggal_pengiriman`, `nama_pengirim`, `asal_pengirim`, `nama_penerima`, `notelp_penerima`, `alamat_tujuan`, `id_kurir`) VALUES
('SCS2024072401', '2024-07-24', 'Alia', 'Tangerang', 'Dilla', '0812136579', 'Jl. Teratai Raya No. 88', 'KR001'),
('SCS2024072801', '2024-07-28', 'Dinda', 'Bandung', 'Fayza', '0821242526', 'Jl. Kp. Taman No. 3,', 'KR002'),
('SCS2024080201', '2024-08-02', 'Natalie', 'Serpong', 'Jeanne', '0813181910', 'Jl. Muara Karang No. 10', 'KR002');

-- --------------------------------------------------------

--
-- Table structure for table `statuspaket`
--

CREATE TABLE `statuspaket` (
  `id_status` int(5) NOT NULL,
  `status_tanggal` datetime NOT NULL,
  `status_lokasi` varchar(100) NOT NULL,
  `no_resi` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statuspaket`
--

INSERT INTO `statuspaket` (`id_status`, `status_tanggal`, `status_lokasi`, `no_resi`) VALUES
(1, '2024-07-24 10:42:35', 'Paket anda telah diambil dari [Alia]', 'SCS2024072401'),
(2, '2024-07-28 19:00:02', 'Paket anda telah diambil dari [Dinda]', 'SCS2024072801'),
(3, '2024-07-24 12:06:40', 'Paket anda dalam perjalanan dari [Tangerang]', 'SCS2024072401'),
(4, '2024-07-24 16:48:38', 'Paket telah diterima di pusat sortir', 'SCS2024072401'),
(5, '2024-07-24 22:31:05', 'Paket dalam perjalanan ke [Sawangan DC]', 'SCS2024072401'),
(6, '2024-07-28 23:11:14', 'Paket anda dalam perjalanan dari [Bandung]', 'SCS2024072801'),
(7, '2024-07-29 08:03:17', 'Paket telah diterima di pusat sortir', 'SCS2024072801'),
(10, '2024-07-25 09:02:10', 'Paket anda sedang dikirim oleh [Aan Rahmat]', 'SCS2024072401'),
(11, '2024-07-25 10:52:00', 'Paket sedang dikirim ke alamat tujuan', 'SCS2024072401'),
(12, '2024-07-25 11:15:20', 'Paket telah diterima oleh [Dilla]', 'SCS2024072401'),
(13, '2024-07-29 14:15:15', 'Paket dalam perjalanan ke [Sawangan DC]', 'SCS2024072801'),
(14, '2024-07-30 05:25:35', 'Paket anda sedang dikirim oleh [Asep]', 'SCS2024072801'),
(15, '2024-07-30 06:35:40', 'Paket sedang dikirim ke alamat tujuan', 'SCS2024072801'),
(16, '2024-07-30 07:23:38', 'Paket telah diterima oleh [Fayza]', 'SCS2024072801'),
(17, '2024-08-02 19:00:00', 'No resi telah dibuat', 'SCS2024080201'),
(18, '2024-08-02 21:36:00', 'Paket anda telah diambil dari [Natalie]', 'SCS2024080201'),
(19, '2024-08-03 03:05:00', 'Paket anda dalam perjalanan dari [Serpong]', 'SCS2024080201'),
(20, '2024-08-03 10:06:00', 'Paket telah diterima di pusat sortir', 'SCS2024080201'),
(21, '2024-08-03 12:15:00', 'Paket dalam perjalanan ke [Sawangan DC]', 'SCS2024080201'),
(22, '2024-08-03 16:18:00', 'Paket anda sedang dikirim oleh [Asep]', 'SCS2024080201'),
(23, '2024-08-03 17:01:00', 'Paket sedang dikirim ke alamat tujuan', 'SCS2024080201'),
(24, '2024-08-03 17:49:00', 'Paket telah diterima oleh [Jeanne]', 'SCS2024080201');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `kurir`
--
ALTER TABLE `kurir`
  ADD PRIMARY KEY (`id_kurir`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`no_resi`),
  ADD KEY `id_kurir` (`id_kurir`);

--
-- Indexes for table `statuspaket`
--
ALTER TABLE `statuspaket`
  ADD PRIMARY KEY (`id_status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `statuspaket`
--
ALTER TABLE `statuspaket`
  MODIFY `id_status` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
