import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeavesService } from './leaves.service';

@Controller('leaves')
@UseGuards(AuthGuard('jwt'))
export class LeavesController {
  constructor(private readonly leaveService: LeavesService) {}

  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @Post(':employeeId')
  async applyLeave(
    @Param('employeeId') employeeId: number,
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
}
