'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import AddEmployeeForm from './addEmployeeForm'

interface AddEmployeeProps {
  token: string
}

export default function AddEmployee({ token }: AddEmployeeProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="mb-5">
        Tambah Pegawai
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Pegawai</Modal.Header>
        <Modal.Body>
          <AddEmployeeForm token={token} />
        </Modal.Body>
      </Modal>
    </>
  )
}
