import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from "../../controllers/auth.controller";
import { AuthService } from "../../services/account/auth.service";
import { UsuarioModule } from "../user/user.module";
dotenv.config();

@Module({
    imports: [
        UsuarioModule,
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
          }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}