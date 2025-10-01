'use client'

import { Button } from '@/app/villacovico/components/ui/Button'
import { PlanType } from '../types'
import { usePlansGallery } from '../store/usePlansGallery'
interface PlansOpenGalleryButtonProps {
  id: PlanType
}

export const PlansOpenGalleryButton = ({ id }: PlansOpenGalleryButtonProps) => {
  const openGallery = usePlansGallery((state) => state.openGallery)

  return (
    <Button as='button' onClick={() => openGallery(id)} className='text-lg'>
      Ver galería
    </Button>
  )
}
