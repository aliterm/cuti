import RegisterForm from './form'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daftar',
  description: 'Halaman daftar',
}

export default function Register() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-6">
        <p className="text-2xl md:text-3xl uppercase font-bold text-wut">Register Cuti</p>
        <p className="font-extralight text-[11px] md:text-xs">Simple Pengelolaan Data Cuti Pegawai</p>
      </div>
      <RegisterForm />
    </>
  )
}
