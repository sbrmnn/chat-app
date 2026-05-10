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
      className="glass iridescent group relative flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(31,71,204,0.15)]"
    >
      {/* Avatar area — soft gradient */}
      <div
        className="relative flex aspect-[3/4] items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${character.accentColor}33 0%, rgba(255, 255, 255, 0.4) 50%, ${character.accentColor}1f 100%)`,
        }}
      >
        <span
          className="text-[140px] font-light leading-none opacity-90 transition-transform group-hover:scale-110"
          translate="no"
          lang="ja"
          style={{
            color: character.accentColor,
            textShadow: `0 8px 32px ${character.accentColor}55, 0 0 80px ${character.accentColor}33`,
          }}
        >
          {character.kanji}
        </span>

        {/* Online pill */}
        {character.online && (
          <div className="glass-strong absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emotion-happy opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emotion-happy" />
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-text-primary">
              Online
            </span>
          </div>
        )}

        {/* Affinity */}
        <div className="glass-strong absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1">
          <span className="text-[10px] font-semibold text-text-secondary">
            ★
          </span>
          <span className="text-[10px] font-semibold text-text-primary">
            {character.affinity}.0
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name */}
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-text-primary">
            {character.name}
          </h3>
          <JP className="text-lg font-medium text-accent-500">
            {character.kanji}
          </JP>
        </div>

        {/* Personality */}
        <div className="flex items-baseline gap-2 text-xs font-medium">
          <JP className="text-text-secondary">{character.personality.jp}</JP>
          <span className="text-text-muted">·</span>
          <span className="text-text-secondary">{character.personality.en}</span>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="glass-subtle rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-text-primary"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-50">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Latest message — speech */}
        <div className="glass-subtle rounded-2xl rounded-bl-sm px-3 py-2 text-xs leading-relaxed">
          <JP className="block font-medium text-text-primary">
            {character.latestMessage.jp}
          </JP>
          <span className="block italic text-text-secondary">
            {character.latestMessage.en}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-white/40 pt-3">
          <span className="text-[10px] font-semibold text-text-muted">
            {character.voice}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-accent-500 transition-transform group-hover:translate-x-1">
            Chat
            <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
