import { DataSource } from 'typeorm';
import { Usuario } from './entity/user.entity';

export const usuarioProviders = [
  {
    provide: 'Usuario_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: ['DATA_SOURCE'],
  },
];
