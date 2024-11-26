import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UserFollowingDTO {
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ID of the follower user',
  })
  readonly follower_id: number;

  @IsInt()
  @ApiProperty({
    example: '2',
    description: 'ID of the following user',
  })
  readonly following_id: number;
}
