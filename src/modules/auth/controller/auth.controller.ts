import { Controller, Bind, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Bind(Request())
  async login(req) {
    return req.user;
  }
}
