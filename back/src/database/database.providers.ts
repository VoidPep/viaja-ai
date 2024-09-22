import datasource from './datasource';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource =datasource ;

      return dataSource.initialize();
    },
  },
];