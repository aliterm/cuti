// import { getCookie } from 'cookies-next'

import { cookies } from 'next/headers'
import EditAdminForm from '../editAdminForm'

export default async function EditAdmin({ params }: { params: { slug: string } }) {
  const token = (await cookies()).get('token')?.value
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Administrator</h1>
      <EditAdminForm token={token!} id={Number(params.slug)} />
    </>
  )
}
