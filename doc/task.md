# Lista de Tarefas - Sistema de Gerenciamento de Nutricionistas

## <¯ Objetivo
Customizar o template TailAdmin Next.js para criar um sistema completo de gerenciamento de nutricionistas, incluindo gestão de pacientes, consultas, planos alimentares e relatórios.

---

## =Ë FASE 1: CONFIGURAÇÃO E ESTRUTURA BASE

### 1.1 Configuração Inicial
- [ ] Configurar conexão com banco de dados MySQL
- [ ] Instalar dependências adicionais (prisma, next-auth, etc.)
- [ ] Configurar variáveis de ambiente (.env.local)
- [ ] Testar funcionamento do template base
- [ ] Configurar autenticação com roles (Admin, Nutricionista, Cliente)

### 1.2 Estrutura do Banco de Dados
- [ ] Analisar schema existente (`banco_bodykal.sql`)
- [ ] Criar tabelas adicionais necessárias:
  - [ ] `nutritionists` (dados específicos de nutricionistas)
  - [ ] `patients` (dados de pacientes)
  - [ ] `appointments` (consultas/agendamentos)
  - [ ] `meal_plans` (planos alimentares)
  - [ ] `food_items` (alimentos)
  - [ ] `nutritional_assessment` (avaliações nutricionais)
- [ ] Criar relacionamentos entre tabelas
- [ ] Configurar seeds/dados iniciais

---

## =ñ FASE 2: CUSTOMIZAÇÃO DA NAVEGAÇÃO E LAYOUT

### 2.1 Sidebar e Navegação
- [ ] Customizar menu principal para nutricionistas:
  - [ ] Dashboard
  - [ ] Pacientes (Lista, Novo, Perfil)
  - [ ] Consultas (Agenda, Nova Consulta, Histórico)
  - [ ] Planos Alimentares (Lista, Novo Plano, Templates)
  - [ ] Relatórios (Evolução, Estatísticas)
  - [ ] Configurações
- [ ] Implementar controle de acesso por role
- [ ] Customizar ícones do menu
- [ ] Ajustar breadcrumbs para novas páginas

### 2.2 Header e Layout
- [ ] Personalizar logo para BodyCal
- [ ] Ajustar dropdown do usuário
- [ ] Customizar notificações para contexto nutricional
- [ ] Implementar busca global de pacientes

---

## <à FASE 3: DASHBOARD PRINCIPAL

### 3.1 Dashboard do Nutricionista
- [ ] Substituir métricas de e-commerce por métricas de pacientes:
  - [ ] Total de pacientes ativos
  - [ ] Consultas do dia/semana
  - [ ] Metas de peso alcançadas
  - [ ] Novos pacientes no mês
- [ ] Criar gráfico de evolução geral dos pacientes
- [ ] Implementar calendário de consultas na dashboard
- [ ] Lista de próximas consultas
- [ ] Alertas e lembretes importantes
- [ ] Estatísticas de aderência aos planos

### 3.2 Dashboard do Admin
- [ ] Métricas de sistema:
  - [ ] Total de nutricionistas
  - [ ] Total de pacientes
  - [ ] Consultas realizadas
  - [ ] Atividade dos nutricionistas
- [ ] Gráficos de crescimento da plataforma
- [ ] Relatórios de uso do sistema

---

## =e FASE 4: GESTÃO DE PACIENTES

### 4.1 Lista de Pacientes
- [ ] Criar página `/patients` com tabela de pacientes
- [ ] Implementar filtros (status, data de cadastro, IMC, etc.)
- [ ] Busca por nome, email, telefone
- [ ] Paginação e ordenação
- [ ] Ações rápidas (ver perfil, nova consulta, editar)
- [ ] Indicadores visuais (status, últimas consultas)

### 4.2 Cadastro de Novo Paciente
- [ ] Criar página `/patients/new`
- [ ] Formulário de dados pessoais
- [ ] Formulário de anamnese nutricional
- [ ] Upload de foto do paciente
- [ ] Histórico médico
- [ ] Objetivos nutricionais
- [ ] Validações e máscaras nos campos

### 4.3 Perfil do Paciente
- [ ] Criar página `/patients/[id]`
- [ ] Informações pessoais editáveis
- [ ] Histórico de consultas
- [ ] Evolução de peso/medidas (gráficos)
- [ ] Planos alimentares ativos
- [ ] Fotos de progresso
- [ ] Notas do nutricionista
- [ ] Linha do tempo de evolução

### 4.4 Avaliação Antropométrica
- [ ] Formulário de medidas corporais
- [ ] Cálculos automáticos (IMC, % gordura, etc.)
- [ ] Gráficos de evolução das medidas
- [ ] Comparação com avaliações anteriores
- [ ] Exportação de relatórios

---

## =Å FASE 5: SISTEMA DE CONSULTAS

### 5.1 Calendário de Consultas
- [ ] Integrar FullCalendar existente
- [ ] Personalizar para consultas nutricionais
- [ ] Diferentes tipos de consulta (primeira consulta, retorno, online)
- [ ] Cores por status (agendada, realizada, cancelada)
- [ ] Arrastar e soltar para reagendar
- [ ] Visualização por dia/semana/mês

### 5.2 Agendamento de Consultas
- [ ] Formulário de novo agendamento
- [ ] Seleção de paciente
- [ ] Escolha de horário disponível
- [ ] Tipo de consulta
- [ ] Observações
- [ ] Notificações automáticas

### 5.3 Consulta em Andamento
- [ ] Interface de consulta ativa
- [ ] Formulário de evolução
- [ ] Registro de peso/medidas
- [ ] Anotações da consulta
- [ ] Prescrição de plano alimentar
- [ ] Orientações nutricionais
- [ ] Agendamento da próxima consulta

### 5.4 Histórico de Consultas
- [ ] Lista de todas as consultas por paciente
- [ ] Filtros por período, tipo, status
- [ ] Visualização detalhada de cada consulta
- [ ] Exportação de relatórios

---

## <} FASE 6: PLANOS ALIMENTARES

### 6.1 Lista de Planos
- [ ] Página `/meal-plans` com todos os planos
- [ ] Filtros por paciente, status, data
- [ ] Templates de planos
- [ ] Duplicação de planos existentes

### 6.2 Criador de Planos Alimentares
- [ ] Interface drag-and-drop para montar planos
- [ ] Banco de alimentos com informações nutricionais
- [ ] Cálculo automático de macros e calorias
- [ ] Substituições de alimentos
- [ ] Divisão por refeições (café, almoço, lanche, jantar)
- [ ] Orientações especiais
- [ ] Preview para impressão

### 6.3 Banco de Alimentos
- [ ] Cadastro de alimentos
- [ ] Informações nutricionais completas
- [ ] Categorização de alimentos
- [ ] Busca e filtros
- [ ] Importação de dados TACO/USDA

### 6.4 Templates de Planos
- [ ] Criação de templates reutilizáveis
- [ ] Categorização por objetivo (emagrecimento, ganho de massa, etc.)
- [ ] Compartilhamento entre nutricionistas
- [ ] Personalização de templates

---

## =Ê FASE 7: RELATÓRIOS E ANÁLISES

### 7.1 Relatórios de Paciente
- [ ] Relatório de evolução individual
- [ ] Gráficos de peso/medidas ao longo do tempo
- [ ] Aderência ao plano alimentar
- [ ] Análise de resultados
- [ ] Exportação em PDF

### 7.2 Relatórios Gerais
- [ ] Estatísticas do consultório
- [ ] Performance dos planos alimentares
- [ ] Análise de resultados por período
- [ ] Relatórios financeiros (se aplicável)

### 7.3 Dashboards Analíticos
- [ ] Gráficos interativos com ApexCharts
- [ ] Métricas de sucesso
- [ ] Comparações e benchmarks
- [ ] Exportação de dados

---

## =' FASE 8: FUNCIONALIDADES AVANÇADAS

### 8.1 Sistema de Notificações
- [ ] Lembretes de consultas
- [ ] Notificações de evolução
- [ ] Alertas de metas não atingidas
- [ ] Sistema de mensagens interno

### 8.2 Recursos Mobile
- [ ] Otimização para dispositivos móveis
- [ ] Progressive Web App (PWA)
- [ ] Funcionamento offline básico

### 8.3 Integrações
- [ ] Integração com balanças inteligentes
- [ ] APIs de nutrição
- [ ] Sistema de pagamentos (se necessário)
- [ ] Backup automático

---

## <¨ FASE 9: PERSONALIZAÇÃO VISUAL

### 9.1 Branding
- [ ] Personalizar cores do tema para BodyCal
- [ ] Substituir logos e imagens
- [ ] Customizar favicon
- [ ] Ajustar tipografia

### 9.2 UX/UI Específico
- [ ] Ícones relacionados à nutrição
- [ ] Imagens e ilustrações temáticas
- [ ] Animações e microinterações
- [ ] Acessibilidade e usabilidade

---

## >ê FASE 10: TESTES E QUALIDADE

### 10.1 Testes Funcionais
- [ ] Testes de unidade para componentes
- [ ] Testes de integração
- [ ] Testes end-to-end com Cypress/Playwright
- [ ] Testes de performance

### 10.2 Validações e Segurança
- [ ] Validação de formulários
- [ ] Sanitização de dados
- [ ] Proteção contra CSRF/XSS
- [ ] Criptografia de dados sensíveis
- [ ] Backup e recuperação

---

## =€ FASE 11: DEPLOY E PRODUÇÃO

### 11.1 Preparação para Deploy
- [ ] Otimização de build
- [ ] Configuração de ambiente de produção
- [ ] Setup de banco de dados produção
- [ ] Configuração de CDN para imagens
- [ ] Monitoramento e logs

### 11.2 Documentação
- [ ] Manual do usuário
- [ ] Documentação técnica
- [ ] Guia de instalação
- [ ] Documentação da API

---

## =È FASE 12: MELHORIAS FUTURAS

### 12.1 Funcionalidades Avançadas
- [ ] IA para sugestões de planos
- [ ] Análise preditiva de resultados
- [ ] Chatbot para pacientes
- [ ] Integração com wearables

### 12.2 Expansão
- [ ] Multi-tenancy para múltiplos consultórios
- [ ] API pública para integrações
- [ ] Marketplace de planos alimentares
- [ ] Sistema de teleconsulta integrado

---

## <¯ PRIORIZAÇÃO

### =4 Alta Prioridade (MVP)
- Fases 1-5: Configuração, estrutura, pacientes e consultas básicas

### =á Média Prioridade
- Fases 6-8: Planos alimentares e relatórios

### =â Baixa Prioridade
- Fases 9-12: Personalização, testes avançados e melhorias futuras

---

## =Ý Notas Importantes

1. **Cada fase deve ser testada antes de prosseguir para a próxima**
2. **Manter backups regulares durante o desenvolvimento**
3. **Documentar mudanças significativas no código**
4. **Considerar feedback dos usuários durante o desenvolvimento**
5. **Priorizar performance e usabilidade em dispositivos móveis**

---

*Última atualização: $(date)*
*Status: Em planejamento*