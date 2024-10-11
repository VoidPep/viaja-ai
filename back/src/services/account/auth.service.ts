import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {compare} from 'bcryptjs';
import {UsuarioService} from "./user.service";

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
            const {senha, ...result} = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = {username: user.email, sub: user.id};

        try {
            const validUser = await this.validateUser(user.email, user.senha);
            if (!validUser) return;
        } catch (e) {
            throw e;
        }

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {

    }
}