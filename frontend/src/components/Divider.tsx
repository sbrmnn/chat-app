import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <span className="h-[2px] flex-1 bg-ink-900" />
      <div className="flex flex-col items-center text-center leading-tight">
        <span
          className="text-base font-black tracking-[0.15em] text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {en.toUpperCase()}
        </span>
        <JP className="text-xs font-bold text-accent-red">{jp}</JP>
      </div>
      <span className="h-[2px] flex-1 bg-ink-900" />
    </div>
  )
}
