import { TeamMember } from '@/types/core'

export const MemberCard = ({ name, description, role }: TeamMember) => {
  return (
    <li
      className='bg-hub-background/20 border-hub-border flex max-w-sm flex-col items-center rounded-2xl border p-4 backdrop-blur-xl transition will-change-transform md:p-5'
      data-animate='member-card'
    >
      <header className='w-full'>
        <h3 className='text-hub-primary mb-1 text-center text-lg font-bold'>
          {name}
        </h3>
        <h4 className='text-hub-secondary mb-2 text-center text-sm font-medium'>
          {role}
        </h4>
      </header>
      <p className='text-hub-text text-center text-sm'>{description}</p>
    </li>
  )
}
