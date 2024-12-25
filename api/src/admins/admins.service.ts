import { BadRequestException, Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admins.entity';
import * as bcrypt from 'bcrypt';
import e from 'express';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        throw new BadRequestException('Admin tidak ditemukan');
      }
      return admin;
    } catch {
      throw new BadRequestException('Admin tidak ditemukan');
    }
  }

  async create(admin: Partial<Admin>): Promise<Admin> {
    try {
      const hashedPassword = await bcrypt.hash(
        admin.password,
        bcrypt.genSaltSync(),
      );
      admin.password = hashedPassword;
      const createdAdmin = await this.adminRepository.save(admin);

      return createdAdmin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async update(id: number, user: Partial<Admin>): Promise<Admin> {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        bcrypt.genSaltSync(),
      );
      user.password = hashedPassword;
    }
    await this.adminRepository.update(id, user);
    return this.adminRepository.findOneBy({ id });
  }
}
