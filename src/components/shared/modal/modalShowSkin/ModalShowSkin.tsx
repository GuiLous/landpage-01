'use client'

import Image from 'next/image'

import { Media } from '@/functions'

import { Modal } from '@/components/shared'

interface ModalShowSkinProps {
  open: boolean
  preview: Media
  setOpen: (state: boolean) => void
}

export function ModalShowSkin({ open, setOpen, preview }: ModalShowSkinProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        className="max-w-fit overflow-hidden rounded p-0 shadow-2xl outline outline-1 outline-purple-400"
        overlayClassName="bg-black/70"
        onMouseLeave={() => setOpen(false)}
      >
        <div className="relative max-h-[612px] min-h-[612px] min-w-[1088px] max-w-[1088px]">
          {preview.media_type === 'image' && (
            <Image src={preview.file} alt="" fill sizes="100%" />
          )}

          {preview.media_type !== 'image' && (
            <video autoPlay loop className="h-full w-full object-contain">
              <source src={preview.file} type="video/mp4" />
            </video>
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}
