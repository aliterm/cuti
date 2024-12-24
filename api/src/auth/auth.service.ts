import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admins/admins.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
