export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-blue-400 to-blue-300 md:justify-center items-center">
      <div className="bg-white w-11/12 md:w-6/12 lg:w-3/12 mt-0 p-5 md:p-10 rounded-xl shadow-lg">{children}</div>
    </div>
  )
}
