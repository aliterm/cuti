'use client'

import { Admin } from '@/interfaces/admin'
import dayjs from 'dayjs'
import { Button, ButtonGroup, Table } from 'flowbite-react'

interface ListAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  admins: Admin[]
}
export function ListAdmin({ admins }: ListAdminProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nama Depan</Table.HeadCell>
          <Table.HeadCell>Nama Belakang</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Tanggal Lahir</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {admins.map((admin) => (
            <Table.Row key={admin.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{admin.id}</Table.Cell>
              <Table.Cell>{admin.firstName}</Table.Cell>
              <Table.Cell>{admin.lastName}</Table.Cell>
              <Table.Cell>{admin.email}</Table.Cell>
              <Table.Cell>{dayjs(admin.birthDate).format('DD-MM-YYYY')}</Table.Cell>
              <Table.Cell>{admin.gender}</Table.Cell>
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
