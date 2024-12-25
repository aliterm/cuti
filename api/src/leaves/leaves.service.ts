import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './leaves.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/employees.entity';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Leave[]> {
    return this.leaveRepository.find({
      relations: {
        employee: true,
      },
    });
  }

  create(leave: Partial<Leave>): Promise<Leave> {
    return this.leaveRepository.save(leave);
  }

  private calculateDaysBetween(startDate: Date, endDate: Date): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  }

  async applyLeave(
    employeeId: number,
    startDate: Date,
    endDate: Date,
    reason: string,
    isEdit: boolean = false,
  ): Promise<Leave> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['leaves'],
    });

    if (!employee) throw new BadRequestException('Pegawai tidak ditemukan');

    if (endDate < startDate) {
      throw new BadRequestException(
        'Tanggal akhir harus lebih besar dari tanggal awal',
      );
    }

    const totalDays = this.calculateDaysBetween(startDate, endDate);
    const year = startDate.getFullYear();

    // Check cuti tahunan
    const yearlyLeaves = employee.leaves.filter(
      (leave) =>
        leave.startDate.getFullYear() === year ||
        leave.endDate.getFullYear() === year,
    );
    const usedDays = yearlyLeaves.reduce((acc, leave) => {
      const leaveStart = leave.startDate.getTime();
      const leaveEnd = leave.endDate.getTime();
      const leaveDays = this.calculateDaysBetween(
        leave.startDate,
        leave.endDate,
      );
      if (leaveStart <= endDate.getTime() && leaveEnd >= startDate.getTime()) {
        throw new BadRequestException(
          'Cuti tahunan sudah digunakan pada tanggal tersebut',
        );
      }
      return acc + leaveDays;
    }, 0);

    if (usedDays + totalDays > 12) {
      throw new BadRequestException(
        'Total hari cuti dalam satu tahun tidak boleh lebih dari 12 hari.',
      );
    }

    // Check monthly leave limit
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    if (startMonth !== endMonth) {
      throw new BadRequestException(
        'Cuti tidak boleh melewati lebih dari satu bulan.',
      );
    }

    const monthlyLeaves = yearlyLeaves.filter(
      (leave) => leave.startDate.getMonth() === startMonth,
    );

    if (!isEdit) {
      if (monthlyLeaves.length >= 1) {
        throw new BadRequestException(
          'Cuti hanya diperbolehkan satu kali dalam satu bulan.',
        );
      }
    }

    const newLeave = this.leaveRepository.create({
      startDate,
      endDate,
      employee,
      reason,
    });

    return this.leaveRepository.save(newLeave);
  }

  async editLeave(id: number, leave: Partial<Leave>): Promise<Leave> {
    const existingLeave = await this.leaveRepository.findOne({
      where: { id },
      relations: {
        employee: true,
      },
    });
    if (!existingLeave) {
      throw new BadRequestException('Cuti tidak ditemukan');
    }

    return this.applyLeave(
      existingLeave.employee.id,
      new Date(leave.startDate),
      new Date(leave.endDate),
      leave.reason,
      true,
    );
  }

  async remove(id: number): Promise<void> {
    await this.leaveRepository.delete(id);
  }
}
