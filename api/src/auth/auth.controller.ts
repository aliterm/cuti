import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/admins.entity';
import { LoginDto } from './login-dto';
import { RegisterDto } from './register-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly adminService: AdminsService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const admin = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!admin) {
      throw new UnauthorizedException('Email atau password salah');
    }
    return this.authService.login(admin);
  }

  @Post('register')
  async register(@Body() register: RegisterDto) {
    return this.adminService.create(register);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const adminId = req.user.id;
    const admin = await this.adminService.findOne(adminId);
    return admin;
  }
}
