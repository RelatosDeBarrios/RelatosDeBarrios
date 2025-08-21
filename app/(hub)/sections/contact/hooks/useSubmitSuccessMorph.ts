import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface UseSubmitSuccessMorphProps {
  isSuccess: boolean
  isPending: boolean
  contentEl: React.RefObject<HTMLDivElement | null>
  formEl: React.RefObject<HTMLFormElement | null>
  buttonEl: React.RefObject<HTMLButtonElement | null>
  killLoading?: () => void
}

export const useSubmitSuccessMorph = ({
  isSuccess,
  isPending,
  contentEl,
  formEl,
  buttonEl,
  killLoading,
}: UseSubmitSuccessMorphProps) => {
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const originalHeightRef = useRef<number | null>(null)

  // Height preservation when pending starts
  useGSAP(
    () => {
      const form = formEl.current
      if (!form || !isPending) return

      // Capture original height if not already captured
      if (originalHeightRef.current === null) {
        originalHeightRef.current = form.getBoundingClientRect().height
      }

      // Set fixed height to prevent collapse
      form.style.height = `${originalHeightRef.current}px`
    },
    { dependencies: [isPending, formEl] }
  )

  // Success animation
  useGSAP(
    () => {
      if (!isSuccess) return
      const content = contentEl.current
      const form = formEl.current
      const btn = buttonEl.current
      if (!content || !form || !btn) return

      // Avoid re-entry
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }

      // Ensure wrapper height is preserved
      if (originalHeightRef.current) {
        form.style.height = `${originalHeightRef.current}px`
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      })

      // Step 1: Hide inputs (0 - 0.3s)
      tl.to(content, { opacity: 0, duration: 0.3 }, 0)
    },
    { dependencies: [isSuccess, contentEl, formEl, buttonEl, killLoading] }
  )

  // Reset on pending restart
  useGSAP(
    () => {
      if (isPending) {
        tlRef.current?.kill()
        tlRef.current = null
      }
    },
    { dependencies: [isPending] }
  )
}
