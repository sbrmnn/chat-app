import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-12 flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-rose-500/60" />
      <span className="text-gold-400">❖</span>
      <div className="flex flex-col items-center text-center leading-tight">
        <span
          className="text-glow-rose text-2xl italic tracking-wide text-rose-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {en}
        </span>
        <JP className="mt-0.5 text-[10px] tracking-widest text-text-secondary">
          {jp}
        </JP>
      </div>
      <span className="text-gold-400">❖</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-500/30 to-rose-500/60" />
    </div>
  )
}
