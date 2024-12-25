'use client'

import { Leave } from '@/interfaces/leave'
import dayjs from 'dayjs'
import { Button, ButtonGroup, Table } from 'flowbite-react'

interface ListAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  leaves: Leave[]
}
export function ListLeaves({ leaves }: ListAdminProps) {
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
                  <Button size="xs" color="warning">
                    Edit
                  </Button>
                  <Button size="xs" color="failure">
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
