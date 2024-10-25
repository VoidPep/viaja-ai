import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services/account/auth.service";
import {UsuarioRequest} from "../modules/user/dto/usuario.request";
import {LoginRequest} from "../modules/user/dto/login.request";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: UsuarioRequest) {
        return await this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: LoginRequest) {
        return await this.authService.login(body);
    }
}