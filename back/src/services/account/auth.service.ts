import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {compare} from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {UsuarioService} from "./user.service";
import {UsuarioRequest} from "../../modules/user/dto/usuario.request";
import {LoginRequest} from "../../modules/user/dto/login.request";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsuarioService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);

        if (user && await compare(password, user.senha)) {
            const {senha, ...result} = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: LoginRequest) {
        const result = await this.validateUser(user.email, user.senha);

        const payload = {
            sub: result.id,
            username: result.nome
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(user: UsuarioRequest) {
        const usuarioDoBanco = await this.usersService.findUserByEmail(user.email);

        if (usuarioDoBanco)
            throw new HttpException('O e-mail já está cadastrado', HttpStatus.BAD_REQUEST);

        const jwt = this.jwtService.sign(user);

        return {
            access_token: jwt,
        };
    }
}