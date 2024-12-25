import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admins.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() user: Partial<Admin>): Promise<Admin> {
    return this.adminService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.adminService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() user: Partial<Admin>,
  ): Promise<Admin> {
    return this.adminService.update(id, user);
  }
}
