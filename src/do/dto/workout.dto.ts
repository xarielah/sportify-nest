import { IsNotEmpty, IsString, Length } from 'class-validator';

export class NewWorkoutDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  comment: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 3)
  length: string;
}
