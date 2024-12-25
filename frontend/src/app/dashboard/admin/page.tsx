import fetcher from '@/helpers/fetcher'
import { Admin } from '@/interfaces/admin'
import { cookies } from 'next/headers'
import { ListAdmin } from './listAdmin'
import AddAdmin from './addAdmin'

export default async function AdminPage() {
  const token = (await cookies()).get('token')?.value
  const admins = (
    await fetcher<Admin[]>({
      method: 'GET',
      endpoint: 'admins',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Daftar Administrator</h1>
      <AddAdmin token={token!} />
      <ListAdmin admins={admins} />
    </>
  )
}
