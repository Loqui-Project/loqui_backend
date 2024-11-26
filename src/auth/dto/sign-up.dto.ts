import { UserDto } from '@/user/dto';
import { PickType } from '@nestjs/swagger';

export class SignUpDTO extends PickType(UserDto, [
  'username',
  'password',
  'email',
  'name',
]) {}
