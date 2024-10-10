import { Injectable } from '@nestjs/common';
import { AccountService } from '../../services/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(nome: string, password: string) {
    const user = await this.accountService.findByNome(nome);

    if (user && await this.accountService.validatePassword(password, user.senha)) {
      const payload = { nome: user.nome, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return { message: 'Invalid credentials' };
  }
}
