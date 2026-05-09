import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

const SPARKLES: Record<string, string> = {
  saki: "✨",
  yuki: "❄️",
  hana: "🌸",
  aoi: "💎",
  koharu: "🌷",
  mei: "🌟",
}

export function CharacterCard({ character }: Props) {
  const sparkle = SPARKLES[character.id] ?? "✨"

  return (
    <Link
      to={`/chat/${character.id}`}
      className="holo-card group relative flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,110,199,0.3)]"
    >
      {/* Avatar area — pastel gradient bg */}
      <div
        className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b-2 border-pink-200/60"
        style={{
          background: `linear-gradient(135deg, ${character.accentColor}33 0%, #fde4f4 50%, #b3f0ff33 100%)`,
        }}
      >
        {/* Floating sparkles */}
        <span className="absolute left-4 top-6 text-2xl opacity-60 animate-pulse">
          {sparkle}
        </span>
        <span className="absolute bottom-12 right-6 text-xl opacity-50 animate-pulse [animation-delay:0.5s]">
          ✨
        </span>

        <span
          className="text-[140px] leading-none transition-all group-hover:scale-110"
          translate="no"
          lang="ja"
          style={{
            fontFamily: "var(--font-display)",
            color: character.accentColor,
            textShadow: `0 4px 20px ${character.accentColor}55, 0 8px 32px rgba(255, 110, 199, 0.3)`,
          }}
        >
          {character.kanji}
        </span>

        {/* Online sticker */}
        {character.online && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border-2 border-cyan-300 bg-white/90 px-2.5 py-1 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span className="text-[10px] font-bold tracking-wide text-cyan-500">
              ONLINE
            </span>
          </div>
        )}

        {/* Affinity hearts */}
        <div className="absolute bottom-3 left-3 flex gap-0.5 text-base">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < character.affinity ? "text-pink-500" : "text-pink-200"}
            >
              ♡
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="relative flex flex-1 flex-col gap-3 bg-white/60 p-4 backdrop-blur-sm">
        {/* Name */}
        <div className="flex items-baseline justify-between">
          <h3
            className="text-2xl text-pink-500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.name.toLowerCase()}
          </h3>
          <JP className="text-xl font-bold text-lav-500">{character.kanji}</JP>
        </div>

        {/* Personality */}
        <div className="flex items-baseline gap-2 text-xs font-medium">
          <JP className="text-pink-500">{character.personality.jp}</JP>
          <span className="text-text-muted">·</span>
          <span className="text-text-secondary">{character.personality.en}</span>
        </div>

        {/* Trait pills */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="rounded-full border border-lav-300 bg-lav-300/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-lav-500"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-50">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Latest message — speech bubble */}
        <div className="rounded-2xl rounded-bl-sm bg-cyan-300/30 px-3 py-2 text-xs leading-relaxed">
          <JP className="block font-bold text-text-primary">
            「{character.latestMessage.jp}」
          </JP>
          <span className="block italic text-text-secondary">
            "{character.latestMessage.en}"
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-pink-200 pt-3">
          <span className="text-[10px] font-bold tracking-wider text-text-muted">
            {character.voice}
          </span>
          <span
            className="flex items-center gap-1 text-base text-pink-500 transition-transform group-hover:translate-x-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            chat ♡ →
          </span>
        </div>
      </div>
    </Link>
  )
}
