'use client'

import fetcher from '@/helpers/fetcher'
import { Leave } from '@/interfaces/leave'
import dayjs from 'dayjs'
import { Button, ButtonGroup, Table } from 'flowbite-react'
import { useRouter } from 'next/navigation'

interface ListAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  leaves: Leave[]
  token?: string
}
export function ListLeaves({ leaves, token }: ListAdminProps) {
  const router = useRouter()
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nama Pegawai</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Alasan Cuti</Table.HeadCell>
          <Table.HeadCell>Tanggal Mulai</Table.HeadCell>
          <Table.HeadCell>Tanggal Selesai</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {leaves.map((leave) => (
            <Table.Row key={leave.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{leave.id}</Table.Cell>
              <Table.Cell>{leave.employee.firstName + ' ' + leave.employee.lastName}</Table.Cell>
              <Table.Cell>{leave.employee.email}</Table.Cell>
              <Table.Cell>{leave.reason}</Table.Cell>
              <Table.Cell>{dayjs(leave.startDate).format('DD-MM-YYYY')}</Table.Cell>
              <Table.Cell>{dayjs(leave.endDate).format('DD-MM-YYYY')}</Table.Cell>
              <Table.Cell>
                <ButtonGroup>
                  <Button size="xs" color="warning" onClick={() => router.push(`/dashboard/leaves/${leave.id}`)}>
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={async () => {
                      await fetcher({
                        method: 'DELETE',
                        endpoint: `leaves/${leave.id}`,
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })

                      router.refresh()
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
