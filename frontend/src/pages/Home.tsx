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
        <JP className="text-2xl font-black text-pink-500 md:text-3xl">
          キャラクター ✨
        </JP>
        <h1
          className="text-5xl text-pink-500 md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          choose a companion ♡
        </h1>
        <p className="text-sm font-medium text-text-secondary">
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

      <Divider en="about" jp="このアプリについて" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            jp: "声で話す",
            en: "voice chat",
            body: "Each character has a distinct voice. Hear them respond in real time.",
            emoji: "🎵",
          },
          {
            jp: "表情豊か",
            en: "expressive",
            body: "3D VRM models that react with gesture and emotion to your words.",
            emoji: "💫",
          },
          {
            jp: "個性",
            en: "personality",
            body: "Each character has their own perspective, taste, and way of being.",
            emoji: "💖",
          },
        ].map((feature) => (
          <div
            key={feature.en}
            className="holo-card relative flex flex-col gap-2 p-6"
          >
            <span className="absolute right-4 top-4 text-3xl">{feature.emoji}</span>
            <JP className="text-sm font-black text-pink-500">{feature.jp}</JP>
            <h3
              className="text-2xl text-pink-500"
              style={{ fontFamily: "var(--font-display)" }}
            >
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
