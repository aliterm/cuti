import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { Leave } from './leaves.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, Employee])],
  providers: [LeavesService],
  controllers: [LeavesController],
})
export class LeavesModule {}
