-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 03:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehiclesdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `email`, `message`, `created_at`) VALUES
(1, 'john.doe@example.com', 'I would like to inquire about your services.', '2025-12-02 14:10:49'),
(2, 'maria.santos@example.com', 'Please contact me regarding my reservation.', '2025-12-02 14:10:49'),
(3, 'alex@gmail.com', 'Just sending feedback, thank you!', '2025-12-02 14:10:49'),
(4, 'client01@test.com', 'Do you offer discounts for long-term rentals?', '2025-12-02 14:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `createdAt`) VALUES
(1, 'John Doe', 'john@example.com', '09171234567', '2025-12-02 14:29:38'),
(2, 'Maria Santos', 'maria@example.com', '09187654321', '2025-12-02 14:29:38'),
(3, 'Carlos Reyes', 'carlos@example.com', '09165555555', '2025-12-02 14:29:38'),
(4, 'Ana Garcia', 'ana@example.com', '09189999999', '2025-12-02 14:29:38'),
(5, 'Miguel Cruz', 'miguel@example.com', '09161111111', '2025-12-02 14:29:38');

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rentals`
--

INSERT INTO `rentals` (`id`, `customerId`, `vehicleId`, `startDate`, `endDate`, `totalCost`, `status`, `createdAt`) VALUES
(1, 1, 3, '2024-01-15', '2024-01-18', 10500.00, 'active', '2025-12-02 14:28:15'),
(2, 2, 1, '2024-01-10', '2024-01-12', 5000.00, 'active', '2025-12-02 14:28:15'),
(3, 3, 2, '2024-01-20', '2024-01-22', 4000.00, 'active', '2025-12-02 14:28:15'),
(4, 4, 4, '2024-01-25', '2024-01-27', 9000.00, 'active', '2025-12-02 14:28:15'),
(5, 5, 6, '2024-02-01', '2024-02-03', 8400.00, 'active', '2025-12-02 14:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `make` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `year` int(11) NOT NULL,
  `licensePlate` varchar(50) NOT NULL,
  `dailyRate` decimal(10,2) NOT NULL,
  `status` enum('available','rented','maintenance') DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `make`, `model`, `year`, `licensePlate`, `dailyRate`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Toyota', 'Vios', 2020, 'ABC-1234', 1500.00, 'available', '2025-12-02 14:10:53', '2025-12-02 14:10:53'),
(2, 'Honda', 'Civic', 2020, 'XYZ-5678', 1800.00, 'rented', '2025-12-02 14:10:53', '2025-12-02 14:17:44'),
(3, 'Mitsubishi', 'Mirage', 2018, 'MIR-8899', 1200.00, 'maintenance', '2025-12-02 14:10:53', '2025-12-02 14:10:53'),
(4, 'Ford', 'Ranger', 2021, 'FRD-4455', 2500.00, 'available', '2025-12-02 14:10:53', '2025-12-02 14:10:53'),
(6, 'Honda', 'Click', 2025, 'KCM-1232', 1200.00, 'available', '2025-12-02 14:18:35', '2025-12-02 14:18:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `licensePlate` (`licensePlate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
