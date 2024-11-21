import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "./user.service";
import { UsuarioRequest } from "../../modules/user/dto/usuario.request";
import { LoginRequest } from "../../modules/user/dto/login.request";
import { PlanoService } from '../planos/plano.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsuarioService,
        private planosService: PlanoService,
    ) {
    }

    async ativarPlano(body: any) {
        const { plano, idUsuario } = body;

        const usuario = await this.usersService.findOne(idUsuario);
        if (!usuario) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }
        const planoExistente = await this.planosService.findPlanoByDescricao(plano);

        let planoRelacionado;
        if (!planoExistente) {
            planoRelacionado = await this.planosService.createPlano({descricao: plano, valor: 0});
        } else {
            planoRelacionado = planoExistente;
        }

        usuario.plano = planoRelacionado;
        await this.usersService.update(idUsuario, { plano: planoRelacionado });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);

        if (user && await compare(password, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: LoginRequest) {
        const result = await this.validateUser(user.email, user.senha);
        const usuario = await this.usersService.findUserByEmail(user.email);

        const payload = {
            sub: result.id,
            username: result.nome,
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
            id: result.id,
            plano: usuario.plano
        };
    }

    async register(user: UsuarioRequest) {
        const usuarioDoBanco = await this.usersService.findUserByEmail(user.email);

        if (usuarioDoBanco)
            throw new HttpException('O e-mail já está cadastrado', HttpStatus.BAD_REQUEST);

        try {
            const usuario = await this.usersService.create(user);

            const jwt = this.jwtService.sign(user);

            return {
                access_token: jwt,
                id: usuario.data ? usuario.data.id : null
            };
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}