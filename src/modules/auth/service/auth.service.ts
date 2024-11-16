import { Injectable, Dependencies } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findBy('username', username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
