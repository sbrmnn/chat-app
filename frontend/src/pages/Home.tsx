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
      {/* Page title */}
      <div className="mb-8 flex flex-col items-start gap-2">
        <JP className="text-3xl font-black text-accent-red md:text-4xl">
          キャラクター
        </JP>
        <h1
          className="text-4xl font-black tracking-[0.02em] text-ink-900 md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Choose a companion
        </h1>
        <p className="text-sm font-medium text-ink-700">
          Each character has their own personality, voice, and way of speaking.
        </p>
      </div>

      <Hero character={featured} />

      <Divider en="Characters" jp="キャラクター一覧" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {rest.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Divider en="About" jp="このアプリについて" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            jp: "声で話す",
            en: "Voice conversations",
            body: "Each character has a distinct voice. Hear them respond in real time.",
          },
          {
            jp: "表情豊か",
            en: "Expressive avatars",
            body: "3D VRM models that react with gesture and emotion to your words.",
          },
          {
            jp: "個性",
            en: "Real personality",
            body: "Each character has their own perspective, taste, and way of being.",
          },
        ].map((feature) => (
          <div
            key={feature.en}
            className="manga-panel-sm flex flex-col gap-2 p-5"
          >
            <JP className="text-sm font-black text-accent-red">{feature.jp}</JP>
            <h3
              className="text-lg font-black text-ink-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.en}
            </h3>
            <p className="text-sm leading-relaxed text-ink-700">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
