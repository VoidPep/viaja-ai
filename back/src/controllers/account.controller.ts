import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountService } from '../services/account/account.service';
import { AuthService } from '../modules/auth/auth.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}


  @Post('register')
  async register(
    @Body('nome') nome: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('cpf') cpf: string,
    @Body('administrador') administrador: boolean,
  ) {
    const newUser = await this.accountService.createAccount(
      nome,
      password,
      email,
      cpf,
      administrador,
    );
    return newUser;
  }


  @Post('login')
  async login(
    @Body('nome') nome: string,
    @Body('password') password: string,
  ) {
    const user = await this.accountService.findByNome(nome);

    if (user && await this.accountService.validatePassword(password, user.senha)) {
 
      return this.authService.login(user.nome, password);
    }

    return { message: 'Invalid credentials' };
  }


  @Get('profile')
  getProfile() {
 
    return { message: 'Perfil do usuário' };
  }
}
