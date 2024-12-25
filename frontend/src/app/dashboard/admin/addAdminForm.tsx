'use client'

import Input from '@/components/input'

import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CustomFlowbiteTheme, Flowbite, Label, Select, Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'
import fetcher from '@/helpers/fetcher'
import { HiCalendar, HiEnvelope } from 'react-icons/hi2'
import { HiLockClosed, HiUser } from 'react-icons/hi'

interface Props {
  token: string
}

type Inputs = {
  firstName: string
  lastName: string
  email: string
  birthDate: Date
  password: string
  gender: string
}

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.date(),
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

export default function AddAdminForm({ token }: Props) {
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
      method: 'POST',
      endpoint: 'admins',
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
              label="Password"
              {...register('password')}
              placeholder="Password"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiLockClosed}
              type="password"
              showingPasword={true}
            />
          </div>

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
            <Input
              label="Tanggal Lahir"
              {...register('birthDate', {
                valueAsDate: true,
              })}
              type="date"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiCalendar}
            />
          </div>

          <div className="relative mb-3">
            <Label>Gender</Label>
            <Select {...register('gender')}>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </Select>
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={(!isDirty && isValid) || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner color="purple" className="mr-2" size={'sm'} aria-label="Loading" /> Memuat ...
              </>
            ) : (
              <>
                <span className="mr-1 align-middle">Tambah Admin</span>
              </>
            )}
          </Button>
        </Flowbite>
      </form>
    </>
  )
}
