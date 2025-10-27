### 🧭 Viaja.AI

Plataforma full-stack para planejamento de viagens utilizando IA com foco em integração e automação.

🚀 Tecnologias

Frontend: Vue 3 + TypeScript

Backend: Node.js + TypeORM + Express

Banco: PostgreSQL

Ferramentas: Prisma, Docker, ESLint, Prettier

#### ⚙️ Configuração

Clone o repositório:
```bash
git clone https://github.com/VoidPep/viaja-ai.git
```


Instale dependências em ambos os diretórios:
```bash
cd front && npm install
cd ../back && npm install
```

Configure o .env com as credenciais do banco.

Gere e rode as migrations:
```bash
npx typeorm-ts-node-commonjs migration:generate -d src/database/datasource.ts src/migrations/NomeDaMigration
npx typeorm-ts-node-commonjs migration:run -d src/database/datasource.ts
```

Inicie o backend e o frontend:
```bash
npm run dev
```

#### 🧩 Funcionalidades

- CRUD completo de destinos e viagens

- Integração entre front e back via REST API

- Persistência de dados com migrations e TypeORM

- Estrutura modular e escalável

#### 🏗️ Futuras melhorias

- Deploy automatizado (CI/CD via GitHub Actions)

- Integração com APIs externas (ex: Google Maps, Clima)

- Testes automatizados completos

### 📘 Objetivo do projeto

O Viaja.AI nasceu como estudo prático de arquitetura full-stack, boas práticas de integração e uso de TypeORM com migrations.
O foco é demonstrar domínio de frontend moderno e backend estruturado, reforçando padrões de projeto e escalabilidade.
Além de mostrar o poder que OLMs podem ter dentro de projetos