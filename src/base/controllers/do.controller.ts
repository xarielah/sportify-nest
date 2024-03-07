import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenExpiry } from 'src/auth/guards/token-expiry.guard';
import { DoService } from 'src/do/do.service';
import { NewRunDTO } from 'src/do/dto/run.dto';
import { NewWorkoutDTO } from 'src/do/dto/workout.dto';

// Using this guard means that we are checking if user is logged in or not,
// bad naming, I know :P
@UseGuards(TokenExpiry)
@Controller('do')
export class DoController {
  constructor(private readonly doService: DoService) {}
  @Post('/run')
  public async addUserRun(@Body() data: NewRunDTO) {
    return await this.doService.addRun(data);
  }

  @Post('/workout')
  public async addUserWorkout(@Body() data: NewWorkoutDTO) {
    return await this.doService.addWorkout(data);
  }
}
