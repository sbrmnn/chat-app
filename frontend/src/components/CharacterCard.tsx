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
      className="group relative flex flex-col overflow-hidden border border-base-600 bg-base-800/60 transition-all hover:border-gold-400/60 hover:bg-base-700/60"
    >
      {/* Corner marks */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-gold-400/50" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-gold-400/50" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-gold-400/50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-gold-400/50" />

      {/* VRM preview placeholder */}
      <div
        className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b border-base-600 bg-gradient-to-b from-base-700 to-base-900"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${character.accentColor}22, transparent 70%)`,
        }}
      >
        <span
          className="text-[140px] font-light leading-none opacity-30 transition-opacity group-hover:opacity-50"
          translate="no"
          lang="ja"
          style={{ color: character.accentColor }}
        >
          {character.kanji}
        </span>

        {/* Online indicator */}
        {character.online && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="text-[10px] tracking-[0.2em] text-teal-400">
              ONLINE
            </span>
          </div>
        )}

        {/* Affinity stars */}
        <div className="absolute bottom-3 left-3 flex gap-0.5 text-[10px] text-gold-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < character.affinity ? "" : "opacity-25"}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name */}
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-medium tracking-[0.15em] text-text-primary">
            {character.name}
          </h3>
          <JP className="text-base text-gold-400">{character.kanji}</JP>
        </div>

        {/* Personality */}
        <div className="flex items-baseline gap-2 text-xs">
          <JP className="text-text-secondary">{character.personality.jp}</JP>
          <span className="text-text-muted">·</span>
          <span className="text-text-secondary">{character.personality.en}</span>
        </div>

        {/* Trait badges */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="border border-base-500 px-2 py-0.5 text-[10px] tracking-wider text-text-secondary"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-40">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-gold-400/30 via-base-500 to-transparent" />

        {/* Latest message */}
        <div className="flex flex-col gap-1 text-xs leading-relaxed">
          <JP className="text-text-secondary">
            「{character.latestMessage.jp}」
          </JP>
          <span className="text-text-muted italic">
            "{character.latestMessage.en}"
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-base-600 pt-3">
          <span className="text-[10px] tracking-[0.2em] text-text-muted">
            {character.voice.toUpperCase()}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] tracking-[0.25em] text-gold-400 transition-colors group-hover:text-gold-300">
            CHAT
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
