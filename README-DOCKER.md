# 🐳 Docker Setup - BodyCal

Este projeto inclui um setup Docker completo para desenvolvimento local com MySQL e phpMyAdmin.

## 🚀 Como usar

### 1. Iniciar o banco de dados

```bash
# Iniciar containers em background
docker-compose up -d

# Ver logs (opcional)
docker-compose logs -f mysql
```

### 2. Acessar os serviços

- **Aplicação NextJS**: http://localhost:3000
- **phpMyAdmin**: http://localhost:8080
  - **Usuário**: bodycal_user
  - **Senha**: bodycal_pass
- **MySQL direto**: localhost:3306

### 3. Testar a conexão

Acesse http://localhost:3000/test-db para verificar se a conexão está funcionando.

## 📊 Dados incluídos

O banco será criado automaticamente com:

### Dados originais:
- Estrutura completa do `banco_bodykal.sql`
- Usuários de exemplo (Administrator, Usuário Teste)
- 45+ registros de medições IMC reais

### Dados adicionais para nutrição:
- **Grupos**: Nutricionista, Paciente
- **Usuário Nutricionista**: Dr. Ana Silva (nutricionista@bodycal.com)
- **Usuário Paciente**: João Santos (paciente@bodycal.com)
- **10 alimentos básicos** catalogados
- **Plano alimentar exemplo** completo
- **Consulta agendada** exemplo

### Credenciais de teste:
- **Nutricionista**: nutricionista@bodycal.com / password: user (mesmo hash do template)
- **Paciente**: paciente@bodycal.com / password: user

## 🛠️ Comandos úteis

```bash
# Parar containers
docker-compose down

# Parar e remover volumes (⚠️ deleta dados)
docker-compose down -v

# Reiniciar apenas o MySQL
docker-compose restart mysql

# Ver logs do MySQL
docker-compose logs mysql

# Executar comandos SQL direto
docker-compose exec mysql mysql -u bodycal_user -p u722026046_bodykal
```

## 📁 Estrutura

- `docker-compose.yml` - Configuração dos containers
- `banco_bodykal.sql` - Schema original do banco
- `init_additional_tables.sql` - Tabelas específicas para nutrição
- `.env.local` - Variáveis configuradas para Docker

## 🔧 Configurações

### MySQL Container:
- **Imagem**: mysql:8.0
- **Porta**: 3306
- **Usuário**: bodycal_user
- **Senha**: bodycal_pass
- **Root**: root123
- **Database**: u722026046_bodykal

### phpMyAdmin:
- **Porta**: 8080
- **Interface web** para gerenciar o banco

### Volumes:
- `mysql_data` - Persiste dados do MySQL

## 🔍 Troubleshooting

### Erro de conexão:
1. Verifique se os containers estão rodando: `docker-compose ps`
2. Verifique logs: `docker-compose logs mysql`
3. Teste conexão: `docker-compose exec mysql mysql -u root -p`

### Porta 3306 ocupada:
Se você já tem MySQL rodando localmente, pode alterar a porta no `docker-compose.yml`:
```yaml
ports:
  - "3307:3306"  # Usar porta 3307 local
```
E atualizar a `DATABASE_URL` no `.env.local`.

### Dados não carregaram:
```bash
# Recriar com dados limpos
docker-compose down -v
docker-compose up -d
```