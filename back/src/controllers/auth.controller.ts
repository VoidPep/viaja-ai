import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from "../services/account/auth.service";
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}