import { Injectable } from '@nestjs/common';
import { Employee } from './employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: {
        leaves: true,
      },
    });
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: { leaves: true },
    });
  }

  create(employee: Partial<Employee>): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async update(id: number, employee: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.findOne(id);
  }
}
