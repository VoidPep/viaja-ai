import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
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
    signIn(@Body() signInDto: Record<string, string>) {
        return this.authService.login({email: signInDto.email, senha: signInDto.senha});
    }
}