import { TEAM } from '../content'
import { MembersList } from './MembersList'

const { members, collaborators, participants } = TEAM.cards

export const TeamList = () => {
  return (
    <section className='mx-auto flex w-full flex-col gap-8'>
      <MembersList members={members} />

      <div className='mx-auto max-w-xl'>
        <h3 className='text-hub-primary mb-1 text-center font-semibold'>
          Han participado:
        </h3>
        <ul className='text-hub-text flex flex-row flex-wrap items-center justify-center gap-x-4 text-center text-sm'>
          {participants.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <div className='mx-auto max-w-2xl'>
        <h3 className='text-hub-primary mb-1 text-center font-semibold'>
          Han colaborado:
        </h3>
        <ul className='text-hub-text flex flex-row flex-wrap items-center justify-center gap-x-4 text-center text-sm'>
          {collaborators.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
