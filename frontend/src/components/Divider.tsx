import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/60 to-white/40" />
      <div className="flex flex-col items-center text-center leading-tight">
        <span className="text-sm font-semibold tracking-tight text-text-primary">
          {en}
        </span>
        <JP className="text-[10px] font-medium text-text-secondary">{jp}</JP>
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/60 to-white/40" />
    </div>
  )
}
