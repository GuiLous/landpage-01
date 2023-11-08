'use client'

import Image from 'next/image'
import { ChangeEvent, DragEvent, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { FILE_TYPES, MAX_FILES, MAX_FILE_SIZE } from '@/constants'

import uploadImg from '@/assets/images/upload.png'

interface FileInputProps {
  files: File[]
  isSingleFile?: boolean
  setFiles: (state: File[]) => void
  setFieldsErrors: ({ files }: { files: string | null }) => void
  error?: boolean
}
export function FileInput({
  files,
  setFieldsErrors,
  setFiles,
  isSingleFile = false,
  error = false,
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const filterFileFormatAndSize = useCallback(
    (newFiles: FileList) => {
      const filteredFiles = [] as File[]

      Array.from(newFiles).forEach((file) => {
        if (FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
          filteredFiles.push(file)
          setFieldsErrors({ files: null })
        } else if (newFiles.length === 1) {
          setFieldsErrors({
            files: 'Formato ou tamanho do arquivo ' + file.name + ' inválido.',
          })
        }
      })

      return filteredFiles
    },
    [setFieldsErrors]
  )

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files

    if (!newFiles || newFiles.length === 0) return

    const canUploadFile =
      files.length <= MAX_FILES &&
      newFiles.length <= MAX_FILES &&
      files.length + newFiles.length <= MAX_FILES

    const filteredFiles = filterFileFormatAndSize(newFiles as any)

    if (canUploadFile && filteredFiles.length > 0) {
      setFiles([...files, ...filteredFiles])
    }
  }

  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files

    const canUploadFile =
      files.length <= MAX_FILES &&
      droppedFiles.length <= MAX_FILES &&
      files.length + droppedFiles.length <= MAX_FILES

    const filteredFiles = filterFileFormatAndSize(droppedFiles)

    if (canUploadFile && filteredFiles.length > 0) {
      setFiles([...files, ...filteredFiles])
    }
  }

  const handleDragEnter = useCallback((e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      <label
        className={twMerge(
          'relative w-full cursor-pointer items-center justify-center rounded border border-dashed border-gray-700 bg-gray-1200',
          'hover:border-purple-400',
          isDragging && 'border-purple-400',
          error && 'border-red-500',
          isFocused && 'border-purple-400'
        )}
        htmlFor="file"
        data-testid="drop-zone"
      >
        <div
          className={twMerge(
            'h-full cursor-pointer flex-col gap-4 px-0 py-6',
            '3xl:gap-3 3xl:py-4'
          )}
        >
          <div className="flex-initial items-center justify-center">
            <Image
              src={uploadImg}
              alt="Upload image"
              className={twMerge('h-6 w-9', '3xl:h-5 3xl:w-8')}
            />
          </div>

          <div
            className={twMerge(
              'flex-initial flex-col items-center justify-center gap-3.5',
              '3xl:gap-2.5'
            )}
          >
            <p
              className={twMerge(
                'text-xs leading-none text-gray-300',
                '3xl:text-[0.625rem]'
              )}
            >
              Solte os arquivos aqui ou{' '}
              <span className="font-semibold text-purple-400">Procure</span>
            </p>

            <div
              className={twMerge(
                'flex-col items-center justify-center gap-2',
                '3xl:gap-1.5'
              )}
            >
              <p
                className={twMerge(
                  'text-[0.625rem] leading-none text-gray-300',
                  '3xl:text-[0.5rem]'
                )}
              >
                Arquivos suportados:{' '}
                <span className="font-medium">
                  JPG, PNG, GIF, PDF, MP4, MKV, AVI, MOV
                </span>
              </p>

              <p
                className={twMerge(
                  'text-[0.625rem] leading-none text-gray-300',
                  '3xl:text-[0.5rem]'
                )}
              >
                Tamanho máximo: <span className="font-medium">10MB</span>
              </p>
            </div>
          </div>
        </div>
      </label>

      <input
        type="file"
        id="file"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="sr-only"
        onChange={handleFileChange}
        multiple={!isSingleFile}
      />
    </div>
  )
}
