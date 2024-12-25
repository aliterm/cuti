'use client'

import { Employee } from '@/interfaces/employee'
import { Button, ButtonGroup, Table } from 'flowbite-react'

interface ListAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  employees: Employee[]
}
export function ListEmployees({ employees }: ListAdminProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nama Depan</Table.HeadCell>
          <Table.HeadCell>Nama Belakang</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>No Telepon</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees.map((employee) => (
            <Table.Row key={employee.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{employee.id}</Table.Cell>
              <Table.Cell>{employee.firstName}</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>{employee.phone}</Table.Cell>
              <Table.Cell>{employee.gender}</Table.Cell>
              <ButtonGroup>
                <Button size="xs" color="warning">
                  Edit
                </Button>
                <Button size="xs" color="failure">
                  Delete
                </Button>
              </ButtonGroup>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
