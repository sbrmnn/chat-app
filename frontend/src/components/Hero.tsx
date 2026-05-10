import { Link } from "react-router"
import type { Character } from "../types/character"
import { JP } from "./JP"

type Props = {
  character: Character
}

export function Hero({ character }: Props) {
  return (
    <section className="chapter-card ornate-corner relative overflow-hidden">
      {/* Featured ribbon */}
      <div className="name-plate absolute left-6 top-6 z-10 flex items-center gap-2 px-4 py-1.5">
        <span className="text-glow-gold text-gold-300">❖</span>
        <span
          className="text-sm italic tracking-wider text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Chapter I
        </span>
        <JP className="text-[10px] not-italic text-text-primary opacity-80">
          今日のおすすめ
        </JP>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-20 md:grid-cols-[1fr_1.2fr] md:gap-10 md:p-12 md:pt-20">
        {/* Avatar — cinematic portrait frame */}
        <div
          className="vignette relative flex aspect-square items-center justify-center overflow-hidden border border-rose-500/40"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${character.accentColor}55 0%, var(--color-night-900) 70%)`,
          }}
        >
          {/* Soft starry overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(1px_1px_at_30%_25%,rgba(245,240,232,0.6)_0%,transparent_100%),radial-gradient(1px_1px_at_70%_55%,rgba(245,240,232,0.4)_0%,transparent_100%),radial-gradient(1.5px_1.5px_at_45%_75%,rgba(240,217,144,0.4)_0%,transparent_100%)]" />

          <span
            className="relative text-[280px] font-light leading-none"
            translate="no"
            lang="ja"
            style={{
              fontFamily: "var(--font-display)",
              color: character.accentColor,
              textShadow: `0 0 48px ${character.accentColor}99, 0 0 120px ${character.accentColor}66`,
            }}
          >
            {character.kanji}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <span
              className="text-[10px] tracking-[0.4em] text-gold-400"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ❖ FEATURED ROUTE ❖
            </span>
            <div className="mt-2 flex items-baseline gap-4">
              <h1
                className="text-glow-rose text-6xl italic tracking-wide text-rose-300 md:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {character.name.toLowerCase()}
              </h1>
              <JP className="text-4xl text-gold-300 md:text-5xl">
                {character.kanji}
              </JP>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="border border-rose-500/40 bg-night-900/50 px-3 py-1">
              <JP className="text-gold-300">{character.personality.jp}</JP>
              <span className="mx-1.5 text-rose-500">·</span>
              <span
                className="italic text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {character.personality.en}
              </span>
            </span>
            {character.online && (
              <span className="flex items-center gap-1.5 border border-gold-400/60 bg-night-900/50 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_4px_var(--color-gold-300)]" />
                <span
                  className="text-[10px] italic tracking-wider text-gold-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  available now
                </span>
              </span>
            )}
          </div>

          {/* Greeting — VN dialogue box style */}
          <div className="dialogue-box relative px-5 py-4">
            <span className="absolute -top-3 left-4 bg-night-950 px-2 text-xs tracking-widest text-rose-300">
              <JP>{character.kanji}</JP>
            </span>
            <JP className="block text-xl text-text-primary">
              {character.greeting.jp}
            </JP>
            <span
              className="mt-1.5 block text-sm italic text-text-secondary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "{character.greeting.en}"
            </span>
          </div>

          <Link
            to={`/chat/${character.id}`}
            className="vn-choice group inline-flex w-fit items-center gap-3 px-7 py-3 text-base italic tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>▸ Begin chapter</span>
            <JP className="text-xs not-italic opacity-90">チャットする</JP>
          </Link>
        </div>
      </div>
    </section>
  )
}
