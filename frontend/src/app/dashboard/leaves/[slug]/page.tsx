import { cookies } from 'next/headers'
import fetcher from '@/helpers/fetcher'
import { Leave } from '@/interfaces/leave'
import EditLeaveForm from '../editLeaveForm'

export default async function EditLeve({ params }: { params: { slug: string } }) {
  const token = (await cookies()).get('token')?.value
  const leave = (
    await fetcher<Leave>({
      method: 'GET',
      endpoint: `leaves/${Number(params.slug)}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Pegawai</h1>
      <EditLeaveForm token={token!} id={Number(params.slug)} leave={leave} />
    </>
  )
}
