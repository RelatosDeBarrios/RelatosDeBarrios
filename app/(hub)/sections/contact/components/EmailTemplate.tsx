import {
  Heading,
  Html,
  Img,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

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
    <Html>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                'hub-primary': '#294581',
                'hub-text': '#425270',
                'hub-border': '#00000001',
                'hub-background': '#f3f4f6',
              },
            },
          },
        }}
      >
        <Section className='bg-hub-primary/10 border-hub-border m-auto my-10 max-w-2xl rounded-xl border p-8'>
          <Section>
            <Img
              src='https://www.relatosdebarrios.cl/hub/favicon.png'
              alt='Logotipo de Relatos de Barrios'
              className='mx-auto size-20'
            />
            <Text className='text-hub-text text-sm'>
              <strong>Aporte:</strong> {contribution}
            </Text>
            <Heading as='h1' className='text-hub-text my-4 text-xl'>
              Mensaje de <strong>{name}</strong>
            </Heading>
          </Section>
          <Section className='bg-hub-background/60 rounded-lg p-4'>
            <Text className='text-pretty'>{commentary}</Text>
          </Section>
          <Section className='mx-auto mt-8 max-w-prose'>
            <Text className='text-hub-text text-center text-sm'>
              Responde directamente a {name} presionando el botón de responder
              de Gmail
            </Text>
          </Section>
        </Section>
      </Tailwind>
    </Html>
  )
}
