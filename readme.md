1. Configurar o Ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar código que esta em .env.example e cole em um novo arquivo chamado .env em viaja-ai/back/viaja-ai
Se estiver executando o Prisma e o PostgreSQL dentro de contêineres Docker, use o nome do serviço definido no docker-compose.yml:

2. Executar os Contêineres
Para iniciar os serviços do Docker, use o comando:

bash
Copiar código
docker-compose up --build
Isso iniciará os contêineres do PostgreSQL e Prisma.

3. Configurar o Prisma
Se você ainda não tiver o banco de dados configurado, você pode criar as tabelas e aplicar as migrações usando o Prisma. Certifique-se de que o contêiner do PostgreSQL esteja em execução, e então execute:

docker-compose exec prisma npx prisma migrate dev --name init
docker-compose exec prisma npx prisma generate
Esses comandos aplicam as migrações e geram o cliente Prisma.
