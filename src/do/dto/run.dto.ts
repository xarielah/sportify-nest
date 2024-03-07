import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class NewRunDTO {
  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsNotEmpty()
  @IsString()
  @IsNumber()
  time: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  length: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 5)
  steps: string;
}
