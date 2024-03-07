import { Injectable } from '@nestjs/common';
import { NewRunDTO } from './dto/run.dto';
import { NewWorkoutDTO } from './dto/workout.dto';

@Injectable()
export class DoService {
  public addRun(data: NewRunDTO): void {
    console.log('🚀 ~ DoService ~ data:', data);
  }

  public addWorkout(data: NewWorkoutDTO): void {
    console.log('🚀 ~ DoService ~ data:', data);
  }
}
