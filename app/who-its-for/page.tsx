"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// There is no standalone "overview" page — /who-its-for redirects to the first
// persona so the section always lands on real content.
export default function WhoItsForIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/who-its-for/directors")
  }, [router])
  return null
}
