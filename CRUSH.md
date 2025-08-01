# CRUSH.md

> Guia de referência para agentes automáticos no projeto BodyKal (Next.js + Tailwind + Prisma)

## Comandos de build, lint e test

- **Instalar dependências:**   `npm install`
- **Rodar ambiente dev:**      `npm run dev`
- **Build produção:**          `npm run build`
- **Serviço produção:**        `npm run start`
- **Lint:**                    `npm run lint`
- **Rodar testes:**            *Não há comando de testes configurado explicitamente no package.json. Recomenda-se integração com Jest, Vitest ou Playwright se for necessário.*
- **Rodar lint em um arquivo:** `npx next lint <file>`

## Estilo e Convenções de Código

- **Imports:**
  - Use imports absolutos a partir de `/src` sempre que possível
  - Agrupe módulos de terceiros acima dos locais

- **Formatação:**
  - Siga o padrão do Prettier (verifique `prettier.config.js` se houver)
  - 2 espaços para indentação
  - Pontuação obrigatória em arquivos TS(X)

- **Tipos e Safety:**
  - Use TypeScript (tipos explícitos sempre que possível)
  - Prefira types do Prisma, Next.js e React

- **Nomeação:**
  - Componentes em PascalCase
  - Funções, variáveis e hooks em camelCase
  - Pastas e arquivos: kebab-case
  - Contextos: `<Name>Context.tsx`, Hooks: `use<Name>.ts`

- **Erros e Promises:**
  - Prefira `try/catch` e tratamento próprio nos endpoints
  - Não exponha erros sensíveis no frontend

- **Componentes React:**
  - Function components (arrow function)
  - Props tipadas (interface ou type)

- **Outros:**
  - Não commit segredos ou `.env*`
  - Mantenha `.crush` no `.gitignore`
  - Use ESLint/Prettier/Lint antes de commit
  - Não adicione comentários supérfluos
  - Estruture novas páginas sob `/src/app/(admin)/` ou `/src/app/(full-width-pages)/` conforme modelos existentes

Adapte os comandos caso a configuração do projeto mude. Para ajustes de CI, configure test ou lint runners em scripts do `package.json`.
