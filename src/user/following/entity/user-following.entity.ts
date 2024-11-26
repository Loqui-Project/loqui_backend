import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../entity/user.entity';

@Entity()
export class UserFollowing {
  @PrimaryGeneratedColumn()
  _id: number;

  @ApiProperty({
    example: '1',
    description: 'ID of the follower user',
  })
  @Column()
  follower_id: number;

  @ApiProperty({
    example: '2',
    description: 'ID of the following user',
  })
  @Column()
  following_id: number;

  @ApiProperty({
    example: 'Test User',
    description: 'The name of the User',
  })
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

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'follower_id' })
  follower?: User;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email of the User',
  })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'following_id' })
  following?: User;
}
