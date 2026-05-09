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
      className="vintage-card group relative flex flex-col overflow-hidden transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      {/* Avatar area — warm tinted bg */}
      <div
        className="grain relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b-2 border-brown-600"
        style={{
          background: `linear-gradient(180deg, ${character.accentColor}22 0%, var(--color-cream-50) 100%)`,
        }}
      >
        {/* Diagonal stripe header */}
        <div className="stripes-warm pointer-events-none absolute inset-x-0 top-0 h-8" />

        <span
          className="text-[160px] font-bold leading-none transition-transform group-hover:scale-105"
          translate="no"
          lang="ja"
          style={{
            fontFamily: "var(--font-display)",
            color: character.accentColor,
            textShadow: "3px 3px 0 var(--color-cream-200)",
          }}
        >
          {character.kanji}
        </span>

        {/* Vintage stamp — top-right */}
        {character.online && (
          <div className="vintage-seal absolute right-3 top-3 -rotate-12 px-2 py-0.5 text-[9px] font-bold tracking-[0.15em]">
            ONLINE
          </div>
        )}

        {/* Affinity stars */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between border-t border-brown-600/30 bg-cream-50/80 px-2 py-1">
          <span className="text-[10px] font-bold tracking-wider text-brown-700">
            ★&nbsp;AFFINITY
          </span>
          <div className="flex gap-0.5 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < character.affinity ? "text-mustard-400" : "text-brown-600/30"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name with subtitle */}
        <div className="border-b-2 border-dotted border-brown-600/40 pb-2">
          <div className="flex items-baseline justify-between">
            <h3
              className="text-2xl text-brown-800"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              {character.name}
            </h3>
            <JP className="text-2xl font-bold text-orange-400">
              {character.kanji}
            </JP>
          </div>
          <div className="flex items-baseline gap-2 text-xs font-medium">
            <JP className="text-orange-400">{character.personality.jp}</JP>
            <span className="text-brown-600">·</span>
            <span className="italic text-brown-700">{character.personality.en}</span>
          </div>
        </div>

        {/* Trait stamps */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="border border-brown-600 bg-cream-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-brown-700"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-50">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Latest message — quote box */}
        <div className="relative border-l-2 border-orange-400 bg-cream-100/70 px-3 py-2">
          <span className="absolute -left-1 top-1 text-2xl leading-none text-orange-400">
            ❝
          </span>
          <div className="pl-3 text-xs leading-relaxed">
            <JP className="block font-medium text-brown-800">
              {character.latestMessage.jp}
            </JP>
            <span className="block italic text-brown-600">
              {character.latestMessage.en}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-brown-600/40 pt-2">
          <span className="text-[10px] font-bold tracking-[0.1em] text-brown-600">
            {character.voice}
          </span>
          <span
            className="flex items-center gap-1 bg-mustard-400 px-3 py-1 text-xs font-bold tracking-[0.15em] text-brown-800 transition-all group-hover:bg-orange-400 group-hover:text-cream-50"
          >
            CHAT →
          </span>
        </div>
      </div>
    </Link>
  )
}
