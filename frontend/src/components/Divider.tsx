import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-red/40 to-neon-red shadow-[0_0_8px_rgba(255,0,60,0.6)]" />
      <div className="flex flex-col items-center text-center leading-tight">
        <span
          className="glow-cyan text-2xl tracking-[0.2em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          // {en.toUpperCase()}
        </span>
        <JP className="font-mono text-xs text-neon-magenta">{jp}</JP>
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-neon-red/40 to-neon-red shadow-[0_0_8px_rgba(255,0,60,0.6)]" />
    </div>
  )
}
