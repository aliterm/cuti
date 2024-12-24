import { UserGender } from 'src/enum';
import { Leave } from 'src/leaves/leaves.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: 'male',
  })
  gender: string;

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[];
}
