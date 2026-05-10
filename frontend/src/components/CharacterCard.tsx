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
      className="chapter-card ornate-corner group relative flex flex-col overflow-hidden"
    >
      {/* Avatar — like a character portrait card */}
      <div
        className="vignette relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b border-rose-500/30"
        style={{
          background: `linear-gradient(180deg, ${character.accentColor}33 0%, var(--color-night-900) 100%)`,
        }}
      >
        <span
          className="text-[150px] font-light leading-none transition-all group-hover:scale-110"
          translate="no"
          lang="ja"
          style={{
            fontFamily: "var(--font-display)",
            color: character.accentColor,
            textShadow: `0 0 32px ${character.accentColor}88, 0 0 80px ${character.accentColor}44`,
          }}
        >
          {character.kanji}
        </span>

        {/* Online seal */}
        {character.online && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 border border-gold-400/60 bg-night-900/80 px-2 py-0.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_4px_var(--color-gold-300)]" />
            <span
              className="text-[9px] italic tracking-wider text-gold-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              available
            </span>
          </div>
        )}

        {/* Affinity hearts */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 border border-rose-500/40 bg-night-900/80 px-2 py-0.5 backdrop-blur">
          <span className="text-rose-400">♥</span>
          <span
            className="text-xs italic tracking-wider text-rose-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.affinity}/5
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name plate */}
        <div className="flex items-baseline justify-between">
          <h3
            className="text-glow-rose text-3xl italic tracking-wide text-rose-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.name.toLowerCase()}
          </h3>
          <JP className="text-2xl text-gold-300">{character.kanji}</JP>
        </div>

        {/* Personality — quote */}
        <div className="flex items-baseline gap-2 text-sm">
          <JP className="text-gold-300">{character.personality.jp}</JP>
          <span className="text-rose-500">·</span>
          <span
            className="italic text-text-secondary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.personality.en}
          </span>
        </div>

        {/* Trait labels */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="border border-rose-500/30 px-2 py-0.5 text-[10px] tracking-wider text-text-secondary"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              <JP className="not-italic">{trait.jp}</JP>
              <span className="mx-1 opacity-50">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Latest message — italicized quote */}
        <div className="border-l-2 border-rose-400/60 bg-night-900/40 px-3 py-2 text-sm leading-relaxed">
          <JP className="block text-text-primary">
            「{character.latestMessage.jp}」
          </JP>
          <span
            className="block italic text-text-secondary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "{character.latestMessage.en}"
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-rose-500/20 pt-3">
          <span
            className="text-[11px] italic tracking-wider text-text-muted"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.voice}
          </span>
          <span
            className="vn-choice px-4 py-1.5 text-xs italic tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ▸ Begin chapter
          </span>
        </div>
      </div>
    </Link>
  )
}
