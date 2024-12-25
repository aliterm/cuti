'use client'

import Input from '@/components/input'

import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CustomFlowbiteTheme, Flowbite, Label, Spinner, Textarea } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'
import fetcher from '@/helpers/fetcher'
import { HiCalendar } from 'react-icons/hi2'
import { Leave } from '@/interfaces/leave'

interface LeaveFormProps {
  token: string
  leave: Leave
  id: number
}

type Inputs = {
  employeeId: number
  startDate: Date
  endDate: Date
  reason: string
}

const schema = z.object({
  employeeId: z.string(),
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

export default function EditLeaveForm({ leave, token }: LeaveFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: leave.employee.id,
      startDate: new Date(leave.startDate),
      endDate: new Date(leave.endDate),
      reason: leave.reason,
    },
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetcher({
      method: 'POST',
      endpoint: 'leaves',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.statusCode === 200 && res.data) {
      router.push('/dashboard/leaves')
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
              {...register('startDate', { valueAsDate: true })}
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
              {...register('endDate', { valueAsDate: true })}
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
            <Label>Alasan Cuti</Label>
            <Textarea {...register('reason')} />
          </div>

          <Button color="blue" className="w-full" type="submit" disabled={(!isDirty && isValid) || isSubmitting}>
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
