import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="glass iridescent relative overflow-hidden">
      {/* Featured pill */}
      <div className="glass-strong absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        <span className="text-[11px] font-semibold tracking-wide text-text-primary">
          Featured
        </span>
        <span className="text-text-muted">·</span>
        <JP className="text-[10px] font-medium text-text-secondary">今日のおすすめ</JP>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-[1fr_1.2fr] md:gap-8 md:p-10 md:pt-20">
        {/* Avatar */}
        <div
          className="glass-strong relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${character.accentColor}55 0%, rgba(255, 255, 255, 0.3) 60%, ${character.accentColor}22 100%)`,
          }}
        >
          <span
            className="text-[260px] font-light leading-none"
            translate="no"
            lang="ja"
            style={{
              color: character.accentColor,
              textShadow: `0 16px 48px ${character.accentColor}77, 0 0 120px ${character.accentColor}44`,
            }}
          >
            {character.kanji}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-baseline gap-4">
            <h1 className="text-5xl font-bold tracking-tight text-text-primary md:text-6xl">
              {character.name}
            </h1>
            <JP className="text-4xl font-semibold text-accent-500 md:text-5xl">
              {character.kanji}
            </JP>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <span className="glass-subtle rounded-full px-3 py-1">
              <JP className="text-text-primary">{character.personality.jp}</JP>
              <span className="mx-1.5 text-text-muted">·</span>
              <span className="text-text-primary">{character.personality.en}</span>
            </span>
            {character.online && (
              <span className="glass-subtle flex items-center gap-1.5 rounded-full px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emotion-happy" />
                <span className="text-[11px] font-semibold text-text-primary">
                  Online
                </span>
              </span>
            )}
          </div>

          {/* Greeting — frosted speech card */}
          <div className="glass-subtle rounded-2xl rounded-bl-sm p-5">
            <JP className="block text-xl font-medium text-text-primary">
              {character.greeting.jp}
            </JP>
            <span className="mt-1 block text-sm italic text-text-secondary">
              {character.greeting.en}
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="btn-primary group inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight"
          >
            <span>Start chat</span>
            <JP className="text-xs opacity-90">チャットする</JP>
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
