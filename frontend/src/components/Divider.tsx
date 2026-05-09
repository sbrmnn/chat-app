import { JP } from "./JP"

type Props = {
  en: string
  jp: string
}

export function Divider({ en, jp }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <span className="h-[2px] flex-1 bg-brown-600" />
      <div className="vintage-seal flex flex-col items-center px-5 py-2 text-center leading-tight">
        <span
          className="text-base font-bold tracking-[0.15em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {en.toUpperCase()}
        </span>
        <JP className="text-[10px] font-bold opacity-90">{jp}</JP>
      </div>
      <span className="h-[2px] flex-1 bg-brown-600" />
    </div>
  )
}
