'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'

export default function AddLeave() {
  const [openModal, setOpenModal] = useState(true)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Cuti</Modal.Header>
        <Modal.Body>
          <p>Halo</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Tambah</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
