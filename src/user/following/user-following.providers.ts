import { DataSource } from 'typeorm';
import { UserFollowing } from './entity/user-following.entity';

export const userFollowingProviders = [
  {
    provide: 'USER_FOLLOWING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserFollowing),
    inject: ['DATA_SOURCE'],
  },
];
