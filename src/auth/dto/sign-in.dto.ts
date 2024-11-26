import { UserDto } from '@/user/dto';
import { PickType } from '@nestjs/swagger';

export class SignInDTO extends PickType(UserDto, ['username', 'password']) {}
