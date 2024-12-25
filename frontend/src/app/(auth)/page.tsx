import LoginForm from '../form'

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-6">
        <p className="text-2xl md:text-3xl uppercase font-bold text-wut">Login Cuti</p>
        <p className="font-extralight text-[11px] md:text-xs">Simple Pengelolaan Data Cuti Pegawai</p>
      </div>
      <LoginForm />
    </>
  )
}
