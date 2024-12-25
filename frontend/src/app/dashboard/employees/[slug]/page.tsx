import { cookies } from 'next/headers'
import EditEmployeeForm from '../editEmployeeForm'
import { Employee } from '@/interfaces/employee'
import fetcher from '@/helpers/fetcher'

export default async function EditAdmin({ params }: { params: { slug: string } }) {
  const token = (await cookies()).get('token')?.value
  const employee = (
    await fetcher<Employee>({
      method: 'GET',
      endpoint: `employees/${Number(params.slug)}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Pegawai</h1>
      <EditEmployeeForm token={token!} id={Number(params.slug)} employee={employee} />
    </>
  )
}
