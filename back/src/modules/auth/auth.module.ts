import {Module} from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from "../../controllers/auth.controller";
import {AuthService} from "../../services/account/auth.service";
import {UsuarioModule} from "../user/user.module";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: 'secretKey', // Use env variables for production
            signOptions: {expiresIn: '60m'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    exports: [AuthService],
})
export class AuthModule {
}