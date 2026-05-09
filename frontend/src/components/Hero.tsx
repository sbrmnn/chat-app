import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="vintage-card relative overflow-hidden">
      {/* Top stripe banner */}
      <div className="stripes-diag h-3" />

      {/* Featured ribbon */}
      <div className="absolute left-6 top-8 z-10 -rotate-2 bg-orange-400 px-4 py-1.5 shadow-md">
        <span
          className="text-base font-bold tracking-[0.15em] text-cream-50"
          style={{ fontFamily: "var(--font-display)" }}
        >
          FEATURED
        </span>
        <JP className="ml-2 text-[10px] font-bold text-cream-50">本日</JP>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-[1fr_1.2fr] md:gap-8 md:p-10 md:pt-20">
        {/* Avatar — like a vintage poster */}
        <div
          className="grain double-border relative flex aspect-square items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${character.accentColor}33 0%, var(--color-cream-50) 60%, ${character.accentColor}22 100%)`,
          }}
        >
          {/* Vertical title text on side */}
          <div className="vertical-text absolute right-2 top-4 text-xs font-bold tracking-widest text-brown-600">
            <JP>キャラクター紹介</JP>
          </div>

          <span
            className="text-[280px] font-bold leading-none"
            translate="no"
            lang="ja"
            style={{
              fontFamily: "var(--font-display)",
              color: character.accentColor,
              textShadow: "6px 6px 0 var(--color-cream-200), 8px 8px 0 var(--color-brown-600)",
            }}
          >
            {character.kanji}
          </span>

          {/* Bottom corner stamp */}
          <div className="vintage-seal absolute bottom-4 left-4 -rotate-12 px-3 py-1 text-[10px] font-bold tracking-[0.15em]">
            限定
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <div className="mb-1 flex items-baseline gap-3">
              <span
                className="text-xs font-bold tracking-[0.3em] text-orange-400"
                style={{ fontFamily: "var(--font-display)" }}
              >
                NO. 001
              </span>
              <span className="h-px flex-1 bg-brown-600" />
              <JP className="text-xs font-bold text-brown-600">本日のおすすめ</JP>
            </div>
            <div className="flex items-baseline gap-4">
              <h1
                className="text-6xl text-brown-800 md:text-7xl"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.05em",
                }}
              >
                {character.name}
              </h1>
              <JP className="text-4xl font-bold text-orange-400 md:text-5xl">
                {character.kanji}
              </JP>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="border-2 border-brown-600 bg-mustard-300 px-3 py-1 text-brown-800">
              <JP>{character.personality.jp}</JP> · {character.personality.en}
            </span>
            {character.online && (
              <span className="vintage-seal flex items-center gap-1.5 px-3 py-1 text-[10px]">
                <span className="h-2 w-2 rounded-full bg-cream-50" />
                <span className="tracking-[0.15em]">ONLINE</span>
              </span>
            )}
          </div>

          {/* Greeting in vintage frame */}
          <div className="relative bg-cream-200/60 p-5 text-brown-800">
            <span className="absolute -left-1 -top-2 text-4xl leading-none text-orange-400">
              ❝
            </span>
            <span className="absolute -bottom-4 -right-1 text-4xl leading-none text-orange-400">
              ❞
            </span>
            <JP className="block text-xl font-medium">
              {character.greeting.jp}
            </JP>
            <span className="mt-1 block text-sm italic text-brown-700">
              {character.greeting.en}
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="group inline-flex w-fit items-center gap-3 border-2 border-brown-700 bg-brown-700 px-7 py-3 text-base font-bold tracking-[0.15em] text-cream-50 shadow-[3px_3px_0_0_var(--color-mustard-400)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[5px_5px_0_0_var(--color-mustard-400)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>START CHAT</span>
            <JP className="text-xs opacity-90">いらっしゃいませ</JP>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom stripe banner */}
      <div className="stripes-diag h-3" />
    </section>
  )
}
