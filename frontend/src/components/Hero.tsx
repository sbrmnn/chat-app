import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="manga-panel relative overflow-hidden">
      {/* Featured banner — looks like a magazine flag */}
      <div className="absolute left-0 top-0 z-10 flex items-center gap-2 border-b-[2.5px] border-r-[2.5px] border-ink-900 bg-accent-red px-4 py-2 text-paper-50">
        <JP className="text-xs font-black">今日のおすすめ</JP>
        <span className="text-[10px] font-black tracking-[0.2em]">
          FEATURED
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-16 md:grid-cols-[1fr_1.2fr] md:gap-8 md:p-10 md:pt-16">
        {/* Avatar with action lines */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden border-[2.5px] border-ink-900 bg-paper-50">
          <div className="action-lines pointer-events-none absolute inset-0 opacity-[0.10]" />
          <div className="halftone-dense pointer-events-none absolute inset-0 opacity-30" />

          <span
            className="relative text-[260px] font-black leading-none text-ink-900"
            translate="no"
            lang="ja"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: `8px 8px 0 ${character.accentColor}, 14px 14px 0 var(--color-paper-200)`,
            }}
          >
            {character.kanji}
          </span>

          {/* Sound effect — large, dramatic */}
          <span
            className="absolute right-4 top-6 -rotate-6 text-4xl font-black text-accent-red"
            translate="no"
            lang="ja"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ドキッ
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-baseline gap-4">
            <h1
              className="text-5xl font-black tracking-[0.05em] text-ink-900 md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {character.name}
            </h1>
            <JP className="text-4xl font-black text-accent-red md:text-5xl">
              {character.kanji}
            </JP>
          </div>

          <div className="flex items-center gap-3 text-sm font-bold">
            <JP className="text-ink-900">{character.personality.jp}</JP>
            <span className="text-ink-400">·</span>
            <span className="text-ink-900">{character.personality.en}</span>
            {character.online && (
              <span className="ml-2 flex items-center gap-1.5 border-2 border-ink-900 bg-paper-50 px-2 py-0.5">
                <span className="h-2 w-2 rounded-full bg-accent-red" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-ink-900">
                  ONLINE
                </span>
              </span>
            )}
          </div>

          {/* Speech bubble greeting */}
          <div className="speech-bubble-them mt-2 px-5 py-4">
            <JP className="block text-xl font-bold text-ink-900">
              「{character.greeting.jp}」
            </JP>
            <span className="mt-1 block text-sm italic text-ink-500">
              "{character.greeting.en}"
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="group inline-flex w-fit items-center gap-3 border-[2.5px] border-ink-900 bg-ink-900 px-6 py-3 text-sm font-black tracking-[0.2em] text-paper-50 shadow-[4px_4px_0_0_var(--color-accent-red)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent-red)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>START CHAT</span>
            <JP className="text-xs opacity-90">チャットする</JP>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
