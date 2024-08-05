-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Aug 05, 2024 at 03:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
  `usn_kurir` varchar(20) NOT NULL,
  `nama_kurir` varchar(20) NOT NULL,
  `pw_kurir` varchar(256) NOT NULL,
  `email_kurir` varchar(100) NOT NULL,
  `notelp_kurir` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kurir`
--

INSERT INTO `kurir` (`id_kurir`, `usn_kurir`, `nama_kurir`, `pw_kurir`, `email_kurir`, `notelp_kurir`) VALUES
('KR001', 'aanrach', 'Aan Rahmat', '$2y$10$J.BSyZwCH2qxpIT6d4dZV.9JipnXINkoZ772t30GbCRngbRCcS1Du', 'aankurirscanship@gmail.com', '0812151617'),
('KR002', 'asepkur', 'Asep', '$2y$10$/b7khRPA85/Xjmyj5Jm6Je6etFoTu5qW4BvGj9lpL9ZOpcVEAZ60i', 'asepkurirscanship@gmail.com', '0855789654');

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
  `tanggal_penerimaan` date DEFAULT NULL,
  `id_kurir` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`no_resi`, `tanggal_pengiriman`, `nama_pengirim`, `asal_pengirim`, `nama_penerima`, `notelp_penerima`, `alamat_tujuan`, `tanggal_penerimaan`, `id_kurir`) VALUES
('SCS0000000001', '2024-07-24', 'Alia', 'Tangerang', 'Dilla', '0812136579', 'Jl. Teratai Raya No. 88, RT 001/RW 002, Sukmajaya, Mekarjaya, Depok', '2024-07-26', 'KR001'),
('SCS0000000002', '2024-07-30', 'Dinda', 'Bandung', 'Fayza', '0821242526', 'Jl. Kp. Taman No. 3, Depok 2', '2024-07-31', 'KR002'),
('SCS0000000003', '2024-08-01', 'Alia', 'F5', 'Khasani', '08123445', 'F6', '0000-00-00', 'KR002');

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
(1, '2024-07-30 14:29:27', 'Paket anda telah diambil dari [Alia]', 'SCS0000000001'),
(2, '2024-07-28 18:00:00', 'Paket anda telah diambil dari [Dinda]', 'SCS0000000002'),
(3, '2024-07-31 16:06:40', 'Paket anda dalam perjalanan dari [Tangerang]', 'SCS0000000001'),
(4, '2024-08-01 20:30:00', 'Paket telah diterima di pusat sortir', 'SCS0000000001'),
(5, '2024-08-01 22:31:00', 'Paket dalam perjalanan ke [Sawangan DC]', 'SCS0000000001'),
(6, '2024-07-30 20:32:00', 'Paket anda dalam perjalanan dari [Bandung]', 'SCS0000000002'),
(7, '2024-08-01 20:36:00', 'Paket telah diterima di pusat sortir', 'SCS0000000002'),
(8, '2024-08-05 07:19:00', 'No resi telah dibuat', 'SCS0000000003'),
(9, '2024-08-01 09:14:00', 'Paket anda telah diambil dari [Alia]', 'SCS0000000003');

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
  MODIFY `id_status` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
