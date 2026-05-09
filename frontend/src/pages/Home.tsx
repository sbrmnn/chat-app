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
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-brown-600" />
          <JP className="text-base font-bold tracking-[0.2em] text-orange-400">
            キャラクター喫茶
          </JP>
        </div>
        <h1
          className="text-5xl text-brown-800 md:text-6xl"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.05em",
          }}
        >
          choose a companion
        </h1>
        <p className="text-sm font-medium italic text-brown-700">
          Each character has their own personality, voice, and way of speaking.
        </p>
      </div>

      <Hero character={featured} />

      <Divider en="characters" jp="キャラクター一覧" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {rest.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Divider en="features" jp="このアプリについて" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            jp: "声で話す",
            en: "voice chat",
            body: "Each character has a distinct voice. Hear them respond in real time.",
            num: "01",
          },
          {
            jp: "表情豊か",
            en: "expressive",
            body: "3D VRM models that react with gesture and emotion to your words.",
            num: "02",
          },
          {
            jp: "個性",
            en: "personality",
            body: "Each character has their own perspective, taste, and way of being.",
            num: "03",
          },
        ].map((feature) => (
          <div
            key={feature.en}
            className="vintage-card relative flex flex-col gap-2 p-6"
          >
            <span
              className="text-4xl font-bold leading-none text-mustard-400"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.num}
            </span>
            <JP className="text-xs font-bold text-orange-400">{feature.jp}</JP>
            <h3
              className="text-2xl text-brown-800"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              {feature.en}
            </h3>
            <p className="text-sm leading-relaxed text-brown-700">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
