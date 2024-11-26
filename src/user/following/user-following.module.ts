import { Module } from '@nestjs/common';
import { UserFollowingService } from './service/user-following.service';
import { UserFollowingController } from './controller/user-following.controller';
import { userFollowingProviders } from './user-following.providers';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserFollowingController],
  providers: [...userFollowingProviders, UserFollowingService],
  exports: [UserFollowingService],
})
export class UserFollowingModule {}
