import { Exclude } from 'class-transformer';
import { UserGender } from 'src/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: 'male',
  })
  gender: string;
}
