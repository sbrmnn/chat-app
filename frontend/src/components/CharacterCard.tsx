import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function CharacterCard({ character }: Props) {
  return (
    <Link
      to={`/chat/${character.id}`}
      className="corner-brackets group relative flex flex-col overflow-hidden border border-deep-600 bg-deep-800/80 backdrop-blur-sm transition-all hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
    >
      {/* Avatar area */}
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b border-deep-600 bg-deep-900">
        {/* Vertical kanji wallpaper */}
        <span className="kanji-wall right-2 top-1/2 -translate-y-1/2" lang="ja" translate="no">
          {character.kanji}
        </span>

        {/* Scanlines overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.04)_0px,rgba(0,255,255,0.04)_1px,transparent_1px,transparent_2px)]" />

        <span
          className="relative text-[140px] font-bold leading-none transition-all group-hover:scale-110"
          translate="no"
          lang="ja"
          style={{
            color: character.accentColor,
            textShadow: `0 0 8px ${character.accentColor}, 0 0 24px ${character.accentColor}88`,
          }}
        >
          {character.kanji}
        </span>

        {/* Top-right ID badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1.5 border border-neon-cyan bg-deep-900/80 px-2 py-0.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-red shadow-[0_0_4px_rgba(255,0,60,1)]" />
          <span className="font-mono text-[9px] tracking-wider text-neon-cyan">
            ID: {character.id.toUpperCase()}
          </span>
        </div>

        {/* Affinity bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-wider text-neon-cyan">
            AFFINITY
          </span>
          <div className="flex flex-1 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 ${
                  i < character.affinity
                    ? "bg-neon-red shadow-[0_0_4px_rgba(255,0,60,1)]"
                    : "bg-deep-600"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-wider text-neon-red">
            {character.affinity}/5
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name */}
        <div className="flex items-baseline justify-between">
          <h3
            className="glow-red text-2xl tracking-[0.05em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.name}
          </h3>
          <JP className="glow-cyan text-2xl">{character.kanji}</JP>
        </div>

        {/* Personality — terminal style */}
        <div className="flex items-baseline gap-2 font-mono text-xs">
          <span className="text-neon-cyan">{">"}</span>
          <JP className="text-neon-magenta">{character.personality.jp}</JP>
          <span className="text-text-muted">::</span>
          <span className="text-text-primary">{character.personality.en}</span>
        </div>

        {/* Trait tags */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="border border-neon-cyan/50 bg-deep-900 px-2 py-0.5 font-mono text-[10px] tracking-wider text-neon-cyan"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-50">::</span>
              {trait.en.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Latest message */}
        <div className="border-l-2 border-neon-red bg-deep-900/50 p-2 font-mono text-xs leading-relaxed">
          <JP className="block text-text-primary">
            {">> "}{character.latestMessage.jp}
          </JP>
          <span className="block italic text-text-secondary">
            // {character.latestMessage.en}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-deep-600 pt-3">
          <span className="font-mono text-[10px] tracking-wider text-text-muted">
            {character.voice.toUpperCase()}
          </span>
          <span
            className="glow-red flex items-center gap-1 text-xl transition-all group-hover:scale-110"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONNECT_
            <span className="cursor-blink" />
          </span>
        </div>
      </div>
    </Link>
  )
}
