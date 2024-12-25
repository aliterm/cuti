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
import { HiCalendar } from 'react-icons/hi2'

type Inputs = {
  employeeId: number
  startDate: Date
  endDate: Date
  reason: string
}

const schema = z.object({
  employeeId: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().min(3),
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

export default function AddLeaveForm() {
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
      endpoint: 'leaves',
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
              label="Tanggal Mulai"
              {...register('startDate')}
              placeholder="Tanggal Mulai"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiCalendar}
              type="date"
            />
          </div>

          <div className="relative mb-3">
            <Input
              {...register('endDate')}
              label="Tanggal Selesai"
              placeholder="Tanggal Selesai"
              floatingLabel={false}
              autoComplete="new-password"
              wrapperClass="mb-0"
              icon={HiCalendar}
              type="date"
            />
          </div>

          <div className="relative mb-3">
            <Label>Employee</Label>
            <Select {...register('employeeId')}>
              <option value={'1'} defaultChecked>
                Ali
              </option>
              <option value={'2'}>Nabil</option>
            </Select>
          </div>

          <div className="relative mb-3">
            <Label>Alasan Cuti</Label>
            <Textarea {...register('reason')} />
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={!(isDirty && isValid) || isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner color="purple" className="mr-2" size={'sm'} aria-label="Loading" /> Memuat ...
              </>
            ) : (
              <>
                <span className="mr-1 align-middle">Ajukan Cuti</span>
              </>
            )}
          </Button>
        </Flowbite>
      </form>
    </>
  )
}