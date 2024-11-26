import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { faker } from '@faker-js/faker';

describe('User Service', () => {
  let userService: UserService;
  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(UserService).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456',
      username: faker.internet.username(),
    } as UserDto;

    const user = {
      ...createUserDto,
      _id: Date.now(),
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = await userService.createUser(createUserDto);

    // assert
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
    const user = {
      _id: Date.now(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
    } as User;
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    //act
    const result = await userService.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });
  it('findOne => should find a user by a given id and return its data', async () => {
    const id = 1;
    const user = {
      _id: Date.now(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
    } as User;

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    const result = await userService.findById(id);
    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      select: ['_id', 'name', 'email', 'username'],
      where: { _id: id },
    });
  });
  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const user = {
      _id: Date.now(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
    } as User;

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    //act
    const result = await userService.delete(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toHaveBeenCalled();
    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
  });
});
