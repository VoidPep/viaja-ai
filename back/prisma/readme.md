## Passo a Passo de Implementação

### 1. Defina um modelo no `prisma.schema`

Abra o arquivo `prisma/schema.prisma` e defina o modelo de dados. Aqui utilizaremos um modelo simples de `User`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

O modelo `User` possui os seguintes campos:
- `id`: chave primária com auto-incremento.
- `email`: um campo único para armazenar o e-mail.
- `name`: o nome do usuário.
- `createdAt`: data e hora de criação, com valor padrão `now()`.
- `updatedAt`: data e hora de atualização, atualizada automaticamente com cada modificação.

### 2. Execute as Migrações

Após definir o modelo, execute o comando abaixo para gerar a migração e sincronizar o banco de dados:

```bash
npx prisma migrate dev --name init
```

Este comando cria a primeira migração e aplica as alterações ao banco de dados. Além disso, o cliente Prisma será gerado automaticamente.

### 3. Crie o Módulo e Serviço de Usuários (CRUD)

Agora, crie um módulo e um serviço para gerenciar os usuários:

- Gere o módulo e o serviço:

```bash
nest g module users
nest g service users
nest g controller users
```

- No serviço `users.service.ts`, implemente os métodos CRUD:

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### 4. Implemente o Controlador de Usuários

No controlador `users.controller.ts`, defina as rotas do CRUD:

```typescript
// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: Prisma.UserUpdateInput) {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
```

### 5. Importe os Módulos no AppModule

No arquivo `app.module.ts`, importe os módulos `PrismaModule` e `UsersModule`:

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
})
export class AppModule {}
```

### 7. Teste o CRUD de Usuários

Agora, você pode testar o CRUD utilizando ferramentas como Postman ou Insomnia. As rotas disponíveis são:

- `POST /users`: Cria um novo usuário.
- `GET /users`: Obtém a lista de usuários.
- `GET /users/:id`: Obtém um usuário específico por ID.
- `PUT /users/:id`: Atualiza um usuário.
- `DELETE /users/:id`: Deleta um usuário.

---