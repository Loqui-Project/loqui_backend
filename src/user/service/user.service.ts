import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { User } from '../entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findBy(key: string, value: string): Promise<User> {
    const user = await this.userRepository.findOne({
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
    return await this.userRepository.find({});
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
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
    this.userRepository.merge(user, newUser);
    return await this.userRepository.save(user);
  }

  async delete(id: string | number) {
    return await this.userRepository.delete(id);
  }
}
