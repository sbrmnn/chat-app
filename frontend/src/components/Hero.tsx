import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="holo-card relative overflow-hidden">
      {/* Featured banner — pastel gradient */}
      <div className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded-br-2xl bg-gradient-to-r from-pink-500 to-lav-400 px-4 py-2 text-white shadow-lg shadow-pink-500/30">
        <span className="text-base">✨</span>
        <JP className="text-xs font-black">今日のおすすめ</JP>
        <span className="text-[10px] font-black tracking-[0.2em]">FEATURED</span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-16 md:grid-cols-[1fr_1.2fr] md:gap-8 md:p-10 md:pt-16">
        {/* Avatar */}
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 border-white/60"
          style={{
            background: `linear-gradient(135deg, ${character.accentColor}55 0%, #fde4f4 40%, #b3f0ff77 100%)`,
          }}
        >
          {/* Sparkle decorations */}
          <span className="absolute left-6 top-8 text-3xl animate-pulse">✨</span>
          <span className="absolute right-8 top-12 text-2xl animate-pulse [animation-delay:0.7s]">⭐</span>
          <span className="absolute bottom-12 left-12 text-xl animate-pulse [animation-delay:1.2s]">💖</span>
          <span className="absolute bottom-6 right-6 text-2xl animate-pulse [animation-delay:0.3s]">✦</span>

          <span
            className="relative text-[260px] leading-none"
            translate="no"
            lang="ja"
            style={{
              fontFamily: "var(--font-display)",
              color: character.accentColor,
              textShadow: `0 8px 30px ${character.accentColor}66, 0 16px 60px rgba(255, 110, 199, 0.4)`,
            }}
          >
            {character.kanji}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-baseline gap-4">
            <h1
              className="text-6xl text-pink-500 md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {character.name.toLowerCase()}
            </h1>
            <JP className="text-4xl font-bold text-lav-500 md:text-5xl">
              {character.kanji}
            </JP>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-pink-500">
              <JP>{character.personality.jp}</JP> · {character.personality.en}
            </span>
            {character.online && (
              <span className="flex items-center gap-1.5 rounded-full border-2 border-cyan-400 bg-white px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                <span className="text-[10px] font-bold tracking-wider text-cyan-500">
                  ONLINE
                </span>
              </span>
            )}
          </div>

          {/* Speech bubble greeting */}
          <div className="relative rounded-3xl rounded-bl-md bg-gradient-to-br from-cyan-300/40 to-lav-300/40 p-5 backdrop-blur">
            <span className="absolute -top-2 left-6 text-2xl">💬</span>
            <JP className="block text-xl font-bold text-text-primary">
              「{character.greeting.jp}」
            </JP>
            <span className="mt-1 block text-sm italic text-text-secondary">
              "{character.greeting.en}"
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="btn-pastel group inline-flex w-fit items-center gap-3 px-8 py-3.5 text-base font-bold tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>start chat ♡</span>
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
