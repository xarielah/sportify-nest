import { Global, Module } from '@nestjs/common';

// Import all controllers from the controllers directory
import * as controllers from './controllers';
import { AuthModule, AuthService } from 'src/auth';
import { GoogleStrategy } from 'src/auth/strategies/googe.strategy';

@Global()
@Module({
  // Import relevant modules
  imports: [AuthModule],

  // Register relevant providers
  providers: [GoogleStrategy, AuthService],

  // Register all controllers from the controllers object
  controllers: Object.values(controllers),
})
export class BaseModule {}
