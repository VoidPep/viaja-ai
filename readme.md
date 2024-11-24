npm install dentro da pasta front e back


### Back
Comandos para gerar e rodar migrations pelo prisma
```bash
npx typeorm-ts-node-commonjs migration:generate -d src/database/datasource.ts src/migrations/NomeDaMigration
```

```bash
npx typeorm-ts-node-commonjs migration:run -d src/database/datasource.ts
```