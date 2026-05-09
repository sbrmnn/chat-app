import { CharacterCard } from "../components/CharacterCard"
import { Divider } from "../components/Divider"
import { Hero } from "../components/Hero"
import { JP } from "../components/JP"
import { characters } from "../data/characters"

export function Home() {
  const featured = characters[0]
  const rest = characters.slice(1)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start gap-2">
        <JP className="text-2xl font-bold text-neon-magenta md:text-3xl">
          {">"} キャラクター
        </JP>
        <h1
          className="glow-red text-5xl tracking-[0.05em] md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SELECT_TARGET
        </h1>
        <p className="font-mono text-sm text-text-secondary">
          // 6 SUBJECTS AVAILABLE :: VOICE-CAPABLE :: VRM-RENDERED
        </p>
      </div>

      <Hero character={featured} />

      <Divider en="characters" jp="キャラクター一覧" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {rest.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Divider en="modules" jp="システム情報" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          {
            jp: "音声出力",
            en: "VOICE_MOD",
            body: "Distinct voice profile per subject. Real-time speech synthesis.",
            id: "01",
          },
          {
            jp: "表情処理",
            en: "EXPRESSION",
            body: "3D VRM rigs respond to dialogue with gesture and emotion.",
            id: "02",
          },
          {
            jp: "個性核",
            en: "PERSONA",
            body: "Each subject has a unique perspective and conversational style.",
            id: "03",
          },
        ].map((feature) => (
          <div
            key={feature.en}
            className="corner-brackets relative flex flex-col gap-2 border border-neon-cyan/40 bg-deep-800/60 p-5 backdrop-blur transition-colors hover:border-neon-cyan"
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-text-muted">
              <span>MOD.{feature.id}</span>
              <span className="text-neon-cyan">● ACTIVE</span>
            </div>
            <JP className="text-xs font-bold text-neon-magenta">{feature.jp}</JP>
            <h3
              className="glow-cyan text-2xl tracking-[0.1em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.en}
            </h3>
            <p className="font-mono text-xs leading-relaxed text-text-secondary">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
