'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import AddLeaveForm from './addLeaveForm'
import { Employee } from '@/interfaces/employee'

interface AddLeaveProps {
  employees: Employee[]
  token: string
}

export default function AddLeave({ employees, token }: AddLeaveProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="mb-5">
        Tambah Cuti
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Cuti</Modal.Header>
        <Modal.Body>
          <AddLeaveForm token={token} employees={employees} />
        </Modal.Body>
      </Modal>
    </>
  )
}
