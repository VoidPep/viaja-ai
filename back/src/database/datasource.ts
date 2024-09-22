import { DataSource } from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'viaja_ai',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    migrations: [
      __dirname + '/../migrations/*{.ts,.js}'  // Diretório onde ficam as migrações
  ],
  })