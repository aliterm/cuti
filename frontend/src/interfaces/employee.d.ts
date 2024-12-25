import { Leave } from './leave'

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  gender: string
  leaves: Leave[]
}
