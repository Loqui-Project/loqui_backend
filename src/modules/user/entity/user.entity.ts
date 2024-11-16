import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @ApiProperty({
    example: 'Test User',
    description: 'The name of the User',
  })
  @Column({ length: 500 })
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email of the User',
  })
  @Column({
    name: 'email',
    length: 255,
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'test_user',
    description: 'The username of the User',
  })
  @Column({
    name: 'username',
    length: 255,
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the User',
  })
  @Column({ name: 'password', nullable: false, type: 'varchar' })
  password: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: string;
}
