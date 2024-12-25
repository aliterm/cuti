'use client'

import Input from '@/components/input'

import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CustomFlowbiteTheme, Flowbite, Select, Spinner } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiLogInCircle } from 'react-icons/bi'
import { HiLockClosed, HiMail } from 'react-icons/hi'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'
import fetcher from '@/helpers/fetcher'
import { HiCalendar, HiUser } from 'react-icons/hi2'

type Inputs = {
  firstName: string
  lastName: string
  birthDate: Date
  gender: string
  email: string
  password: string
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

export default function RegisterForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetcher({
      method: 'POST',
      endpoint: 'auth/register',
      body: JSON.stringify(data),
    })
    if (res.statusCode === 200 && res.data) {
      // await loginSession(res.data)
      router.push('/dashboard')
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
              {...register('birthDate')}
              placeholder="Tanggal Lahir"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiCalendar}
              type="date"
            />
          </div>

          <div className="relative mb-3">
            <Select {...register('gender')}>
              <option value={'male'} defaultChecked>
                Laki-Laki
              </option>
              <option value={'female'}>Perempuan</option>
            </Select>
          </div>

          <div className="relative mb-3">
            <Input
              {...register('email')}
              placeholder="Email"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiMail}
            />
          </div>

          <div className="relative mb-5">
            <Input
              {...register('password')}
              type="password"
              floatingLabel={false}
              icon={HiLockClosed}
              placeholder="Password"
              showingPasword={true}
              autoComplete="new-password"
            />
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={!(isDirty && isValid) || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner color="purple" className="mr-2" size={'sm'} aria-label="Loading" /> Memuat ...
              </>
            ) : (
              <>
                <span className="mr-1 align-middle">Daftar</span>
                <BiLogInCircle className="w-5 h-5 inline align-middle" />
              </>
            )}
          </Button>

          <p className="mt-5 text-center text-sm">
            Sudah punya akun? Masuk{' '}
            <Link className="text-blue-500 hover:text-blue-400 mb-5" href={'/'}>
              di sini
            </Link>
          </p>
        </Flowbite>
      </form>
    </>
  )
}
