import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="relative overflow-hidden border border-base-600 bg-base-800/40">
      {/* Corner marks */}
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-gold-400/60" />
      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-gold-400/60" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold-400/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-gold-400/60" />

      {/* Featured tag */}
      <div className="absolute left-6 top-6 z-10 flex flex-col text-left">
        <span className="text-[10px] tracking-[0.4em] text-gold-400">
          FEATURED
        </span>
        <JP className="text-[10px] text-text-secondary">今日のおすすめ</JP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 p-6 pt-16 md:p-10 md:pt-16">
        {/* VRM placeholder */}
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden border border-base-500 bg-gradient-to-br from-base-700 to-base-900"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${character.accentColor}33, transparent 70%)`,
          }}
        >
          <span
            className="text-[280px] font-light leading-none opacity-40"
            translate="no"
            lang="ja"
            style={{ color: character.accentColor }}
          >
            {character.kanji}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-light tracking-[0.15em] text-text-primary md:text-5xl">
              {character.name}
            </h1>
            <JP className="text-3xl text-gold-400 md:text-4xl">
              {character.kanji}
            </JP>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <JP className="text-text-secondary">{character.personality.jp}</JP>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">
              {character.personality.en}
            </span>
            {character.online && (
              <span className="ml-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                <span className="text-[10px] tracking-[0.2em] text-teal-400">
                  ONLINE
                </span>
              </span>
            )}
          </div>

          <blockquote className="border-l-2 border-gold-400/60 pl-4">
            <JP className="block text-lg text-text-primary md:text-xl">
              「{character.greeting.jp}」
            </JP>
            <span className="mt-1 block text-sm italic text-text-secondary">
              "{character.greeting.en}"
            </span>
          </blockquote>

          <Link
            to={`/chat/${character.id}`}
            className="group inline-flex w-fit items-center gap-3 border border-gold-400 px-6 py-3 text-sm tracking-[0.3em] text-gold-400 transition-all hover:bg-gold-400 hover:text-base-900"
          >
            <span>START CHAT</span>
            <JP className="text-xs opacity-80">チャットする</JP>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
