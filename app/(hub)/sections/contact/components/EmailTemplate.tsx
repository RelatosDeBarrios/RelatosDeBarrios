interface EmailTemplateProps {
  name: string
  commentary: string
  contribution:
    | null
    | 'Conjunto Habitacional Rengifo'
    | 'Villa Covico'
    | ''
    | undefined
}

export const EmailTemplate = ({
  name,
  commentary,
  contribution,
}: EmailTemplateProps) => {
  return (
    <div>
      {contribution && (
        <p>
          <strong>Aporte:</strong> {contribution}
        </p>
      )}
      <p>{name}</p>
      <p>{commentary}</p>
    </div>
  )
}
