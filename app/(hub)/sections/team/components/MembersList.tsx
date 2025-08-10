'use client'
import { TeamMember } from '@/types/core'
import { MemberCard } from './MemberCard'

export const MembersList = ({ members }: { members: TeamMember[] }) => {
  return (
    <div className='pt-10'>
      <h3 className='sr-only'>Miembros del equipo</h3>
      <ul className='flex w-full flex-row flex-wrap justify-center gap-6'>
        {members.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </ul>
    </div>
  )
}
