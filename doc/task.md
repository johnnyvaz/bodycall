# Lista de Tarefas - Sistema de Gerenciamento de Nutricionistas

## <� Objetivo
Customizar o template TailAdmin Next.js para criar um sistema completo de gerenciamento de nutricionistas, incluindo gest�o de pacientes, consultas, planos alimentares e relat�rios.

---

## =� FASE 1: CONFIGURA��O E ESTRUTURA BASE

### 1.1 Configura��o Inicial
- [ ] Configurar conex�o com banco de dados MySQL
- [ ] Instalar depend�ncias adicionais (prisma, next-auth, etc.)
- [ ] Configurar vari�veis de ambiente (.env.local)
- [ ] Testar funcionamento do template base
- [ ] Configurar autentica��o com roles (Admin, Nutricionista, Cliente)

### 1.2 Estrutura do Banco de Dados
- [ ] Analisar schema existente (`banco_bodykal.sql`)
- [ ] Criar tabelas adicionais necess�rias:
  - [ ] `nutritionists` (dados espec�ficos de nutricionistas)
  - [ ] `patients` (dados de pacientes)
  - [ ] `appointments` (consultas/agendamentos)
  - [ ] `meal_plans` (planos alimentares)
  - [ ] `food_items` (alimentos)
  - [ ] `nutritional_assessment` (avalia��es nutricionais)
- [ ] Criar relacionamentos entre tabelas
- [ ] Configurar seeds/dados iniciais

---

## =� FASE 2: CUSTOMIZA��O DA NAVEGA��O E LAYOUT

### 2.1 Sidebar e Navega��o
- [ ] Customizar menu principal para nutricionistas:
  - [ ] Dashboard
  - [ ] Pacientes (Lista, Novo, Perfil)
  - [ ] Consultas (Agenda, Nova Consulta, Hist�rico)
  - [ ] Planos Alimentares (Lista, Novo Plano, Templates)
  - [ ] Relat�rios (Evolu��o, Estat�sticas)
  - [ ] Configura��es
- [ ] Implementar controle de acesso por role
- [ ] Customizar �cones do menu
- [ ] Ajustar breadcrumbs para novas p�ginas

### 2.2 Header e Layout
- [ ] Personalizar logo para BodyCal
- [ ] Ajustar dropdown do usu�rio
- [ ] Customizar notifica��es para contexto nutricional
- [ ] Implementar busca global de pacientes

---

## <� FASE 3: DASHBOARD PRINCIPAL

### 3.1 Dashboard do Nutricionista
- [ ] Substituir m�tricas de e-commerce por m�tricas de pacientes:
  - [ ] Total de pacientes ativos
  - [ ] Consultas do dia/semana
  - [ ] Metas de peso alcan�adas
  - [ ] Novos pacientes no m�s
- [ ] Criar gr�fico de evolu��o geral dos pacientes
- [ ] Implementar calend�rio de consultas na dashboard
- [ ] Lista de pr�ximas consultas
- [ ] Alertas e lembretes importantes
- [ ] Estat�sticas de ader�ncia aos planos

### 3.2 Dashboard do Admin
- [ ] M�tricas de sistema:
  - [ ] Total de nutricionistas
  - [ ] Total de pacientes
  - [ ] Consultas realizadas
  - [ ] Atividade dos nutricionistas
- [ ] Gr�ficos de crescimento da plataforma
- [ ] Relat�rios de uso do sistema

---

## =e FASE 4: GEST�O DE PACIENTES

### 4.1 Lista de Pacientes
- [ ] Criar p�gina `/patients` com tabela de pacientes
- [ ] Implementar filtros (status, data de cadastro, IMC, etc.)
- [ ] Busca por nome, email, telefone
- [ ] Pagina��o e ordena��o
- [ ] A��es r�pidas (ver perfil, nova consulta, editar)
- [ ] Indicadores visuais (status, �ltimas consultas)

### 4.2 Cadastro de Novo Paciente
- [ ] Criar p�gina `/patients/new`
- [ ] Formul�rio de dados pessoais
- [ ] Formul�rio de anamnese nutricional
- [ ] Upload de foto do paciente
- [ ] Hist�rico m�dico
- [ ] Objetivos nutricionais
- [ ] Valida��es e m�scaras nos campos

### 4.3 Perfil do Paciente
- [ ] Criar p�gina `/patients/[id]`
- [ ] Informa��es pessoais edit�veis
- [ ] Hist�rico de consultas
- [ ] Evolu��o de peso/medidas (gr�ficos)
- [ ] Planos alimentares ativos
- [ ] Fotos de progresso
- [ ] Notas do nutricionista
- [ ] Linha do tempo de evolu��o

### 4.4 Avalia��o Antropom�trica
- [ ] Formul�rio de medidas corporais
- [ ] C�lculos autom�ticos (IMC, % gordura, etc.)
- [ ] Gr�ficos de evolu��o das medidas
- [ ] Compara��o com avalia��es anteriores
- [ ] Exporta��o de relat�rios

---

## =� FASE 5: SISTEMA DE CONSULTAS

### 5.1 Calend�rio de Consultas
- [ ] Integrar FullCalendar existente
- [ ] Personalizar para consultas nutricionais
- [ ] Diferentes tipos de consulta (primeira consulta, retorno, online)
- [ ] Cores por status (agendada, realizada, cancelada)
- [ ] Arrastar e soltar para reagendar
- [ ] Visualiza��o por dia/semana/m�s

### 5.2 Agendamento de Consultas
- [ ] Formul�rio de novo agendamento
- [ ] Sele��o de paciente
- [ ] Escolha de hor�rio dispon�vel
- [ ] Tipo de consulta
- [ ] Observa��es
- [ ] Notifica��es autom�ticas

### 5.3 Consulta em Andamento
- [ ] Interface de consulta ativa
- [ ] Formul�rio de evolu��o
- [ ] Registro de peso/medidas
- [ ] Anota��es da consulta
- [ ] Prescri��o de plano alimentar
- [ ] Orienta��es nutricionais
- [ ] Agendamento da pr�xima consulta

### 5.4 Hist�rico de Consultas
- [ ] Lista de todas as consultas por paciente
- [ ] Filtros por per�odo, tipo, status
- [ ] Visualiza��o detalhada de cada consulta
- [ ] Exporta��o de relat�rios

---

## <} FASE 6: PLANOS ALIMENTARES

### 6.1 Lista de Planos
- [ ] P�gina `/meal-plans` com todos os planos
- [ ] Filtros por paciente, status, data
- [ ] Templates de planos
- [ ] Duplica��o de planos existentes

### 6.2 Criador de Planos Alimentares
- [ ] Interface drag-and-drop para montar planos
- [ ] Banco de alimentos com informa��es nutricionais
- [ ] C�lculo autom�tico de macros e calorias
- [ ] Substitui��es de alimentos
- [ ] Divis�o por refei��es (caf�, almo�o, lanche, jantar)
- [ ] Orienta��es especiais
- [ ] Preview para impress�o

### 6.3 Banco de Alimentos
- [ ] Cadastro de alimentos
- [ ] Informa��es nutricionais completas
- [ ] Categoriza��o de alimentos
- [ ] Busca e filtros
- [ ] Importa��o de dados TACO/USDA

### 6.4 Templates de Planos
- [ ] Cria��o de templates reutiliz�veis
- [ ] Categoriza��o por objetivo (emagrecimento, ganho de massa, etc.)
- [ ] Compartilhamento entre nutricionistas
- [ ] Personaliza��o de templates

---

## =� FASE 7: RELAT�RIOS E AN�LISES

### 7.1 Relat�rios de Paciente
- [ ] Relat�rio de evolu��o individual
- [ ] Gr�ficos de peso/medidas ao longo do tempo
- [ ] Ader�ncia ao plano alimentar
- [ ] An�lise de resultados
- [ ] Exporta��o em PDF

### 7.2 Relat�rios Gerais
- [ ] Estat�sticas do consult�rio
- [ ] Performance dos planos alimentares
- [ ] An�lise de resultados por per�odo
- [ ] Relat�rios financeiros (se aplic�vel)

### 7.3 Dashboards Anal�ticos
- [ ] Gr�ficos interativos com ApexCharts
- [ ] M�tricas de sucesso
- [ ] Compara��es e benchmarks
- [ ] Exporta��o de dados

---

## =' FASE 8: FUNCIONALIDADES AVAN�ADAS

### 8.1 Sistema de Notifica��es
- [ ] Lembretes de consultas
- [ ] Notifica��es de evolu��o
- [ ] Alertas de metas n�o atingidas
- [ ] Sistema de mensagens interno

### 8.2 Recursos Mobile
- [ ] Otimiza��o para dispositivos m�veis
- [ ] Progressive Web App (PWA)
- [ ] Funcionamento offline b�sico

### 8.3 Integra��es
- [ ] Integra��o com balan�as inteligentes
- [ ] APIs de nutri��o
- [ ] Sistema de pagamentos (se necess�rio)
- [ ] Backup autom�tico

---

## <� FASE 9: PERSONALIZA��O VISUAL

### 9.1 Branding
- [ ] Personalizar cores do tema para BodyCal
- [ ] Substituir logos e imagens
- [ ] Customizar favicon
- [ ] Ajustar tipografia

### 9.2 UX/UI Espec�fico
- [ ] �cones relacionados � nutri��o
- [ ] Imagens e ilustra��es tem�ticas
- [ ] Anima��es e microintera��es
- [ ] Acessibilidade e usabilidade

---

## >� FASE 10: TESTES E QUALIDADE

### 10.1 Testes Funcionais
- [ ] Testes de unidade para componentes
- [ ] Testes de integra��o
- [ ] Testes end-to-end com Cypress/Playwright
- [ ] Testes de performance

### 10.2 Valida��es e Seguran�a
- [ ] Valida��o de formul�rios
- [ ] Sanitiza��o de dados
- [ ] Prote��o contra CSRF/XSS
- [ ] Criptografia de dados sens�veis
- [ ] Backup e recupera��o

---

## =� FASE 11: DEPLOY E PRODU��O

### 11.1 Prepara��o para Deploy
- [ ] Otimiza��o de build
- [ ] Configura��o de ambiente de produ��o
- [ ] Setup de banco de dados produ��o
- [ ] Configura��o de CDN para imagens
- [ ] Monitoramento e logs

### 11.2 Documenta��o
- [ ] Manual do usu�rio
- [ ] Documenta��o t�cnica
- [ ] Guia de instala��o
- [ ] Documenta��o da API

---

## =� FASE 12: MELHORIAS FUTURAS

### 12.1 Funcionalidades Avan�adas
- [ ] IA para sugest�es de planos
- [ ] An�lise preditiva de resultados
- [ ] Chatbot para pacientes
- [ ] Integra��o com wearables

### 12.2 Expans�o
- [ ] Multi-tenancy para m�ltiplos consult�rios
- [ ] API p�blica para integra��es
- [ ] Marketplace de planos alimentares
- [ ] Sistema de teleconsulta integrado

---

## <� PRIORIZA��O

### =4 Alta Prioridade (MVP)
- Fases 1-5: Configura��o, estrutura, pacientes e consultas b�sicas

### =� M�dia Prioridade
- Fases 6-8: Planos alimentares e relat�rios

### =� Baixa Prioridade
- Fases 9-12: Personaliza��o, testes avan�ados e melhorias futuras

---

## =� Notas Importantes

1. **Cada fase deve ser testada antes de prosseguir para a pr�xima**
2. **Manter backups regulares durante o desenvolvimento**
3. **Documentar mudan�as significativas no c�digo**
4. **Considerar feedback dos usu�rios durante o desenvolvimento**
5. **Priorizar performance e usabilidade em dispositivos m�veis**

---

*�ltima atualiza��o: $(date)*
*Status: Em planejamento*