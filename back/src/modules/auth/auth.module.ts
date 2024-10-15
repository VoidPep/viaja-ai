import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "../../controllers/auth.controller";
import { AuthService } from "../../services/account/auth.service";
import { UsuarioModule } from "../user/user.module";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        UsuarioModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
          }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}