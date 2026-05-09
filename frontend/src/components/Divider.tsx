import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <span className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-pink-400" />
      <div className="flex flex-col items-center text-center leading-tight">
        <span
          className="text-2xl text-pink-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {en} ♡
        </span>
        <JP className="text-xs font-bold text-lav-500">{jp}</JP>
      </div>
      <span className="h-[2px] flex-1 rounded-full bg-gradient-to-l from-transparent via-cyan-300 to-cyan-400" />
    </div>
  )
}
