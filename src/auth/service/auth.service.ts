import { Injectable, ForbiddenException } from '@nestjs/common';
import { SignUpDTO } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@/user/entity';
import { UserService } from '@/user/service';
import { Tokens, JwtPayload } from '../types/jwt-payload';
import { UserDto } from '@/user/dto';
import { SignUpSchemaType } from '../schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async signIn(username: string, pass: string): Promise<Tokens> {
    const user = await this.userService.findBy('username', username);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    console.log(user);
    if (user.password !== pass) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id, user.email);
    return tokens;
  }

  async signUp(body: SignUpSchemaType): Promise<Omit<User, 'password'>> {
    return await this.userService.createUser(body as unknown as UserDto);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
