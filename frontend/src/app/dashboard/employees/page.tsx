import fetcher from '@/helpers/fetcher'
import { cookies } from 'next/headers'
import { Employee } from '@/interfaces/employee'
import { ListEmployees } from './listEmployee'
import AddEmployee from './addEmployee'

export default async function EmployeesPage() {
  const token = (await cookies()).get('token')?.value
  const employees = (
    await fetcher<Employee[]>({
      method: 'GET',
      endpoint: 'employees',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Daftar Pegawai</h1>
      <AddEmployee token={token!} />
      <ListEmployees employees={employees} />
    </>
  )
}
