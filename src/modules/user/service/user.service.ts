import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findBy(key: string, value: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['_id', 'name', 'email', 'username'],
      where: { [key]: value },
    });
    if (!user) {
      throw new HttpException(
        `User with ${key}: ${value} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['_id', 'name', 'email', 'username'],
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      select: ['_id', 'name', 'email', 'username'],
      where: { _id: id },
    });
  }

  async createUser(user: UserDto) {
    return await this.userRepository.save(user);
  }

  async update(id: number, newUser: UserDto) {
    const user = await this.userRepository.findOne({
      where: { _id: id },
    });
    await this.userRepository.merge(user, newUser);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
