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
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() employee: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.employeeService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() employee: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.update(id, employee);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }
}
