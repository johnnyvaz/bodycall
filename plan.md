# Plano de Desenvolvimento da Página de Administração

## 1. Gestão de Usuários

*   **CRUD de Usuários:**
    *   Criar, visualizar, editar e excluir usuários.
    *   Campos: Nome, email, senha, tipo de usuário (Admin, Nutricionista, Cliente).
*   **Atribuição de Papéis:**
    *   Administradores podem atribuir papéis aos usuários.
*   **Redefinição de Senha:**
    *   Funcionalidade para administradores redefinirem as senhas dos usuários.

## 2. Gestão de Nutricionistas

*   **CRUD de Nutricionistas:**
    *   Criar, visualizar, editar e excluir perfis de nutricionistas.
    *   Campos adicionais: CRN (Conselho Regional de Nutricionistas), especialidade, etc.
*   **Associação com Clientes:**
    *   Nutricionistas podem ser associados a múltiplos clientes.

## 3. Ferramentas para Nutricionistas

*   **Visualização de Clientes:**
    *   Nutricionistas podem ver uma lista de seus clientes associados.
*   **Acesso aos Dados do Cliente:**
    *   Acesso ao histórico da tabela `imccollection` do cliente.
*   **Planos Alimentares:**
    *   Criar, editar e excluir planos alimentares para os clientes (necessário criar uma nova tabela no banco de dados).
*   **Acompanhamento de Progresso:**
    *   Visualizar a evolução do cliente ao longo do tempo.

## 4. Relatórios e Dashboards

*   **Dashboard do Administrador:**
    *   Estatísticas de usuários (total, novos, etc.).
    *   Atividade dos nutricionistas.
*   **Dashboard do Nutricionista:**
    *   Visão geral dos clientes.
    *   Atividade recente dos clientes.
    *   Gráficos de evolução do IMC para os clientes.
*   **Relatórios:**
    *   Relatório de histórico do cliente.
    *   Relatório de planos alimentares.
    *   Relatório de lista de usuários.

## 5. Tecnologias Propostas

*   **Frontend:** React com uma arquitetura baseada em componentes. Utilização da biblioteca Recharts para os dashboards.
*   **Backend:** API RESTful com Node.js e Express.js.
*   **Banco de Dados:** Manter o banco de dados MySQL existente.
