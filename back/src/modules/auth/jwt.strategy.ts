import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from '../../services/account/account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey', 
    });
  }

  async validate(payload: any) {
    
    return { userId: payload.sub, username: payload.username };
  }
}
