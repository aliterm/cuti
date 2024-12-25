'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import AddLeaveForm from './addLeaveForm'

export default function AddLeave() {
  const [openModal, setOpenModal] = useState(true)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Tambah Cuti</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Cuti</Modal.Header>
        <Modal.Body>
          <AddLeaveForm />
        </Modal.Body>
      </Modal>
    </>
  )
}
