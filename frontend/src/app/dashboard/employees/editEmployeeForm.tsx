'use client'

import Input from '@/components/input'

import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CustomFlowbiteTheme, Flowbite, Label, Select, Spinner, Textarea } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'
import fetcher from '@/helpers/fetcher'
import { HiEnvelope } from 'react-icons/hi2'
import { HiUser } from 'react-icons/hi'

interface LeaveFormProps {
  token: string
  id: number
}

type Inputs = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  gender: string
}

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(3),
  address: z.string().min(3),
  gender: z.enum(['male', 'female']),
})

const custom: CustomFlowbiteTheme = {
  textInput: {
    field: {
      input: {
        colors: {
          gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
        },
      },
    },
  },
}

export default function EditEmployeeForm({ token, id }: LeaveFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetcher({
      method: 'PATCH',
      endpoint: 'employees/' + id,
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.statusCode === 201 && res.data) {
      router.refresh()
      const closeButton = document.querySelector('button[aria-label="Close"]') as HTMLButtonElement
      closeButton.click()
    } else {
      toast.error(res.message, { toastId: 'register-toast', theme: 'colored' })
    }
  }

  return (
    <>
      <ToastContainer limit={1} />

      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Flowbite theme={{ theme: custom }}>
          <div className="relative mb-3">
            <Input
              label="Nama Depan"
              {...register('firstName')}
              placeholder="Nama Depan"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiUser}
            />
          </div>

          <div className="relative mb-3">
            <Input
              label="Nama Belakang"
              {...register('lastName')}
              placeholder="Nama Belakang"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiUser}
            />
          </div>

          <div className="relative mb-3">
            <Label>Gender</Label>
            <Select {...register('gender')}>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </Select>
          </div>

          <div className="relative mb-3">
            <Input
              label="Email"
              {...register('email')}
              placeholder="Email"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiEnvelope}
            />
          </div>

          <div className="relative mb-3">
            <Input
              label="Nomor Telepon"
              {...register('phone')}
              placeholder="Nomor Telepon"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiEnvelope}
              type="tel"
            />
          </div>

          <div className="relative mb-3">
            <Label>Alamat</Label>
            <Textarea {...register('address')} />
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={(!isDirty && isValid) || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner color="purple" className="mr-2" size={'sm'} aria-label="Loading" /> Memuat ...
              </>
            ) : (
              <>
                <span className="mr-1 align-middle">Update Pegawai</span>
              </>
            )}
          </Button>
        </Flowbite>
      </form>
    </>
  )
}
