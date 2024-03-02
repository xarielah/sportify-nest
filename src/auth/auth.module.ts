import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/googe.strategy';

@Global()
@Module({
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
