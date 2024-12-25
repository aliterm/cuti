import { cookies } from 'next/headers'
import EditEmployeeForm from '../editEmployeeForm'

export default async function EditAdmin({ params }: { params: { slug: string } }) {
  const token = (await cookies()).get('token')?.value
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Pegawai</h1>
      <EditEmployeeForm token={token!} id={Number(params.slug)} />
    </>
  )
}
