import fetcher from '@/helpers/fetcher'
import { cookies } from 'next/headers'
import { Leave } from '@/interfaces/leave'
import { ListLeaves } from './listLeave'
import AddLeave from './addLeave'

export default async function LeavesPage() {
  const token = (await cookies()).get('token')?.value
  const leaves = (
    await fetcher<Leave[]>({
      method: 'GET',
      endpoint: 'leaves',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Daftar Cuti Pegawai</h1>
      <AddLeave />
      <ListLeaves leaves={leaves} />
    </>
  )
}
