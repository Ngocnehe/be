import { IsDate, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  name: string;

  date: Date;
}
