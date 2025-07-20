-- Corrigir autenticação MySQL primeiro
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root123';
ALTER USER 'bodycal_user'@'%' IDENTIFIED WITH mysql_native_password BY 'bodycal_pass';
FLUSH PRIVILEGES;

-- Adicionar campos específicos para nutricionistas na tabela system_users
-- Verificar se colunas já existem antes de adicionar
SET @query = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'u722026046_bodykal' AND TABLE_NAME = 'system_users' AND COLUMN_NAME = 'crn') = 0,
    'ALTER TABLE system_users ADD COLUMN crn VARCHAR(20) COMMENT ''Registro CRN do nutricionista''',
    'SELECT ''Column crn already exists'' as message');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @query = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'u722026046_bodykal' AND TABLE_NAME = 'system_users' AND COLUMN_NAME = 'specialization') = 0,
    'ALTER TABLE system_users ADD COLUMN specialization VARCHAR(500) COMMENT ''Especialização do nutricionista''',
    'SELECT ''Column specialization already exists'' as message');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @query = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'u722026046_bodykal' AND TABLE_NAME = 'system_users' AND COLUMN_NAME = 'patient_limit') = 0,
    'ALTER TABLE system_users ADD COLUMN patient_limit INT COMMENT ''Limite de pacientes do nutricionista''',
    'SELECT ''Column patient_limit already exists'' as message');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Criar tabela de relacionamento nutricionista-paciente
CREATE TABLE IF NOT EXISTS nutritionist_patient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nutritionist_id INT NOT NULL,
  patient_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active CHAR(1) DEFAULT 'Y',
  UNIQUE KEY unique_relationship (nutritionist_id, patient_id),
  FOREIGN KEY (nutritionist_id) REFERENCES system_users(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES system_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de planos alimentares
CREATE TABLE IF NOT EXISTS meal_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  active CHAR(1) DEFAULT 'Y',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES system_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de refeições do plano
CREATE TABLE IF NOT EXISTS meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meal_plan_id INT NOT NULL,
  name VARCHAR(100) NOT NULL COMMENT 'Ex: Café da manhã, Almoço, etc.',
  time VARCHAR(10) COMMENT 'Ex: 08:00',
  description TEXT,
  calories DOUBLE,
  FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de alimentos
CREATE TABLE IF NOT EXISTS foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  calories_per_100g DOUBLE COMMENT 'Calorias por 100g',
  protein_per_100g DOUBLE COMMENT 'Proteína por 100g',
  carbs_per_100g DOUBLE COMMENT 'Carboidratos por 100g',
  fat_per_100g DOUBLE COMMENT 'Gordura por 100g',
  fiber_per_100g DOUBLE COMMENT 'Fibra por 100g',
  active CHAR(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de relacionamento refeição-alimento
CREATE TABLE IF NOT EXISTS meal_foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meal_id INT NOT NULL,
  food_id INT NOT NULL,
  quantity DOUBLE NOT NULL COMMENT 'Quantidade em gramas',
  FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de consultas/agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nutritionist_id INT NOT NULL,
  patient_id INT NOT NULL,
  date DATETIME NOT NULL,
  duration INT DEFAULT 60 COMMENT 'Duração em minutos',
  type VARCHAR(50) DEFAULT 'consulta' COMMENT 'primeira_consulta, retorno, online',
  status VARCHAR(30) DEFAULT 'agendada' COMMENT 'agendada, realizada, cancelada',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (nutritionist_id) REFERENCES system_users(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES system_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserir grupos específicos para nutrição
INSERT IGNORE INTO system_group (id, name) VALUES 
(3, 'Nutricionista'),
(4, 'Paciente');

-- Inserir alguns alimentos básicos
INSERT IGNORE INTO foods (name, category, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g) VALUES
('Arroz branco cozido', 'Cereais', 128, 2.7, 28, 0.3, 0.4),
('Feijão preto cozido', 'Leguminosas', 77, 4.5, 14, 0.5, 8.4),
('Frango grelhado', 'Carnes', 165, 31, 0, 3.6, 0),
('Banana', 'Frutas', 89, 1.1, 23, 0.3, 2.6),
('Brócolis cozido', 'Verduras', 35, 2.4, 7, 0.4, 3.3),
('Ovos cozidos', 'Proteínas', 155, 13, 1.1, 11, 0),
('Aveia', 'Cereais', 389, 16.9, 66.3, 6.9, 10.6),
('Batata doce cozida', 'Tubérculos', 86, 1.6, 20, 0.1, 3),
('Salmão grelhado', 'Peixes', 208, 25.4, 0, 12.4, 0),
('Maçã', 'Frutas', 52, 0.3, 14, 0.2, 2.4);

-- Criar usuário nutricionista exemplo
INSERT IGNORE INTO system_users (id, name, login, password, email, phone, function_name, about, active, crn, specialization) VALUES 
(100, 'Dr. Ana Silva', 'nutricionista@bodycal.com', '$2y$10$6EnyCMbLfT0qGXtVblSftOqTrV9uvh73F16WAewOOE81zNs82uwPS', 'nutricionista@bodycal.com', '(11) 99999-9999', 'Nutricionista', 'Nutricionista especializada em emagrecimento saudável e reeducação alimentar', 'Y', '12345-SP', 'Nutrição Clínica e Esportiva');

-- Associar nutricionista ao grupo correto
INSERT IGNORE INTO system_user_group (system_user_id, system_group_id) VALUES (100, 3);

-- Criar paciente exemplo
INSERT IGNORE INTO system_users (id, name, login, password, email, phone, function_name, about, active) VALUES 
(101, 'João Santos', 'paciente@bodycal.com', '$2y$10$6EnyCMbLfT0qGXtVblSftOqTrV9uvh73F16WAewOOE81zNs82uwPS', 'paciente@bodycal.com', '(11) 88888-8888', 'Paciente', 'Paciente em processo de reeducação alimentar', 'Y');

-- Associar paciente ao grupo correto
INSERT IGNORE INTO system_user_group (system_user_id, system_group_id) VALUES (101, 4);

-- Criar relacionamento nutricionista-paciente
INSERT IGNORE INTO nutritionist_patient (nutritionist_id, patient_id) VALUES (100, 101);

-- Criar consulta exemplo
INSERT IGNORE INTO appointments (nutritionist_id, patient_id, date, type, status, notes) VALUES 
(100, 101, '2025-07-25 14:00:00', 'primeira_consulta', 'agendada', 'Primeira consulta para avaliação nutricional completa');

-- Criar plano alimentar exemplo
INSERT IGNORE INTO meal_plans (id, patient_id, name, description, start_date) VALUES 
(1, 101, 'Plano Emagrecimento João', 'Plano alimentar focado em perda de peso saudável com déficit calórico controlado', '2025-07-25');

-- Criar refeições do plano
INSERT IGNORE INTO meals (id, meal_plan_id, name, time, description, calories) VALUES 
(1, 1, 'Café da Manhã', '07:00', 'Refeição matinal rica em fibras e proteínas', 350),
(2, 1, 'Lanche da Manhã', '10:00', 'Lanche leve e nutritivo', 150),
(3, 1, 'Almoço', '12:30', 'Refeição principal com proteína, carboidrato e vegetais', 450),
(4, 1, 'Lanche da Tarde', '15:30', 'Lanche energético', 200),
(5, 1, 'Jantar', '19:00', 'Refeição leve e nutritiva', 400);

-- Adicionar alimentos às refeições
INSERT IGNORE INTO meal_foods (meal_id, food_id, quantity) VALUES 
-- Café da manhã
(1, 7, 40),  -- Aveia 40g
(1, 4, 100), -- Banana 100g
(1, 6, 50),  -- Ovos 50g

-- Lanche manhã
(2, 10, 150), -- Maçã 150g

-- Almoço
(3, 1, 100),  -- Arroz 100g
(3, 2, 80),   -- Feijão 80g
(3, 3, 120),  -- Frango 120g
(3, 5, 100),  -- Brócolis 100g

-- Lanche tarde
(4, 8, 150),  -- Batata doce 150g

-- Jantar
(5, 9, 150),  -- Salmão 150g
(5, 5, 150);  -- Brócolis 150g