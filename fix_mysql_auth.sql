-- Corrigir autenticação do MySQL para compatibilidade com Node.js
-- Este script deve ser executado no MySQL para corrigir o plugin de autenticação

-- Alterar plugin de autenticação para todos os usuários
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root123';
ALTER USER 'bodycal_user'@'%' IDENTIFIED WITH mysql_native_password BY 'bodycal_pass';

-- Garantir que novos usuários usem mysql_native_password por padrão
SET GLOBAL default_authentication_plugin = 'mysql_native_password';

-- Atualizar privilégios
FLUSH PRIVILEGES;

-- Verificar usuários e plugins
SELECT user, host, plugin FROM mysql.user WHERE user IN ('root', 'bodycal_user');