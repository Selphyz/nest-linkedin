import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { FeedPostEntity } from '../../feed/models/post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;
  @Column({ nullable: true })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  feedPosts: FeedPostEntity[];
}
