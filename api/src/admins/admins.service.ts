import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admins.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async create(admin: Partial<Admin>): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(
      admin.password,
      bcrypt.genSaltSync(),
    ); // Hash the password
    admin.password = hashedPassword;
    return this.adminRepository.save(admin);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
