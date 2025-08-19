interface EmailTemplateProps {
  name: string
  commentary: string
  contribution:
    | 'Conjunto Habitacional Rengifo'
    | 'Villa Covico'
    | 'Sin material para aportar'
    | string
}

export const EmailTemplate = ({
  name,
  commentary,
  contribution,
}: EmailTemplateProps) => {
  return (
    <div>
      <p>
        <strong>Aporte:</strong> {contribution}
      </p>
      <p>{name}</p>
      <p>{commentary}</p>
    </div>
  )
}
