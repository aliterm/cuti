'use client'

import { deleteCookie } from 'cookies-next'
import { Sidebar } from 'flowbite-react'
import { usePathname, useRouter } from 'next/navigation'
import { HiChartPie, HiUserGroup, HiUser } from 'react-icons/hi'
import { HiArrowRightStartOnRectangle, HiClipboardDocumentCheck } from 'react-icons/hi2'

export function DashboardSiderbar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sidebar aria-label="Default sidebar">
      <Sidebar.Logo href="/dashboard" img="/window.svg" imgAlt="logo">
        Simple Cuti
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" active={pathname === '/dashboard'} icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/admin" active={pathname.startsWith('/dashboard/admin')} icon={HiUser}>
            Admin
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/employees"
            active={pathname.startsWith('/dashboard/employees')}
            icon={HiUserGroup}
          >
            Pegawai
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/leaves"
            active={pathname.startsWith('/dashboard/leaves')}
            icon={HiClipboardDocumentCheck}
          >
            Daftar Cuti
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href=""
            onClick={() => {
              deleteCookie('token')
              router.refresh()
            }}
            icon={HiArrowRightStartOnRectangle}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
