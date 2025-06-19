import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'

export default function Avatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <div className="avatar">
            <div className="w-24 rounded-full">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="avatar image"
                        />
                ) : (
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                )}
            </div>
        </div>
        <input
            type="file"
            id="single"
            className='file-input file-input-primary'
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
        />
    </div>
  )
}