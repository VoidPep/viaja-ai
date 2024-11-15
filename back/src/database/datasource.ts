import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'c9pv5s2sq0i76o.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    port: 5432,
    username: 'ujvnjc9qmq3li',
    password: 'p9c9d5f2445be400442508f20009ab59fe332275d046fac947d93056809ab6f43',
    database: 'db3r0fe689826f',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    migrations: [
      __dirname + '/../migrations/*{.ts,.js}'  // Diretório onde ficam as migrações
  ],
  })