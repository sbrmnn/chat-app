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
        <JP className="text-2xl font-light text-gold-400 md:text-3xl">
          キャラクター
        </JP>
        <h1 className="text-3xl font-light tracking-[0.05em] text-text-primary md:text-4xl">
          Choose a companion
        </h1>
        <p className="text-sm text-text-secondary">
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

      <div className="grid grid-cols-1 gap-6 text-sm text-text-secondary md:grid-cols-3">
        <div className="flex flex-col gap-2 border border-base-600 p-5">
          <JP className="text-xs text-gold-400">声で話す</JP>
          <h3 className="text-base text-text-primary">Voice conversations</h3>
          <p className="leading-relaxed">
            Each character has a distinct voice. Hear them respond in real time.
          </p>
        </div>
        <div className="flex flex-col gap-2 border border-base-600 p-5">
          <JP className="text-xs text-gold-400">表情豊か</JP>
          <h3 className="text-base text-text-primary">Expressive avatars</h3>
          <p className="leading-relaxed">
            3D VRM models that react with gesture and emotion to your words.
          </p>
        </div>
        <div className="flex flex-col gap-2 border border-base-600 p-5">
          <JP className="text-xs text-gold-400">個性</JP>
          <h3 className="text-base text-text-primary">Real personality</h3>
          <p className="leading-relaxed">
            Each character has their own perspective, taste, and way of being.
          </p>
        </div>
      </div>
    </main>
  )
}
