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
import { AuthGuard } from '@nestjs/passport';
import { LeavesService } from './leaves.service';
import { Leave } from './leaves.entity';

@Controller('leaves')
@UseGuards(AuthGuard('jwt'))
export class LeavesController {
  constructor(private readonly leaveService: LeavesService) {}

  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @Post()
  async applyLeave(
    @Body('employeeId') employeeId: number,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('reason') reason: string,
  ) {
    return this.leaveService.applyLeave(
      employeeId,
      new Date(startDate),
      new Date(endDate),
      reason,
    );
  }

  @Patch(':id')
  async editLeave(@Param('id') id: number, @Body() leave: Partial<Leave>) {
    return this.leaveService.editLeave(id, leave);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.leaveService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Leave> {
    return this.leaveService.findOne(id);
  }
}
