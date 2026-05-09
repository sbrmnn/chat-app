import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export function JP({ children, className = "" }: Props) {
  return (
    <span translate="no" lang="ja" className={className}>
      {children}
    </span>
  )
}
