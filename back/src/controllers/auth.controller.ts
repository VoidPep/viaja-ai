import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services/account/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body) {
        return await this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body) {
        return await this.authService.login(body);
    }
}