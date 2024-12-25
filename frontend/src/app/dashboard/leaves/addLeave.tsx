'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import AddLeaveForm from './addLeaveForm'
import { Employee } from '@/interfaces/employee'

interface AddLeaveProps {
  employees: Employee[]
}

export default function AddLeave({ employees }: AddLeaveProps) {
  const [openModal, setOpenModal] = useState(true)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Tambah Cuti</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Cuti</Modal.Header>
        <Modal.Body>
          <AddLeaveForm employees={employees} />
        </Modal.Body>
      </Modal>
    </>
  )
}
