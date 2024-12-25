'use client'

import Input from '@/components/input'

import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, CustomFlowbiteTheme, Flowbite, Label, Spinner } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiLogInCircle } from 'react-icons/bi'
import { HiLockClosed, HiMail } from 'react-icons/hi'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'
import fetcher from '@/helpers/fetcher'
import { setCookie } from 'cookies-next'

interface LoginResponse {
  token: string
}
type Inputs = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetcher<LoginResponse>({
      method: 'POST',
      endpoint: 'auth/login',
      body: JSON.stringify(data),
    })

    console.log(res.data)
    if (res.statusCode === 201 && res.data) {
      setCookie('token', res.data.token, { path: '/' })
      console.log(res.data.token, 'TOKEN BOS')
      router.push('/dashboard')
    } else {
      toast.error(res.message, { toastId: 'login-toast', theme: 'colored' })
    }
  }

  return (
    <>
      <ToastContainer limit={1} />

      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Flowbite theme={{ theme: custom }}>
          <div className="relative mb-3">
            <Input
              {...register('email')}
              placeholder="Surel"
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
              placeholder="Kata sandi"
              showingPasword={true}
              autoComplete={rememberMe ? 'true' : 'new-password'}
            />
          </div>

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                color={'blue'}
                defaultChecked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Label htmlFor="remember-me">Ingat saya</Label>
            </div>
            <div>
              <Link className="text-sm text-blue-500 hover:text-blue-400" href={'/forgot-password'}>
                Lupa kata sandi?
              </Link>
            </div>
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={!(isDirty && isValid) || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner color="purple" className="mr-2" size={'sm'} aria-label="Loading" /> Memuat ...
              </>
            ) : (
              <>
                <span className="mr-1 align-middle">Masuk</span>
                <BiLogInCircle className="w-5 h-5 inline align-middle" />
              </>
            )}
          </Button>

          <p className="mt-5 text-center text-sm">
            Belum punya akun? Daftar{' '}
            <Link className="text-blue-500 hover:text-blue-400 mb-5" href={'/register'}>
              di sini
            </Link>
          </p>
        </Flowbite>
      </form>
    </>
  )
}
