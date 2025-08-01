# Plano de Adequação da Marca — BodyKall

Este documento detalha o plano de ação para atualizar a identidade visual do sistema BodyKall, com base no guia de branding definido em `doc/branding.md`. O objetivo é realizar uma atualização sutil, mantendo a estética moderna e clean do design atual.

---

## 1. Análise de Arquivos-Chave

Para aplicar as novas diretrizes de branding, os seguintes arquivos foram identificados como pontos centrais de modificação:

- **`tailwind.config.ts`**: Arquivo principal para a configuração de cores, fontes, sombras e bordas.
- **`src/app/globals.css`**: Onde as variáveis de cores globais e a importação de fontes são definidas.
- **`src/app/layout.tsx`**: Componente raiz que aplica as fontes e estilos globais ao corpo da aplicação.
- **`src/components/`**: Verificação de componentes específicos que possam ter estilos ou cores hardcoded (não-padrão).
- **`public/images/logo/`**: Diretório onde os arquivos de logotipo estão armazenados.

---

## 2. Plano de Ação

### 2.1. Cores

As cores do sistema serão atualizadas para refletir a nova paleta.

- **Ação:** Modificar o arquivo `tailwind.config.ts` para incluir as novas cores.
- **Paleta:**
  - `primary`: `#6FCF97`
  - `secondary`: `#34495E`
  - `body` ou `background-light`: `#FFFFFF`
  - `bodydark` ou `background-dark`: `#F8F9FA`
  - `strokedark` ou `text-neutral`: `#6B6B6B`

As variáveis de cor correspondentes em `src/app/globals.css` também serão atualizadas para garantir consistência.

### 2.2. Tipografia

A fonte principal será padronizada para **Poppins**, conforme sugerido no guia.

- **Ação 1:** Atualizar a importação da fonte no arquivo `src/app/layout.tsx` para incluir os pesos `light` (300), `regular` (400), `semibold` (600) e `bold` (700).
- **Ação 2:** Configurar a família de fontes `sans` no arquivo `tailwind.config.ts` para que "Poppins" seja a fonte padrão.

### 2.3. Layout e Estilo

Os ajustes de layout e estilo garantirão uma aparência coesa e moderna.

- **Bordas:**
  - **Ação:** Verificar e padronizar o `borderRadius` no `tailwind.config.ts` para `8px`.
- **Sombras:**
  - **Ação:** Definir uma nova sombra `box-shadow` no `tailwind.config.ts` com o valor `0 2px 4px rgba(0,0,0,0.05)`.
- **Espaçamento:**
  - **Ação:** Revisar os principais componentes em `src/components/` para garantir que o espaçamento entre seções e o padding interno sigam as diretrizes (24px e 12-16px, respectivamente).

### 2.4. Logotipo e Ícones

O logotipo e os ícones são a assinatura visual da marca.

- **Logotipo:**
  - **Ação:** Substituir os logotipos existentes em `public/images/logo/` por novas versões que utilizem as cores `#6FCF97` e `#34495E`. *Nota: Os novos arquivos de logo precisam ser criados e disponibilizados.*
- **Ícones:**
  - **Ação:** Realizar uma auditoria nos ícones em `src/icons/`. Os ícones existentes, em sua maioria, já seguem um estilo linear e minimalista, o que está alinhado com o guia. Nenhuma grande alteração é necessária inicialmente, mas ícones futuros devem seguir este padrão.

---

## 3. Cronograma de Execução

1.  **Fase 1 (Imediata):**
    - Atualização de cores e tipografia (`tailwind.config.ts`, `globals.css`, `layout.tsx`).
    - Ajuste de bordas e sombras.
2.  **Fase 2 (Requer Assets):**
    - Substituição dos arquivos de logotipo assim que estiverem disponíveis.
3.  **Fase 3 (Contínua):**
    - Revisão gradual dos componentes para garantir a aplicação consistente do espaçamento.
    - Validação dos ícones durante o desenvolvimento de novas funcionalidades.

Este plano garante uma transição suave e eficiente para a nova identidade visual, preservando a qualidade da experiência do usuário.
