'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import AddAdminForm from './addAdminForm'

interface AddAdminProps {
  token: string
}

export default function AddAdmin({ token }: AddAdminProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="mb-5">
        Tambah Admin
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Admin</Modal.Header>
        <Modal.Body>
          <AddAdminForm token={token} />
        </Modal.Body>
      </Modal>
    </>
  )
}
