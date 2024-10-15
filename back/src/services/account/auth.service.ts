import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsuarioService } from "./user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsuarioService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(email);
        if (user && await compare(password, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const result = await this.validateUser(user.email, user.senha);
        
        const payload = {
            sub: result.id,
            username: result.nome
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(user: any) {
        try {
            const usuario = await this.usersService.create(user);
            if(usuario.error)
                return usuario;

            const jwt = this.jwtService.sign(usuario);
            return {
                access_token: jwt,
            };
        }
        catch (error) {
            return error;
        }

    }
}