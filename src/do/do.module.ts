import { Module } from '@nestjs/common';
import { DoService } from './do.service';

@Module({
  exports: [DoModule],
  providers: [DoService],
})
export class DoModule {}
