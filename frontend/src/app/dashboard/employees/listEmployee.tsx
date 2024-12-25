'use client'

import fetcher from '@/helpers/fetcher'
import { Employee } from '@/interfaces/employee'
import { Button, ButtonGroup, Table } from 'flowbite-react'
import { useRouter } from 'next/navigation'

interface ListAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  employees: Employee[]
  token?: string
}
export function ListEmployees({ employees, token }: ListAdminProps) {
  const router = useRouter()
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
              <Table.Cell>
                <ButtonGroup>
                  <Button size="xs" color="warning" onClick={() => router.push(`/dashboard/employees/${employee.id}`)}>
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={async () => {
                      await fetcher({
                        endpoint: `employees/${employee.id}`,
                        method: 'DELETE',
                        headers: {
                          Authorization: `Bearer ${token!}`,
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
