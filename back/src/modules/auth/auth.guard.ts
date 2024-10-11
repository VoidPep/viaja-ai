import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {AuthService} from "../../services/account/auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const jwt = request.cookies['jwt'];

        if (!jwt) return false;

        return await this.authService.verifyJwt(jwt);
    }
}