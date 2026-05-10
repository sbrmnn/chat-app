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
      <div className="mb-10 flex flex-col items-start gap-2">
        <JP className="text-base font-semibold text-text-secondary">
          キャラクター
        </JP>
        <h1 className="text-5xl font-bold tracking-tight text-text-primary md:text-6xl">
          Choose a companion
        </h1>
        <p className="text-base font-medium text-text-secondary">
          Each character has their own personality, voice, and way of speaking.
        </p>
      </div>

      <Hero character={featured} />

      <Divider en="Characters" jp="キャラクター一覧" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {rest.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Divider en="Features" jp="機能" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          {
            jp: "声で話す",
            en: "Voice chat",
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
            className="glass iridescent flex flex-col gap-2 p-6"
          >
            <JP className="text-xs font-semibold text-accent-500">{feature.jp}</JP>
            <h3 className="text-lg font-semibold tracking-tight text-text-primary">
              {feature.en}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
