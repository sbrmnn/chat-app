import type { ReactNode } from "react"
import { JP } from "./JP"

type Props = {
  en: string
  jp: string
  children?: ReactNode
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-8 flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/30" />
      <div className="flex flex-col items-center text-center leading-tight">
        <span className="text-[11px] tracking-[0.3em] text-gold-400">
          {en.toUpperCase()}
        </span>
        <JP className="text-[10px] text-text-secondary">{jp}</JP>
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/30" />
    </div>
  )
}
