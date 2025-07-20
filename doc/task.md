# Lista de Tarefas - Sistema de Gerenciamento de Nutricionistas

## Objetivo
Customizar o template TailAdmin Next.js para criar um sistema completo de gerenciamento de nutricionistas, incluindo gestão de pacientes, consultas, planos alimentares e relatórios.

---

## FASE 1: CONFIGURAÇÃO E ESTRUTURA BASE

### 1.1 Configuração Inicial
- [x] Configurar conexão com banco de dados MySQL
- [x] Instalar dependências adicionais (prisma, next-auth, etc.)
- [x] Configurar variáveis de ambiente (.env.local)
- [x] Testar funcionamento do template base
- [x] Configurar autenticação com roles (Admin, Nutricionista, Cliente)

### 1.2 Estrutura do Banco de Dados
- [x] Analisar schema existente (`banco_bodykal.sql`)
- [x] Criar tabelas adicionais necessárias:
  - [x] `nutritionists` (dados específicos de nutricionistas)
  - [x] `patients` (dados de pacientes)
  - [x] `appointments` (consultas/agendamentos)
  - [x] `meal_plans` (planos alimentares)
  - [x] `food_items` (alimentos)
  - [x] `nutritional_assessment` (avaliações nutricionais)
- [x] Criar relacionamentos entre tabelas
- [x] Configurar seeds/dados iniciais

---

## FASE 2: CUSTOMIZAÇÃO DA NAVEGAÇÃO E LAYOUT

### 2.1 Sidebar e Navegação
- [x] Customizar menu principal para nutricionistas:
  - [x] Dashboard
  - [x] Pacientes (Lista, Novo, Perfil)
  - [x] Consultas (Agenda, Nova Consulta, Histórico)
  - [x] Planos Alimentares (Lista, Novo Plano, Templates)
  - [x] Relatórios (Evolução, Estatísticas)
  - [x] Configurações
- [x] Implementar controle de acesso por role
- [x] Customizar ícones do menu
- [x] Ajustar breadcrumbs para novas páginas

### 2.2 Header e Layout
- [x] Personalizar logo para BodyCal
- [x] Ajustar dropdown do usuário
- [x] Customizar notificações para contexto nutricional
- [x] Implementar busca global de pacientes

---

## FASE 3: DASHBOARD PRINCIPAL

### 3.1 Dashboard do Nutricionista
- [x] Substituir métricas de e-commerce por métricas de pacientes:
  - [x] Total de pacientes ativos
  - [x] Consultas do dia/semana
  - [x] Metas de peso alcançadas
  - [x] Novos pacientes no mês
- [x] Criar gráfico de evolução geral dos pacientes
- [x] Implementar calendário de consultas na dashboard
- [x] Lista de próximas consultas
- [x] Alertas e lembretes importantes
- [x] Estatísticas de aderência aos planos

### 3.2 Dashboard do Admin
- [x] Métricas de sistema:
  - [x] Total de nutricionistas
  - [x] Total de pacientes
  - [x] Consultas realizadas
  - [x] Atividade dos nutricionistas
- [x] Gráficos de crescimento da plataforma
- [x] Relatórios de uso do sistema

---

## FASE 4: GESTÃO DE PACIENTES

### 4.1 Lista de Pacientes
- [x] Criar página `/patients` com tabela de pacientes
- [x] Implementar filtros (status, data de cadastro, IMC, etc.)
- [x] Busca por nome, email, telefone
- [x] Paginação e ordenação
- [x] Ações rápidas (ver perfil, nova consulta, editar)
- [x] Indicadores visuais (status, últimas consultas)

### 4.2 Cadastro de Novo Paciente
- [x] Criar página `/patients/new`
- [x] Formulário de dados pessoais
- [x] Formulário de anamnese nutricional
- [x] Upload de foto do paciente
- [x] Histórico médico
- [x] Objetivos nutricionais
- [x] Validações e máscaras nos campos

### 4.3 Perfil do Paciente
- [x] Criar página `/patients/[id]`
- [x] Informações pessoais editáveis
- [x] Histórico de consultas
- [x] Evolução de peso/medidas (gráficos)
- [x] Planos alimentares ativos
- [x] Fotos de progresso
- [x] Notas do nutricionista
- [x] Linha do tempo de evolução

### 4.4 Avaliação Antropométrica
- [x] Formulário de medidas corporais
- [x] Cálculos automáticos (IMC, % gordura, etc.)
- [x] Gráficos de evolução das medidas
- [x] Comparação com avaliações anteriores
- [x] Exportação de relatórios

---

## FASE 5: SISTEMA DE CONSULTAS

### 5.1 Calendário de Consultas
- [x] Integrar FullCalendar existente
- [x] Personalizar para consultas nutricionais
- [x] Diferentes tipos de consulta (primeira consulta, retorno, online)
- [x] Cores por status (agendada, realizada, cancelada)
- [x] Arrastar e soltar para reagendar
- [x] Visualização por dia/semana/mês

### 5.2 Agendamento de Consultas
- [x] Formulário de novo agendamento
- [x] Seleção de paciente
- [x] Escolha de horário disponível
- [x] Tipo de consulta
- [x] Observações
- [x] Notificações automáticas

### 5.3 Consulta em Andamento
- [x] Interface de consulta ativa
- [x] Formulário de evolução
- [x] Registro de peso/medidas
- [x] Anotações da consulta
- [x] Prescrição de plano alimentar
- [x] Orientações nutricionais
- [x] Agendamento da próxima consulta

### 5.4 Histórico de Consultas
- [x] Lista de todas as consultas por paciente
- [x] Filtros por período, tipo, status
- [x] Visualização detalhada de cada consulta
- [x] Exportação de relatórios

---

## FASE 6: PLANOS ALIMENTARES

### 6.1 Lista de Planos
- [x] Página `/meal-plans` com todos os planos
- [ ] Filtros por paciente, status, data
- [ ] Templates de planos
- [ ] Duplicação de planos existentes

### 6.2 Criador de Planos Alimentares
- [x] Interface drag-and-drop para montar planos
- [ ] Banco de alimentos com informações nutricionais
- [ ] Cálculo automático de macros e calorias
- [ ] Substituições de alimentos
- [ ] Divisão por refeições (café, almoço, lanche, jantar)
- [ ] Orientações especiais
- [ ] Preview para impressão

### 6.3 Banco de Alimentos
- [x] Cadastro de alimentos
- [ ] Informações nutricionais completas
- [ ] Categorização de alimentos
- [ ] Busca e filtros
- [ ] Importação de dados TACO/USDA

### 6.4 Templates de Planos
- [x] Criação de templates reutilizáveis
- [ ] Categorização por objetivo (emagrecimento, ganho de massa, etc.)
- [ ] Compartilhamento entre nutricionistas
- [ ] Personalização de templates

---

## FASE 7: RELATÓRIOS E ANÁLISES

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

## FASE 8: FUNCIONALIDADES AVANÇADAS

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

## FASE 9: PERSONALIZAÇÃO VISUAL

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

## FASE 10: TESTES E QUALIDADE

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

## FASE 11: DEPLOY E PRODUÇÃO

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

## FASE 12: MELHORIAS FUTURAS

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

## PRIORIZAÇÃO

### Alta Prioridade (MVP)
- Fases 1-5: Configuração, estrutura, pacientes e consultas básicas

### Média Prioridade
- Fases 6-8: Planos alimentares e relatórios

### Baixa Prioridade
- Fases 9-12: Personalização, testes avançados e melhorias futuras

---

## Notas Importantes

1. **Cada fase deve ser testada antes de prosseguir para a próxima**
2. **Manter backups regulares durante o desenvolvimento**
3. **Documentar mudanças significativas no código**
4. **Considerar feedback dos usuários durante o desenvolvimento**
5. **Priorizar performance e usabilidade em dispositivos móveis**

---

*Última atualização: $(date)*
*Status: Em planejamento*
