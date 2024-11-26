import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dto';
import { User } from '../entity';
import { UserService } from '../service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard, AuthGuard } from '@/common/guard';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  async createUser(@Body() user: User) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: UserDto) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
