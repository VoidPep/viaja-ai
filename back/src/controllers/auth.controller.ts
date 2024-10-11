import {Body, Controller, Post, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import {AuthService} from "../services/account/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body) {
        return this.authService.register(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, string>, @Res() res: Response) {
        const jwt = this.authService.login({email: signInDto.email, senha: signInDto.senha});

        res.cookie('jwt', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        return res.send({ message: 'Login realizado com sucesso!' });
    }
}