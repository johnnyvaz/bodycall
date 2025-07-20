# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Visão Geral do Projeto

Este é o projeto BodyCal - um sistema de acompanhamento de composição corporal e gestão nutricional. O projeto inclui uma página de administração para gerenciar usuários, nutricionistas e dados de clientes.

## Arquitetura

**Frontend**: React com arquitetura baseada em componentes usando Recharts para dashboards

**Backend**: API RESTful com Node.js e Express.js

**Banco de Dados**: MySQL/MariaDB com esquema existente

## Esquema do Banco de Dados

O banco principal é `u722026046_bodykal` com tabelas principais:

- `system_users`: Gestão de usuários com papéis (Admin, Nutricionista, Cliente)
- `imccollection`: Dados de composição corporal (histórico de IMC, medidas corporais, percentual de gordura)
- `system_user_group`, `system_user_role`: Controle de acesso baseado em papéis
- `vuser`: View para usuários ativos

Campos principais em `imccollection`:

- Medidas corporais: weight, height, neck, waist, belly, lowwaist, hip
- Valores calculados: pgc (% gordura), pgbmi (% IMC), ica, mgfm, mmlm

## Plano de Desenvolvimento

Baseado no `plan.md`, o sistema incluirá:

1. **Gestão de Usuários**: Operações CRUD para usuários com atribuição de papéis
2. **Ferramentas para Nutricionistas**: Gestão de clientes, planos alimentares, acompanhamento de progresso
3. **Dashboards**: Estatísticas administrativas, visão geral de clientes do nutricionista, gráficos de evolução do IMC
4. **Relatórios**: Histórico do cliente, planos alimentares, lista de usuários

## Papéis de Usuário

- **Admin**: Acesso completo ao sistema, gestão de usuários, atribuição de papéis
- **Nutricionista**: Acesso a clientes atribuídos, criar planos alimentares, visualizar progresso
- **Cliente**: Acesso a dados pessoais e acompanhamento

## Template Base: TailAdmin Next.js v2.0.2

O projeto agora utiliza o template **TailAdmin** como base, que fornece:

### Tecnologias
- **Next.js 15.2.3** com App Router
- **React 19** + **TypeScript**
- **Tailwind CSS v4** com sistema de design completo
- **ApexCharts** para gráficos e **FullCalendar** para agendamentos

### Estrutura Principal
```
src/
├── app/                    # App Router
│   ├── (admin)/           # Área administrativa principal
│   ├── (auth)/            # Páginas de autenticação
│   └── (ui-elements)/     # Componentes de interface
├── components/            # Biblioteca de componentes
│   ├── form/             # Elementos de formulário
│   ├── charts/           # Gráficos (ApexCharts)
│   ├── calendar/         # Calendário (FullCalendar)
│   └── ui/               # Componentes de interface
└── context/              # Contextos React (Theme, Sidebar)
```

### Componentes Prontos
- **Formulários**: Input, Select, DatePicker, FileUpload, Toggle
- **Interface**: Button, Modal, Table, Alert, Badge, Avatar
- **Dados**: Charts (Line/Bar), Calendar, Metrics Cards
- **Layout**: Sidebar responsivo, Header, Footer

### Funcionalidades Implementadas
- Sistema de autenticação (Sign In/Sign Up)
- Dashboard com métricas e gráficos
- Theme switcher (light/dark mode)
- Layout responsivo com sidebar colapsável
- Navegação por App Router

### Adaptação para Nutricionistas

**Páginas a Implementar:**
- `/patients` - Gestão de pacientes
- `/appointments` - Agendamento de consultas
- `/meal-plans` - Planos alimentares
- `/reports` - Relatórios e acompanhamento

**Componentes a Customizar:**
- Dashboard metrics → Métricas de pacientes
- Calendar → Agendamento de consultas
- Charts → Evolução de peso/IMC
- Forms → Anamnese e avaliação nutricional

## Comandos de Desenvolvimento

```bash
npm install          # Instalar dependências
npm run dev         # Servidor de desenvolvimento
npm run build       # Build de produção
npm run start       # Servidor de produção
npm run lint        # Verificar código
```

## Notas de Desenvolvimento

- Template TailAdmin fornece base sólida para desenvolvimento
- Banco de dados MySQL já estruturado (`banco_bodykal.sql`)
- Componentes prontos aceleram desenvolvimento das funcionalidades específicas
- Arquitetura moderna com Next.js 15 e React 19