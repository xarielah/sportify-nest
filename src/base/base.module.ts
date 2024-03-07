import { Global, Module } from '@nestjs/common';

// Import all controllers from the controllers directory
import { AuthModule, AuthService } from 'src/auth';
import { GoogleStrategy } from 'src/auth/strategies/googe.strategy';
import { DoModule } from 'src/do/do.module';
import { DoService } from 'src/do/do.service';
import * as controllers from './controllers';

@Global()
@Module({
  // Import relevant modules
  imports: [AuthModule, DoModule],

  // Register relevant providers
  providers: [GoogleStrategy, AuthService, DoService],

  // Register all controllers from the controllers object
  controllers: Object.values(controllers),
})
export class BaseModule {}
