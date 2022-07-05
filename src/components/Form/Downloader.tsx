import axios from 'lib/axios'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Downloader = ({ id, name, label }: { id: string, name: string, label: string }) => {
  const downloadFile = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/${id}/download`).then(({ data }) => {
      const linkSource = `data:${data.mimeType};base64,${data.content}`
      const downloadLink = document.createElement('a')
      if (!name) {
        name = data.name
      }

      downloadLink.href = linkSource
      downloadLink.download = name
      downloadLink.click()
    }, (error) => {
      console.error(error)
    })
  }
  return (
    <div>
      <button type={'button'} onClick={() => downloadFile()} className={'w-full bg-blue-400 h-10 px-4 text-white p-2 rounded'} >
        <FontAwesomeIcon icon={faDownload} className={'px-2'} />
        {label}
      </button>
    </div>
  )
}

export default Downloader
