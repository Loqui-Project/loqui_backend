import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserFollowingService } from '../service/user-following.service';
import { UserFollowing } from '../entity/user-following.entity';
import { UserFollowingDTO } from '../dto/user-following.dto';

@Controller('user/following')
export class UserFollowingController {
  constructor(private useFollowingService: UserFollowingService) {}

  @Get(':userId')
  async findAllUsers(
    @Param('userId') userId: number,
  ): Promise<UserFollowing[]> {
    return await this.useFollowingService.findAll(userId, true);
  }

  @Post(':userId')
  async createUser(@Body() data: UserFollowingDTO): Promise<UserFollowing> {
    return await this.useFollowingService.create(
      data.follower_id,
      data.following_id,
    );
  }
}
