-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 15/07/2025 às 21:05
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u722026046_bodykal`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `imccollection`
--

CREATE TABLE `imccollection` (
  `id` int(11) NOT NULL,
  `dateimc` date NOT NULL,
  `userid` int(11) NOT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `neck` int(11) DEFAULT NULL,
  `waist` int(11) DEFAULT NULL,
  `belly` int(11) DEFAULT NULL,
  `lowwaist` int(11) DEFAULT NULL,
  `hip` int(11) DEFAULT NULL,
  `pgc` double DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `gci` varchar(100) DEFAULT NULL,
  `mgfm` double DEFAULT NULL,
  `mmlm` double DEFAULT NULL,
  `pgbmi` double DEFAULT NULL,
  `ica` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imccollection`
--

INSERT INTO `imccollection` (`id`, `dateimc`, `userid`, `sex`, `age`, `weight`, `height`, `neck`, `waist`, `belly`, `lowwaist`, `hip`, `pgc`, `category`, `gci`, `mgfm`, `mmlm`, `pgbmi`, `ica`) VALUES
(13, '2025-04-02', 2, 'Masculino', 47, 88, 170, 50, 100, NULL, NULL, 0, 20.074007261142867, 'Médio', 'Acima da faixa (18.9%)', 17.665126389805724, 70.33487361019428, 31.14979238754326, NULL),
(17, '2025-04-03', 5, 'Masculino', 59, 65, 171, 35, 84, NULL, NULL, 0, 19.152879421730688, 'Médio', 'Abaixo da faixa (20.9%)', 12.449371624124947, 52.55062837587505, 24.04487432030368, NULL),
(18, '2025-04-03', 3, 'Masculino', 47, 89, 170, 50, 100, NULL, NULL, 0, 20.074007261142867, 'Médio', 'Acima da faixa (18.9%)', 17.865866462417152, 71.13413353758284, 31.565017301038065, NULL),
(19, '2025-05-01', 3, 'Masculino', 47, 88, 170, 50, 96, 97, 97, 0, 17.010265700972923, 'Valor inválido', 'Dentro da faixa (17.010265700972923%)', 14.969033816856172, 73.03096618314383, 31.14979238754326, NULL),
(21, '2025-05-04', 6, 'Feminino', 55, 54, 155, 30, 72, 75, 85, 90, 27.07734603404174, 'Médio', 'Acima da faixa (27.0%)', 14.62176685838254, 39.37823314161746, 34.221904266389174, NULL),
(22, '2025-05-10', 6, 'Feminino', 22, 180, 190, 38, 78, 75, 77, 90, 17.232461366861344, 'Atleta', 'Abaixo da faixa (17.7%)', 31.01843046035042, 148.98156953964957, 59.49379501385042, NULL),
(23, '2025-05-10', 5, 'Masculino', 59, 65, 171, 35, 80, 84, 82, 0, 16.036516693950603, 'Fitness', 'Abaixo da faixa (20.9%)', 10.42373585106789, 54.57626414893211, 24.04487432030368, NULL),
(24, '2025-05-12', 5, 'Masculino', 59, 65, 171, 35, 82, 84, 82, 0, 17.62267047093286, 'Valor inválido', 'Abaixo da faixa (20.9%)', 11.45473580610636, 53.545264193893644, 24.04487432030368, NULL),
(25, '2025-05-13', 8, 'Feminino', 62, 83, 163, 36, 97, 100, 108, 116, 46.08996003700986, 'Obeso', 'Acima da faixa (27.7%)', 38.254666830718186, 44.745333169281814, 46.34729722609056, NULL),
(26, '2025-05-13', 8, 'Feminino', 62, 84, 162, 36, 97, 100, 108, 112, 44.66008923718783, 'Obeso', 'Acima da faixa (27.7%)', 37.51447495923778, 46.48552504076222, 47.26877914951988, NULL),
(27, '2025-05-13', 7, 'Masculino', 58, 106, 172, 43, 113, 118, 116, 0, 32.487213439487675, 'Obeso', 'Acima da faixa (21.6%)', 34.436446245856935, 71.56355375414307, 40.13621416982153, NULL),
(28, '2025-05-13', 7, 'Masculino', 58, 106, 172, 43, 113, 118, 116, 0, 32.487213439487675, 'Obeso', 'Acima da faixa (21.6%)', 34.436446245856935, 71.56355375414307, 40.13621416982153, NULL),
(29, '2025-05-13', 11, 'Feminino', 51, 626, 150, 34, 80, 93, 91, 103, 37.20278381924999, 'Obeso', 'Acima da faixa (26.3%)', 232.8894267085049, 393.1105732914951, 340.1966666666667, NULL),
(30, '2025-05-13', 12, 'Masculino', 66, 71, 172, 35, 80, 88, 91, 0, 15.864847164732396, 'Fitness', 'Abaixo da faixa (22.3%)', 11.26404148696, 59.73595851304, 27.77935100054084, NULL),
(31, '2025-05-13', 12, 'Feminino', 66, 71, 172, 35, 81, 71, 88, 99, 29.05859179280509, 'Médio', 'Acima da faixa (28.6%)', 20.631600172891613, 50.36839982710839, 38.57935100054084, NULL),
(32, '2025-05-13', 11, 'Feminino', 51, 626, 150, 34, 83, 92, 95, 101, 37.69088697520823, 'Obeso', 'Acima da faixa (26.3%)', 235.9449524648035, 390.05504753519654, 340.1966666666667, NULL),
(33, '2025-05-13', 14, 'Feminino', 44, 65, 152, 34, 89, 92, 92, 100, 39.48171757266749, 'Obeso', 'Acima da faixa (22.9%)', 25.66311642223387, 39.33688357776613, 38.48038781163435, NULL),
(34, '2025-05-13', 13, 'Masculino', 50, 67, 167, 36, 83, 88, 91, 0, 18.325602353634963, 'Médio', 'Abaixo da faixa (18.9%)', 12.278153576935424, 54.72184642306458, 24.128570404101982, NULL),
(35, '2025-05-14', 9, 'Feminino', 54, 63, 168, 35, 79, 93, 93, 94, 26.630619758487796, 'Médio', 'Acima da faixa (26.3%)', 16.777290447847314, 46.222709552152686, 33.805714285714295, NULL),
(36, '2025-05-14', 13, 'Feminino', 50, 65, 167, 36, 87, 89, 92, 99, 32.78959653566034, 'Obeso', 'Acima da faixa (26.3%)', 21.31323774817922, 43.68676225182078, 34.06801606368102, NULL),
(37, '2025-05-14', 12, 'Feminino', 66, 71, 172, 36, 79, 85, 87, 99, 27.589579481542444, 'Médio', 'Abaixo da faixa (27.7%)', 19.588601431895135, 51.411398568104865, 38.57935100054084, NULL),
(38, '2025-05-14', 7, 'Masculino', 58, 106, 172, 43, 114, 118, 116, 0, 33.040533914325806, 'Obeso', 'Acima da faixa (21.6%)', 35.022965949185355, 70.97703405081464, 40.13621416982153, NULL),
(39, '2025-05-16', 6, 'Feminino', 57, 53, 158, 32, 67, 68, 83, 93, 24.099131905274703, 'Valor inválido', 'Abaixo da faixa (26.3%)', 12.772539909795592, 40.22746009020441, 33.18668642845698, NULL),
(40, '2025-05-17', 15, 'Masculino', 53, 778, 165, 36, 83, 85, 103, 0, 18.684219965874775, 'Médio', 'Abaixo da faixa (18.9%)', 145.36323133450574, 632.6367686654943, 338.9101101928375, NULL),
(43, '2025-05-20', 11, 'Feminino', 51, 63, 150, 34, 80, 93, 91, 103, 37.20278381924999, 'Obeso', 'Acima da faixa (26.3%)', 23.437753806127493, 39.56224619387251, 39.93, NULL),
(47, '2025-05-21', 2, 'Masculino', 47, 88, 170, 50, 95, 100, 97, 0, 16.209320770128954, 'Fitness', 'Abaixo da faixa (16.4%)', 14.345248881564125, 74.15475111843588, 31.357404844290667, NULL),
(49, '2025-05-22', 3, 'Masculino', 47, 88.6, 170, 50, 95, 100, 97, 0, 16.209320770128954, 'Fitness', 'Abaixo da faixa (16.4%)', 14.361457954999645, 74.23854051912144, 31.398926702057206, 1.270811399210156),
(50, '2025-05-22', 6, 'Feminino', 54, 52, 156, 31, 68, 69, 70, 90, 24.112916694894466, 'Valor inválido', 'Abaixo da faixa (25.2%)', 12.538716681345122, 39.46128331865488, 32.66102564102564, 1.0964358323142431),
(51, '2025-05-23', 5, 'Masculino', 59, 65, 171, 45, 80, 84, 82, 0, 7.076365709055324, 'Atleta', 'Abaixo da faixa (20.9%)', 4.59963771088596, 60.40036228911404, 24.04487432030368, 1.2499543865865932),
(52, '2025-05-23', 3, 'Masculino', 47, 87.6, 170, 50, 85, 90, 90, 0, 7.242587716363289, 'Atleta', 'Abaixo da faixa (16.4%)', 6.344506729021123, 81.25549174509997, 30.983701788562396, 1.1502398750858465),
(53, '2025-05-23', 3, 'Masculino', 47, 87.6, 170, 50, 85, 90, 90, 110, 7.242587716363289, 'Atleta', 'Abaixo da faixa (16.4%)', 6.344506729021123, 81.25549174509997, 30.983701788562396, 1.1502398750858465),
(54, '2025-05-23', 5, 'Feminino', 53, 66.6, 160, 36, 84, 95, 102, 101, 34.25041805161953, 'Obeso', 'Acima da faixa (26,30%)', 22.810777899758705, 43.78922057436239, 38.00874928474426, 1.3508899915183892),
(55, '2025-05-23', 5, 'Feminino', 53, 66.4, 160, 36, 81, 93, 99, 99, 31.8046665115333, 'Valor inválido', 'Acima da faixa (26,30%)', 21.118299048958807, 45.2817024769201, 37.91500071525574, 1.3244403466181458),
(56, '2025-05-28', 17, 'Masculino', 57, 58.7, 163, 35, 82, 85, 89, 96, 19.047770811711985, 'Médio', 'Abaixo da faixa (20.9%)', 11.181041611797893, 47.51895915114156, 23.422100912916317, 1.299472757760035),
(57, '2025-05-28', 17, 'Feminino', 57, 58.7, 163, 35, 82, 85, 89, 96, 30.475404370739454, 'Médio', 'Acima da faixa (27,00%)', 17.889062598132945, 40.81093816480651, 34.22210091291632, 1.299472757760035);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document`
--

CREATE TABLE `system_document` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `archive_date` date DEFAULT NULL,
  `filename` varchar(512) DEFAULT NULL,
  `in_trash` char(1) DEFAULT NULL,
  `system_folder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_bookmark`
--

CREATE TABLE `system_document_bookmark` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_document_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_category`
--

CREATE TABLE `system_document_category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_document_category`
--

INSERT INTO `system_document_category` (`id`, `name`) VALUES
(1, 'Documentos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_group`
--

CREATE TABLE `system_document_group` (
  `id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `system_group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_user`
--

CREATE TABLE `system_document_user` (
  `id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `system_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_folder`
--

CREATE TABLE `system_folder` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  `in_trash` char(1) DEFAULT NULL,
  `system_folder_parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_folder_bookmark`
--

CREATE TABLE `system_folder_bookmark` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_folder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_folder_group`
--

CREATE TABLE `system_folder_group` (
  `id` int(11) NOT NULL,
  `system_folder_id` int(11) DEFAULT NULL,
  `system_group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_folder_user`
--

CREATE TABLE `system_folder_user` (
  `id` int(11) NOT NULL,
  `system_folder_id` int(11) DEFAULT NULL,
  `system_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_group`
--

CREATE TABLE `system_group` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_group`
--

INSERT INTO `system_group` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Standard');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_group_program`
--

CREATE TABLE `system_group_program` (
  `id` int(11) NOT NULL,
  `system_group_id` int(11) DEFAULT NULL,
  `system_program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_group_program`
--

INSERT INTO `system_group_program` (`id`, `system_group_id`, `system_program_id`) VALUES
(12, 2, 10),
(13, 2, 12),
(14, 2, 13),
(15, 2, 16),
(16, 2, 17),
(17, 2, 18),
(18, 2, 19),
(19, 2, 20),
(29, 2, 30),
(62, 2, 54),
(63, 2, 60),
(64, 2, 43),
(65, 2, 44),
(66, 2, 45),
(67, 2, 46),
(68, 2, 47),
(69, 2, 48),
(70, 2, 49),
(71, 2, 55),
(72, 2, 56),
(73, 2, 61),
(76, 2, 64),
(78, 2, 65),
(80, 2, 66),
(81, 1, 1),
(82, 1, 2),
(83, 1, 3),
(84, 1, 4),
(85, 1, 5),
(86, 1, 6),
(87, 1, 8),
(88, 1, 9),
(89, 1, 11),
(90, 1, 14),
(91, 1, 15),
(92, 1, 21),
(93, 1, 26),
(94, 1, 27),
(95, 1, 28),
(96, 1, 29),
(97, 1, 31),
(98, 1, 32),
(99, 1, 33),
(100, 1, 34),
(101, 1, 35),
(102, 1, 36),
(103, 1, 37),
(104, 1, 38),
(105, 1, 39),
(106, 1, 40),
(107, 1, 41),
(108, 1, 42),
(109, 1, 43),
(110, 1, 44),
(111, 1, 45),
(112, 1, 46),
(113, 1, 47),
(114, 1, 48),
(115, 1, 49),
(116, 1, 52),
(117, 1, 53),
(118, 1, 54),
(119, 1, 55),
(120, 1, 56),
(121, 1, 57),
(122, 1, 58),
(123, 1, 59),
(124, 1, 60),
(125, 1, 61),
(126, 1, 62),
(127, 1, 63),
(128, 1, 65),
(129, 1, 66);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_message`
--

CREATE TABLE `system_message` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_user_to_id` int(11) DEFAULT NULL,
  `subject` varchar(256) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `dt_message` varchar(256) DEFAULT NULL,
  `checked` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_notification`
--

CREATE TABLE `system_notification` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_user_to_id` int(11) DEFAULT NULL,
  `subject` varchar(256) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `dt_message` varchar(256) DEFAULT NULL,
  `action_url` varchar(4096) DEFAULT NULL,
  `action_label` varchar(256) DEFAULT NULL,
  `icon` varchar(256) DEFAULT NULL,
  `checked` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_post`
--

CREATE TABLE `system_post` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `title` varchar(256) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` char(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_post`
--

INSERT INTO `system_post` (`id`, `system_user_id`, `title`, `content`, `created_at`, `active`) VALUES
(1, 1, 'Primeira noticia', '<p style=\"text-align: justify; \"><span style=\"font-family: &quot;Source Sans Pro&quot;; font-size: 18px;\">﻿</span><span style=\"font-family: &quot;Source Sans Pro&quot;; font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Odio pellentesque diam volutpat commodo sed egestas egestas. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Habitant morbi tristique senectus et netus et malesuada. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Vehicula ipsum a arcu cursus. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus in ornare quam viverra orci sagittis eu. Nisi scelerisque eu ultrices vitae auctor. Tellus cras adipiscing enim eu turpis egestas. Eget lorem dolor sed viverra ipsum nunc aliquet. Neque convallis a cras semper auctor neque. Bibendum ut tristique et egestas. Amet nisl suscipit adipiscing bibendum.</span></p><p style=\"text-align: justify;\"><span style=\"font-family: &quot;Source Sans Pro&quot;; font-size: 18px;\">Mattis nunc sed blandit libero volutpat sed cras ornare. Leo duis ut diam quam nulla. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Non quam lacus suspendisse faucibus. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Dignissim enim sit amet venenatis urna. Elit sed vulputate mi sit. Sit amet nisl suscipit adipiscing bibendum est. Maecenas accumsan lacus vel facilisis. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Augue lacus viverra vitae congue eu consequat ac felis. Bibendum neque egestas congue quisque egestas diam. Facilisis magna etiam tempor orci eu lobortis elementum. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Nullam eget felis eget nunc. Nec ullamcorper sit amet risus nullam eget felis. Lacus vel facilisis volutpat est velit egestas dui id.</span></p>', '2022-11-03 17:59:39', 'Y'),
(2, 1, 'Segunda noticia', '<p style=\"text-align: justify; \"><span style=\"font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus rutrum. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Faucibus scelerisque eleifend donec pretium vulputate sapien. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Ultricies mi quis hendrerit dolor magna eget. Quam id leo in vitae turpis massa sed elementum tempus. Eget arcu dictum varius duis at consectetur lorem. Quis varius quam quisque id diam. Consequat interdum varius sit amet mattis vulputate. Purus non enim praesent elementum facilisis leo vel fringilla. Nulla facilisi nullam vehicula ipsum a arcu. Habitant morbi tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Massa massa ultricies mi quis hendrerit. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Quisque egestas diam in arcu cursus euismod quis.</span></p><p style=\"text-align: justify; \"><span style=\"font-size: 18px;\">Posuere morbi leo urna molestie at elementum eu facilisis. Dolor morbi non arcu risus quis varius quam. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Consectetur adipiscing elit ut aliquam purus sit. Gravida cum sociis natoque penatibus et magnis. Sollicitudin aliquam ultrices sagittis orci. Tortor consequat id porta nibh venenatis cras sed felis. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc. Arcu dictum varius duis at consectetur. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. At tellus at urna condimentum mattis pellentesque. Tellus mauris a diam maecenas sed.</span></p>', '2022-11-03 18:03:31', 'Y');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_post_comment`
--

CREATE TABLE `system_post_comment` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `system_user_id` int(11) NOT NULL,
  `system_post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_post_comment`
--

INSERT INTO `system_post_comment` (`id`, `comment`, `system_user_id`, `system_post_id`, `created_at`) VALUES
(1, 'My first comment', 1, 2, '2022-11-03 18:22:11'),
(2, 'Another comment', 1, 2, '2022-11-03 18:22:17'),
(3, 'The best comment', 2, 2, '2022-11-03 18:23:11');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_post_like`
--

CREATE TABLE `system_post_like` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_post_share_group`
--

CREATE TABLE `system_post_share_group` (
  `id` int(11) NOT NULL,
  `system_group_id` int(11) DEFAULT NULL,
  `system_post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_post_share_group`
--

INSERT INTO `system_post_share_group` (`id`, `system_group_id`, `system_post_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_post_tag`
--

CREATE TABLE `system_post_tag` (
  `id` int(11) NOT NULL,
  `system_post_id` int(11) NOT NULL,
  `tag` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_post_tag`
--

INSERT INTO `system_post_tag` (`id`, `system_post_id`, `tag`) VALUES
(1, 1, 'novidades'),
(2, 2, 'novidades');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_preference`
--

CREATE TABLE `system_preference` (
  `id` varchar(256) DEFAULT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_program`
--

CREATE TABLE `system_program` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `controller` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_program`
--

INSERT INTO `system_program` (`id`, `name`, `controller`) VALUES
(1, 'System Group Form', 'SystemGroupForm'),
(2, 'System Group List', 'SystemGroupList'),
(3, 'System Program Form', 'SystemProgramForm'),
(4, 'System Program List', 'SystemProgramList'),
(5, 'System User Form', 'SystemUserForm'),
(6, 'System User List', 'SystemUserList'),
(7, 'Common Page', 'CommonPage'),
(8, 'System PHP Info', 'SystemPHPInfoView'),
(9, 'System ChangeLog View', 'SystemChangeLogView'),
(10, 'Welcome View', 'WelcomeView'),
(11, 'System Sql Log', 'SystemSqlLogList'),
(12, 'System Profile View', 'SystemProfileView'),
(13, 'System Profile Form', 'SystemProfileForm'),
(14, 'System SQL Panel', 'SystemSQLPanel'),
(15, 'System Access Log', 'SystemAccessLogList'),
(16, 'System Message Form', 'SystemMessageForm'),
(17, 'System Message List', 'SystemMessageList'),
(18, 'System Message Form View', 'SystemMessageFormView'),
(19, 'System Notification List', 'SystemNotificationList'),
(20, 'System Notification Form View', 'SystemNotificationFormView'),
(21, 'System Document Category List', 'SystemDocumentCategoryFormList'),
(26, 'System Unit Form', 'SystemUnitForm'),
(27, 'System Unit List', 'SystemUnitList'),
(28, 'System Access stats', 'SystemAccessLogStats'),
(29, 'System Preference form', 'SystemPreferenceForm'),
(30, 'System Support form', 'SystemSupportForm'),
(31, 'System PHP Error', 'SystemPHPErrorLogView'),
(32, 'System Database Browser', 'SystemDatabaseExplorer'),
(33, 'System Table List', 'SystemTableList'),
(34, 'System Data Browser', 'SystemDataBrowser'),
(35, 'System Menu Editor', 'SystemMenuEditor'),
(36, 'System Request Log', 'SystemRequestLogList'),
(37, 'System Request Log View', 'SystemRequestLogView'),
(38, 'System Administration Dashboard', 'SystemAdministrationDashboard'),
(39, 'System Log Dashboard', 'SystemLogDashboard'),
(40, 'System Session vars', 'SystemSessionVarsView'),
(41, 'System Information', 'SystemInformationView'),
(42, 'System files diff', 'SystemFilesDiff'),
(43, 'System Documents', 'SystemDriveList'),
(44, 'System Folder form', 'SystemFolderForm'),
(45, 'System Share folder', 'SystemFolderShareForm'),
(46, 'System Share document', 'SystemDocumentShareForm'),
(47, 'System Document properties', 'SystemDocumentFormWindow'),
(48, 'System Folder properties', 'SystemFolderFormView'),
(49, 'System Document upload', 'SystemDriveDocumentUploadForm'),
(52, 'System Post list', 'SystemPostList'),
(53, 'System Post form', 'SystemPostForm'),
(54, 'Post View list', 'SystemPostFeedView'),
(55, 'Post Comment form', 'SystemPostCommentForm'),
(56, 'Post Comment list', 'SystemPostCommentList'),
(57, 'System Contacts list', 'SystemContactsList'),
(58, 'System Wiki list', 'SystemWikiList'),
(59, 'System Wiki form', 'SystemWikiForm'),
(60, 'System Wiki search', 'SystemWikiSearchList'),
(61, 'System Wiki view', 'SystemWikiView'),
(62, 'System Role List', 'SystemRoleList'),
(63, 'System Role Form', 'SystemRoleForm'),
(64, 'System Profile 2FA Form', 'SystemProfile2FAForm'),
(65, 'Imc Form', 'ImccollectionForm'),
(66, 'IMC List', 'ImccollectionList');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_program_method_role`
--

CREATE TABLE `system_program_method_role` (
  `id` int(11) NOT NULL,
  `system_program_id` int(11) DEFAULT NULL,
  `system_role_id` int(11) DEFAULT NULL,
  `method_name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_role`
--

CREATE TABLE `system_role` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `custom_code` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_role`
--

INSERT INTO `system_role` (`id`, `name`, `custom_code`) VALUES
(1, 'Role A', ''),
(2, 'Role B', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_unit`
--

CREATE TABLE `system_unit` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `connection_name` varchar(256) DEFAULT NULL,
  `custom_code` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_unit`
--

INSERT INTO `system_unit` (`id`, `name`, `connection_name`, `custom_code`) VALUES
(1, 'Unit A', 'unit_a', ''),
(2, 'Unit B', 'unit_b', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_users`
--

CREATE TABLE `system_users` (
  `id` int(11) NOT NULL,
  `createdate` date DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `login` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `accepted_term_policy` char(1) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `function_name` varchar(256) DEFAULT NULL,
  `about` varchar(4096) DEFAULT NULL,
  `accepted_term_policy_at` varchar(256) DEFAULT NULL,
  `accepted_term_policy_data` text DEFAULT NULL,
  `frontpage_id` int(11) DEFAULT NULL,
  `system_unit_id` int(11) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  `custom_code` varchar(256) DEFAULT NULL,
  `otp_secret` varchar(256) DEFAULT NULL,
  `photo` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_users`
--

INSERT INTO `system_users` (`id`, `createdate`, `name`, `login`, `password`, `email`, `accepted_term_policy`, `phone`, `address`, `cep`, `function_name`, `about`, `accepted_term_policy_at`, `accepted_term_policy_data`, `frontpage_id`, `system_unit_id`, `active`, `custom_code`, `otp_secret`, `photo`) VALUES
(1, NULL, 'Administrator', 'protonsnet@gmail.com', '$2y$10$CcHDfkeoOtNuMqifDJQxbeFplGSZXekg3l2Dx3njETxdmWbpIfuYW', 'protonsnet@gmail.com', 'Y', '+123 456 789', 'Admin Street, 123', NULL, 'Administrator', 'I\'m the administrator', NULL, NULL, 10, NULL, 'Y', NULL, NULL, NULL),
(2, NULL, 'Usuário Teste', 'user', '$2y$10$6EnyCMbLfT0qGXtVblSftOqTrV9uvh73F16WAewOOE81zNs82uwPS', 'user@user.net', 'Y', '(84) 98899-0000', 'User Street, 123', NULL, 'End user', 'I\'m the end user', NULL, NULL, 7, NULL, 'Y', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_group`
--

CREATE TABLE `system_user_group` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_user_group`
--

INSERT INTO `system_user_group` (`id`, `system_user_id`, `system_group_id`) VALUES
(4, 1, 2),
(6, 1, 1),
(7, 2, 1),
(8, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_old_password`
--

CREATE TABLE `system_user_old_password` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_program`
--

CREATE TABLE `system_user_program` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_user_program`
--

INSERT INTO `system_user_program` (`id`, `system_user_id`, `system_program_id`) VALUES
(1, 2, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_role`
--

CREATE TABLE `system_user_role` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_unit`
--

CREATE TABLE `system_user_unit` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `system_unit_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_user_unit`
--

INSERT INTO `system_user_unit` (`id`, `system_user_id`, `system_unit_id`) VALUES
(5, 1, 1),
(6, 1, 2),
(7, 2, 1),
(8, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_wiki_page`
--

CREATE TABLE `system_wiki_page` (
  `id` int(11) NOT NULL,
  `system_user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(256) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `content` text NOT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `searchable` char(1) NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_wiki_page`
--

INSERT INTO `system_wiki_page` (`id`, `system_user_id`, `created_at`, `updated_at`, `title`, `description`, `content`, `active`, `searchable`) VALUES
(1, 1, '2022-11-02 18:33:58', '2022-11-02 18:35:10', 'Manual de operacoes', 'Este manual explica os procedimentos basicos de operacao', '<p style=\"text-align: justify; \"><span style=\"font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Quisque egestas diam in arcu cursus euismod quis. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. At imperdiet dui accumsan sit amet. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Elementum facilisis leo vel fringilla est ullamcorper. Id porta nibh venenatis cras. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Senectus et netus et malesuada fames ac turpis. Sociis natoque penatibus et magnis dis parturient montes. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Sed viverra tellus in hac habitasse. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Pharetra et ultrices neque ornare aenean euismod elementum. Volutpat blandit aliquam etiam erat velit scelerisque in. Neque aliquam vestibulum morbi blandit cursus risus. Id consectetur purus ut faucibus pulvinar elementum.</span></p><p style=\"text-align: justify; \"><br></p>', 'Y', 'Y'),
(2, 1, '2022-11-02 18:35:04', '2022-11-02 18:37:49', 'Instrucoes de lancamento', 'Este manual explica as instrucoes de lancamento de produto', '<p><span style=\"font-size: 18px;\">Non curabitur gravida arcu ac tortor dignissim convallis. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Nunc eget lorem dolor sed viverra. Et odio pellentesque diam volutpat commodo sed egestas. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Faucibus et molestie ac feugiat. Erat velit scelerisque in dictum non consectetur a erat nam. Quis risus sed vulputate odio ut enim blandit volutpat. Pharetra vel turpis nunc eget lorem dolor sed viverra. Nisl tincidunt eget nullam non nisi est sit. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Et tortor at risus viverra adipiscing at in tellus integer. Risus ultricies tristique nulla aliquet enim. Ac felis donec et odio pellentesque diam volutpat commodo sed. Ut morbi tincidunt augue interdum. Morbi tempus iaculis urna id volutpat.</span></p><p><a href=\"index.php?class=SystemWikiView&amp;method=onLoad&amp;key=3\" generator=\"adianti\">Sub pagina de instrucoes 1</a></p><p><a href=\"index.php?class=SystemWikiView&amp;method=onLoad&amp;key=4\" generator=\"adianti\">Sub pagina de instrucoes 2</a><br><span style=\"font-size: 18px;\"><br></span><br></p>', 'Y', 'Y'),
(3, 1, '2022-11-02 18:36:59', '2022-11-02 18:37:21', 'Instrucoes - sub pagina 1', 'Instrucoes - sub pagina 1', '<p><span style=\"font-size: 18px;\">Follow these steps:</span></p><ol><li><span style=\"font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></li><li><span style=\"font-size: 18px;\">Sapien nec sagittis aliquam malesuada bibendum arcu vitae.</span></li><li><span style=\"font-size: 18px;\">Quisque egestas diam in arcu cursus euismod quis.</span><br></li></ol>', 'Y', 'N'),
(4, 1, '2022-11-02 18:37:17', '2022-11-02 18:37:22', 'Instrucoes - sub pagina 2', 'Instrucoes - sub pagina 2', '<p><span style=\"font-size: 18px;\">Follow these steps:</span></p><ol><li><span style=\"font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></li><li><span style=\"font-size: 18px;\">Sapien nec sagittis aliquam malesuada bibendum arcu vitae.</span></li><li><span style=\"font-size: 18px;\">Quisque egestas diam in arcu cursus euismod quis.</span></li></ol>', 'Y', 'N');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_wiki_share_group`
--

CREATE TABLE `system_wiki_share_group` (
  `id` int(11) NOT NULL,
  `system_group_id` int(11) DEFAULT NULL,
  `system_wiki_page_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_wiki_share_group`
--

INSERT INTO `system_wiki_share_group` (`id`, `system_group_id`, `system_wiki_page_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 2),
(5, 1, 3),
(6, 2, 3),
(7, 1, 4),
(8, 2, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_wiki_tag`
--

CREATE TABLE `system_wiki_tag` (
  `id` int(11) NOT NULL,
  `system_wiki_page_id` int(11) NOT NULL,
  `tag` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `system_wiki_tag`
--

INSERT INTO `system_wiki_tag` (`id`, `system_wiki_page_id`, `tag`) VALUES
(3, 1, 'manual'),
(5, 4, 'manual'),
(6, 3, 'manual'),
(7, 2, 'manual');



-- --------------------------------------------------------

--
-- Estrutura para view `vuser`
--

CREATE VIEW `vuser`  AS SELECT `system_users`.`id` AS `id`, `system_users`.`name` AS `name`, `system_users`.`login` AS `login`, `system_users`.`password` AS `password`, `system_users`.`email` AS `email`, `system_users`.`accepted_term_policy` AS `accepted_term_policy`, `system_users`.`phone` AS `phone`, `system_users`.`address` AS `address`, `system_users`.`cep` AS `cep`, `system_users`.`function_name` AS `function_name`, `system_users`.`about` AS `about`, `system_users`.`accepted_term_policy_at` AS `accepted_term_policy_at`, `system_users`.`accepted_term_policy_data` AS `accepted_term_policy_data`, `system_users`.`frontpage_id` AS `frontpage_id`, `system_users`.`system_unit_id` AS `system_unit_id`, `system_users`.`active` AS `active`, `system_users`.`custom_code` AS `custom_code`, `system_users`.`otp_secret` AS `otp_secret`, `system_users`.`photo` AS `photo` FROM `system_users` WHERE `system_users`.`active` = 'Y' ORDER BY `system_users`.`login` ASC ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `imccollection`
--
ALTER TABLE `imccollection`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_document`
--
ALTER TABLE `system_document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_document_user_idx` (`system_user_id`),
  ADD KEY `sys_document_category_idx` (`category_id`),
  ADD KEY `sys_document_folder_idx` (`system_folder_id`);

--
-- Índices de tabela `system_document_bookmark`
--
ALTER TABLE `system_document_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_document_bookmark_user_idx` (`system_user_id`),
  ADD KEY `sys_document_bookmark_document_idx` (`system_document_id`);

--
-- Índices de tabela `system_document_category`
--
ALTER TABLE `system_document_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_document_category_name_idx` (`name`);

--
-- Índices de tabela `system_document_group`
--
ALTER TABLE `system_document_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_document_group_document_idx` (`document_id`),
  ADD KEY `sys_document_group_group_idx` (`system_group_id`);

--
-- Índices de tabela `system_document_user`
--
ALTER TABLE `system_document_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_document_user_document_idx` (`document_id`),
  ADD KEY `sys_document_user_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_folder`
--
ALTER TABLE `system_folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_folder_user_id_idx` (`system_user_id`),
  ADD KEY `sys_folder_name_idx` (`name`),
  ADD KEY `sys_folder_parend_id_idx` (`system_folder_parent_id`);

--
-- Índices de tabela `system_folder_bookmark`
--
ALTER TABLE `system_folder_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_folder_bookmark_user_idx` (`system_user_id`),
  ADD KEY `sys_folder_bookmark_folder_idx` (`system_folder_id`);

--
-- Índices de tabela `system_folder_group`
--
ALTER TABLE `system_folder_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_folder_group_folder_idx` (`system_folder_id`),
  ADD KEY `sys_folder_group_group_idx` (`system_group_id`);

--
-- Índices de tabela `system_folder_user`
--
ALTER TABLE `system_folder_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_folder_user_folder_idx` (`system_folder_id`),
  ADD KEY `sys_folder_user_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_group`
--
ALTER TABLE `system_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_group_name_idx` (`name`);

--
-- Índices de tabela `system_group_program`
--
ALTER TABLE `system_group_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_group_program_program_idx` (`system_program_id`),
  ADD KEY `sys_group_program_group_idx` (`system_group_id`);

--
-- Índices de tabela `system_message`
--
ALTER TABLE `system_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_message_user_id_idx` (`system_user_id`),
  ADD KEY `sys_message_user_to_idx` (`system_user_to_id`);

--
-- Índices de tabela `system_notification`
--
ALTER TABLE `system_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_notification_user_id_idx` (`system_user_id`),
  ADD KEY `sys_notification_user_to_idx` (`system_user_to_id`);

--
-- Índices de tabela `system_post`
--
ALTER TABLE `system_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_post_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_post_comment`
--
ALTER TABLE `system_post_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_post_comment_user_idx` (`system_user_id`),
  ADD KEY `sys_post_comment_post_idx` (`system_post_id`);

--
-- Índices de tabela `system_post_like`
--
ALTER TABLE `system_post_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_post_like_user_idx` (`system_user_id`),
  ADD KEY `sys_post_like_post_idx` (`system_post_id`);

--
-- Índices de tabela `system_post_share_group`
--
ALTER TABLE `system_post_share_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_post_share_group_group_idx` (`system_group_id`),
  ADD KEY `sys_post_share_group_post_idx` (`system_post_id`);

--
-- Índices de tabela `system_post_tag`
--
ALTER TABLE `system_post_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_post_tag_post_idx` (`system_post_id`);

--
-- Índices de tabela `system_preference`
--
ALTER TABLE `system_preference`
  ADD KEY `sys_preference_id_idx` (`id`),
  ADD KEY `sys_preference_value_idx` (`value`(768));

--
-- Índices de tabela `system_program`
--
ALTER TABLE `system_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_program_name_idx` (`name`),
  ADD KEY `sys_program_controller_idx` (`controller`);

--
-- Índices de tabela `system_program_method_role`
--
ALTER TABLE `system_program_method_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_program_method_role_program_idx` (`system_program_id`),
  ADD KEY `sys_program_method_role_role_idx` (`system_role_id`);

--
-- Índices de tabela `system_role`
--
ALTER TABLE `system_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_role_name_idx` (`name`);

--
-- Índices de tabela `system_unit`
--
ALTER TABLE `system_unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_unit_name_idx` (`name`);

--
-- Índices de tabela `system_users`
--
ALTER TABLE `system_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_program_idx` (`frontpage_id`),
  ADD KEY `sys_users_name_idx` (`name`);

--
-- Índices de tabela `system_user_group`
--
ALTER TABLE `system_user_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_group_group_idx` (`system_group_id`),
  ADD KEY `sys_user_group_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_user_old_password`
--
ALTER TABLE `system_user_old_password`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_old_password_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_user_program`
--
ALTER TABLE `system_user_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_program_program_idx` (`system_program_id`),
  ADD KEY `sys_user_program_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_user_role`
--
ALTER TABLE `system_user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_role_user_idx` (`system_user_id`),
  ADD KEY `sys_user_role_role_idx` (`system_role_id`);

--
-- Índices de tabela `system_user_unit`
--
ALTER TABLE `system_user_unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_unit_user_idx` (`system_user_id`),
  ADD KEY `sys_user_unit_unit_idx` (`system_unit_id`);

--
-- Índices de tabela `system_wiki_page`
--
ALTER TABLE `system_wiki_page`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_wiki_page_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_wiki_share_group`
--
ALTER TABLE `system_wiki_share_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_wiki_share_group_group_idx` (`system_group_id`),
  ADD KEY `sys_wiki_share_group_page_idx` (`system_wiki_page_id`);

--
-- Índices de tabela `system_wiki_tag`
--
ALTER TABLE `system_wiki_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_wiki_tag_page_idx` (`system_wiki_page_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `imccollection`
--
ALTER TABLE `imccollection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `system_group_program`
--
ALTER TABLE `system_group_program`
  ADD CONSTRAINT `system_group_program_ibfk_1` FOREIGN KEY (`system_group_id`) REFERENCES `system_group` (`id`),
  ADD CONSTRAINT `system_group_program_ibfk_2` FOREIGN KEY (`system_program_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_program_method_role`
--
ALTER TABLE `system_program_method_role`
  ADD CONSTRAINT `system_program_method_role_ibfk_1` FOREIGN KEY (`system_program_id`) REFERENCES `system_program` (`id`),
  ADD CONSTRAINT `system_program_method_role_ibfk_2` FOREIGN KEY (`system_role_id`) REFERENCES `system_role` (`id`);

--
-- Restrições para tabelas `system_users`
--
ALTER TABLE `system_users`
  ADD CONSTRAINT `system_users_ibfk_1` FOREIGN KEY (`frontpage_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_user_group`
--
ALTER TABLE `system_user_group`
  ADD CONSTRAINT `system_user_group_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_group_ibfk_2` FOREIGN KEY (`system_group_id`) REFERENCES `system_group` (`id`);

--
-- Restrições para tabelas `system_user_old_password`
--
ALTER TABLE `system_user_old_password`
  ADD CONSTRAINT `system_user_old_password_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`);

--
-- Restrições para tabelas `system_user_program`
--
ALTER TABLE `system_user_program`
  ADD CONSTRAINT `system_user_program_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_program_ibfk_2` FOREIGN KEY (`system_program_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_user_role`
--
ALTER TABLE `system_user_role`
  ADD CONSTRAINT `system_user_role_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_role_ibfk_2` FOREIGN KEY (`system_role_id`) REFERENCES `system_role` (`id`);

--
-- Restrições para tabelas `system_user_unit`
--
ALTER TABLE `system_user_unit`
  ADD CONSTRAINT `system_user_unit_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_unit_ibfk_2` FOREIGN KEY (`system_unit_id`) REFERENCES `system_unit` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
