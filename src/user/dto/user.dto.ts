import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({
    example: 'Test User',
    description: 'the name of the User',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'the email of the User',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'test_user',
    description: 'the username of the User',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'the password of the User',
  })
  readonly password: string;
}
