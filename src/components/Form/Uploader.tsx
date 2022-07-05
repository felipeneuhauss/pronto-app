import React, { useState } from 'react'
import axios from 'lib/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const Uploader = ({ label, handleFileUploaded, id = 'upload-file' }: {id?: string, label?: string, handleFileUploaded: (value: string) => void}) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const uploadFile = (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/files`,
      formData
    )
      .then(({ data }) => {
        handleFileUploaded(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }

    const file = input.files[0]
    setSelectedFile(file)
    uploadFile(file)
  }

  const triggerUploadButtonClick = () => {
    document.getElementById(id)?.click()
  }

  return (
    <div className={'w-full md:w-auto'}>
      <button type={'button'} onClick={() => triggerUploadButtonClick()} className={'w-full bg-blue-400 h-10 text-white px-4 rounded  text-ellipsis'} >
        <FontAwesomeIcon icon={faUpload} className={'px-2'} />
        {selectedFile?.name ? selectedFile?.name : label}
      </button>
      <input type="file" name="file" id={id} onChange={changeHandler} className={'hidden'} />
    </div>
  )
}

export default Uploader
