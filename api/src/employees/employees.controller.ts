import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
}
