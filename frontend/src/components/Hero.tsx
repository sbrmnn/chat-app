import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="corner-brackets relative overflow-hidden border border-neon-cyan/40 bg-deep-900/80 backdrop-blur">
      {/* Featured banner */}
      <div className="neon-box-red absolute left-0 top-0 z-10 flex items-center gap-2 bg-deep-900 px-4 py-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-neon-red shadow-[0_0_6px_rgba(255,0,60,1)]" />
        <span
          className="glow-red text-sm tracking-[0.3em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          // FEATURED.001
        </span>
        <JP className="font-mono text-[10px] text-neon-cyan">今日のおすすめ</JP>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-16 md:grid-cols-[1fr_1.2fr] md:gap-8 md:p-10 md:pt-16">
        {/* Avatar area */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-neon-red/40 bg-deep-900">
          {/* Kanji wallpaper */}
          <span
            className="kanji-wall left-2 top-1/2 -translate-y-1/2 text-[300px]"
            lang="ja"
            translate="no"
          >
            {character.kanji}
          </span>

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.05)_0px,rgba(0,255,255,0.05)_1px,transparent_1px,transparent_3px)]" />

          {/* Glitch radial */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${character.accentColor}33, transparent 60%)`,
            }}
          />

          <span
            className="relative text-[260px] font-bold leading-none"
            translate="no"
            lang="ja"
            style={{
              color: character.accentColor,
              textShadow: `0 0 16px ${character.accentColor}, 0 0 48px ${character.accentColor}99`,
            }}
          >
            {character.kanji}
          </span>

          {/* Corner HUD elements */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1 font-mono text-[10px] text-neon-cyan">
            <span>SUBJECT.{character.id.toUpperCase()}</span>
            <span className="text-neon-red">●&nbsp;ACTIVE</span>
          </div>

          <div className="absolute bottom-3 left-3 flex flex-col font-mono text-[10px] text-neon-cyan">
            <span>VOICE_PROFILE: {character.voice}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-baseline gap-4">
            <h1
              className="glow-red text-7xl tracking-[0.05em] md:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {character.name}
            </h1>
            <JP className="glow-cyan text-5xl md:text-6xl">{character.kanji}</JP>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
            <span className="border border-neon-magenta/50 bg-deep-900 px-2 py-1 text-neon-magenta">
              <JP>{character.personality.jp}</JP> :: {character.personality.en}
            </span>
            {character.online && (
              <span className="neon-box-cyan flex items-center gap-2 bg-deep-900 px-3 py-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan shadow-[0_0_6px_rgba(0,255,255,1)]" />
                <span className="text-[10px] tracking-wider text-neon-cyan">
                  ONLINE
                </span>
              </span>
            )}
          </div>

          {/* Greeting — terminal panel */}
          <div className="border border-neon-red/50 bg-deep-900/80 p-4 font-mono shadow-[0_0_12px_rgba(255,0,60,0.2)]">
            <div className="mb-2 flex items-center gap-2 border-b border-neon-red/30 pb-2 text-[10px] tracking-wider text-neon-red">
              <span>● MSG_INTAKE</span>
              <span className="text-text-muted">::</span>
              <span className="text-neon-cyan">{character.id}@chatapp</span>
            </div>
            <JP className="block text-lg text-text-primary md:text-xl">
              {">> "}{character.greeting.jp}
            </JP>
            <span className="mt-1 block text-sm italic text-text-secondary">
              // {character.greeting.en}
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="group neon-box-red glow-red inline-flex w-fit items-center gap-3 bg-deep-900 px-8 py-3.5 text-base tracking-[0.3em] transition-all hover:bg-neon-red hover:text-void hover:shadow-[0_0_24px_rgba(255,0,60,0.8)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>{">> "}INITIATE_CONNECTION</span>
            <JP className="font-mono text-xs">接続開始</JP>
            <span className="cursor-blink" />
          </Link>
        </div>
      </div>
    </section>
  )
}
