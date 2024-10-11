import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) return false;

        try {
            request.user = this.jwtService.verify(token);
            return true;
        } catch (err) {
            return false;
        }
    }
}