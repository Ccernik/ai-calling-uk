import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function useSwipeNavigation() {
  const router = useRouter()

  const navigateWithSwipe = useCallback((href: string) => {
    // Add swipe-out animation class to document
    document.documentElement.style.animation = "swipeOut 0.5s ease-in-out forwards"

    // Navigate after animation completes
    setTimeout(() => {
      router.push(href)
      // Reset animation
      document.documentElement.style.animation = ""
    }, 500)
  }, [router])

  return { navigateWithSwipe }
}
