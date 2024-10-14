import { IsDate, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  date: Date;
}
