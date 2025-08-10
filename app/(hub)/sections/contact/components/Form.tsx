import { sendEmail } from '../actions/sendEmailAction'
import { CONTACT } from '../content'
import { FormWithAction } from './FormWithAction'

const { form } = CONTACT

export const Form = () => {
  return <FormWithAction data={form} action={sendEmail} />
}
