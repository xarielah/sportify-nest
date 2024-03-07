import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Global()
@Module({
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
