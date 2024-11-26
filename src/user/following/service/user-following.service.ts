import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserFollowing } from '../entity/user-following.entity';

@Injectable()
export class UserFollowingService {
  constructor(
    @Inject('USER_FOLLOWING_REPOSITORY')
    private userFollowingRepository: Repository<UserFollowing>,
  ) {}

  async findAll(userId: number, followers: boolean): Promise<UserFollowing[]> {
    return await this.userFollowingRepository.find({
      where: { follower_id: userId },
      select: {
        _id: true,
        follower: {
          _id: true,
          name: true,
          email: true,
        },
        following: {
          _id: true,
          name: true,
          email: true,
        },
      },
      relations: {
        follower: true,
        following: true,
      },
    });
  }

  async create(userId: number, follower_id: number): Promise<UserFollowing> {
    try {
      const user = new UserFollowing();
      user.follower_id = userId;
      user.following_id = follower_id;
      return await this.userFollowingRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Something went wrong', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
}
