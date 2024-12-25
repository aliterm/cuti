import { Employee } from './employee'
export interface Leave {
  id: number
  reason: string
  startDate: string
  endDate: string
  employee: Employee
}
