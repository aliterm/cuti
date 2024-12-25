// import { getCookie } from 'cookies-next'

import { cookies } from 'next/headers'
import EditAdminForm from '../editAdminForm'
import fetcher from '@/helpers/fetcher'
import { Admin } from '@/interfaces/admin'

export default async function EditAdmin({ params }: { params: { slug: string } }) {
  const token = (await cookies()).get('token')?.value
  const admin = (
    await fetcher<Admin>({
      method: 'GET',
      endpoint: `admins/${Number(params.slug)}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data!

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Administrator</h1>
      <EditAdminForm token={token!} id={Number(params.slug)} admin={admin} />
    </>
  )
}
