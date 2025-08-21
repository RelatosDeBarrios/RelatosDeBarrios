import { SectionsId } from '@/app/(hub)/types'
import { NavigationContent } from '@/types/general'

export const NAV: NavigationContent<SectionsId> = [
  {
    id: 'home',
    label: 'Inicio',
  },
  {
    id: 'project',
    label: 'Proyecto',
  },
  {
    id: 'team',
    label: 'Equipo',
  },
  {
    id: 'contact',
    label: 'Contacto',
  },
] as const
