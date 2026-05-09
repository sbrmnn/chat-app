import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

const SOUND_EFFECTS: Record<string, string> = {
  saki: "ピカッ",
  yuki: "シーン",
  hana: "キラキラ",
  aoi: "ドキッ",
  koharu: "ふんわり",
  mei: "ワクワク",
}

export function CharacterCard({ character }: Props) {
  const fx = SOUND_EFFECTS[character.id] ?? "！"

  return (
    <Link
      to={`/chat/${character.id}`}
      className="manga-panel group relative flex flex-col overflow-hidden transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink-900)]"
    >
      {/* Avatar area — halftone gradient bg, dramatic kanji */}
      <div
        className="halftone relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b-[2.5px] border-ink-900 bg-paper-50"
      >
        {/* Action lines burst behind kanji */}
        <div className="action-lines pointer-events-none absolute inset-0 opacity-[0.07]" />

        <span
          className="relative text-[160px] font-black leading-none text-ink-900"
          translate="no"
          lang="ja"
          style={{
            fontFamily: "var(--font-display)",
            textShadow: `4px 4px 0 ${character.accentColor}, 8px 8px 0 var(--color-paper-200)`,
          }}
        >
          {character.kanji}
        </span>

        {/* Sound effect — top right corner */}
        <span
          className="absolute right-3 top-3 -rotate-12 text-2xl font-black text-accent-red"
          translate="no"
          lang="ja"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {fx}
        </span>

        {/* Online tag — looks like a manga sticker */}
        {character.online && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 border-2 border-ink-900 bg-paper-50 px-2 py-0.5">
            <span className="h-2 w-2 rounded-full bg-accent-red" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-ink-900">
              ONLINE
            </span>
          </div>
        )}

        {/* Affinity stars — top left */}
        <div className="absolute left-3 top-3 flex gap-0.5 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < character.affinity
                  ? "text-accent-red"
                  : "text-ink-400 opacity-40"
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name */}
        <div className="flex items-baseline justify-between">
          <h3
            className="text-xl font-black tracking-[0.05em] text-ink-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {character.name}
          </h3>
          <JP className="text-2xl font-black text-accent-red">
            {character.kanji}
          </JP>
        </div>

        {/* Personality */}
        <div className="flex items-baseline gap-2 text-xs font-medium">
          <JP className="text-ink-700">{character.personality.jp}</JP>
          <span className="text-ink-400">·</span>
          <span className="text-ink-700">{character.personality.en}</span>
        </div>

        {/* Trait badges */}
        <div className="flex flex-wrap gap-1.5">
          {character.traits.map((trait) => (
            <span
              key={trait.en}
              className="border-2 border-ink-900 bg-paper-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-ink-900"
            >
              <JP>{trait.jp}</JP>
              <span className="mx-1 opacity-50">·</span>
              {trait.en}
            </span>
          ))}
        </div>

        {/* Latest message — manga speech bubble */}
        <div className="speech-bubble-them mt-1 px-3 py-2.5">
          <JP className="block text-xs font-bold leading-snug text-ink-900">
            「{character.latestMessage.jp}」
          </JP>
          <span className="block text-[11px] italic text-ink-500">
            "{character.latestMessage.en}"
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t-2 border-ink-900 pt-3">
          <span className="text-[10px] font-bold tracking-[0.15em] text-ink-500">
            {character.voice.toUpperCase()}
          </span>
          <span
            className="flex items-center gap-1 text-sm font-black tracking-[0.1em] text-accent-red transition-transform group-hover:scale-110"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CHAT
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
