import { CharacterCard } from "../components/CharacterCard"
import { Divider } from "../components/Divider"
import { Hero } from "../components/Hero"
import { JP } from "../components/JP"
import { characters } from "../data/characters"

export function Home() {
  const featured = characters[0]
  const rest = characters.slice(1)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-12 flex flex-col items-center text-center gap-3">
        <span
          className="text-xs tracking-[0.5em] text-gold-400"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ❖ ❖ ❖
        </span>
        <JP className="text-2xl tracking-widest text-gold-300 md:text-3xl">
          キャラクター選択
        </JP>
        <h1
          className="text-glow-rose text-6xl italic tracking-wide text-rose-300 md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          choose your route
        </h1>
        <p
          className="text-base italic text-text-secondary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Each character has their own story, voice, and way of being.
        </p>
      </div>

      <Hero character={featured} />

      <Divider en="cast" jp="登場人物" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {rest.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Divider en="features" jp="システム" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            jp: "声で話す",
            en: "Voice acting",
            body: "Each character speaks with their own voice. Hear them respond in real time.",
            num: "I",
          },
          {
            jp: "表情豊か",
            en: "Live2D feel",
            body: "3D VRM models with gesture and emotion that respond to your words.",
            num: "II",
          },
          {
            jp: "個性",
            en: "Branching story",
            body: "Every conversation shapes the relationship and unlocks new responses.",
            num: "III",
          },
        ].map((feature) => (
          <div
            key={feature.en}
            className="chapter-card ornate-corner relative flex flex-col gap-3 p-6"
          >
            <span
              className="text-glow-gold text-5xl italic leading-none text-gold-400"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.num}
            </span>
            <JP className="text-xs tracking-wider text-rose-300">{feature.jp}</JP>
            <h3
              className="text-2xl italic tracking-wide text-rose-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.en}
            </h3>
            <p
              className="text-sm italic leading-relaxed text-text-secondary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
