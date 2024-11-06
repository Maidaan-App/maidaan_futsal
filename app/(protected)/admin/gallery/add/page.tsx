import React from 'react'
import GalleryDetailForm from '../_components/GalleryDetailForm'
import { currentUser } from '@/lib/auth';

const AddGallery = async() => {
  const current_user = await currentUser();

  return (
    <GalleryDetailForm current_user={current_user}/>
  )
}

export default AddGallery