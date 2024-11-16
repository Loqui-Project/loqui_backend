import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
