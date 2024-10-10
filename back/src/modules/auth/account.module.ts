import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from '../../services/account/account.service';
import { AccountController } from '../../controllers/account.controller';
import { Usuario } from 'src/modules/user/entity/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AuthService, JwtStrategy],
  exports: [AccountService],
})
export class AccountModule {}
