import { Role } from '../decorator/role.enum';

export class TokenPayloadDto {
  _id: string;
  name: string;
  email: string;
  role?: Role[];
}
