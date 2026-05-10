import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router"
import { JP } from "../components/JP"
import { VrmViewer } from "../components/vrm/VrmViewer"
import { getCharacter } from "../data/characters"

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
  emotion?: string
}

export function Chat() {
  const { id } = useParams<{ id: string }>()
  const character = id ? getCharacter(id) : undefined

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (character && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          text: character.greeting.en,
          emotion: "happy",
        },
      ])
    }
  }, [character, messages.length])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, showHistory])

  if (!character) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <JP className="text-2xl text-rose-300">見つかりません</JP>
        <h1
          className="text-glow-rose mt-2 text-4xl italic text-rose-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          chapter not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block italic text-gold-300 underline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ← Return to chapter select
        </Link>
      </main>
    )
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: input,
    }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "(streaming endpoint not yet wired)",
          emotion: "neutral",
        },
      ])
    }, 400)
  }

  // The most recent message gets the spotlight in VN-style;
  // earlier turns are hidden behind a Log button.
  const currentMsg = messages[messages.length - 1]
  const earlierMsgs = messages.slice(0, -1)

  return (
    <main className="relative h-[calc(100svh-65px)] overflow-hidden">
      {/* Full-bleed scene with VRM */}
      <div
        className="vignette absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${character.accentColor}33 0%, var(--color-night-950) 75%)`,
        }}
      >
        <VrmViewer
          url={`/vrm/${character.id}.vrm`}
          kanji={character.kanji}
          accentColor={character.accentColor}
          characterName={character.name}
        />

        {/* Soft starry overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(1px_1px_at_18%_20%,rgba(245,240,232,0.5)_0%,transparent_100%),radial-gradient(1px_1px_at_72%_15%,rgba(245,240,232,0.4)_0%,transparent_100%),radial-gradient(1.5px_1.5px_at_45%_60%,rgba(240,217,144,0.3)_0%,transparent_100%)]" />
      </div>

      {/* Top-left HUD */}
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        <Link
          to="/"
          className="vn-choice flex items-center gap-1.5 px-3 py-1 text-xs italic tracking-wider"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ← Chapter select
        </Link>
      </div>

      {/* Top-right HUD — VN menu buttons */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="vn-choice px-3 py-1 text-xs italic tracking-wider"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {showHistory ? "▾ Hide log" : "▸ Log"}
        </button>
        <span className="border border-rose-500/40 bg-night-900/80 px-3 py-1 text-[10px] italic tracking-wider text-rose-300 backdrop-blur"
              style={{ fontFamily: "var(--font-display)" }}>
          {messages.length} / 50 lines
        </span>
      </div>

      {/* History overlay (toggleable) */}
      {showHistory && (
        <div
          ref={scrollRef}
          className="dialogue-box absolute inset-x-4 top-16 bottom-56 z-10 overflow-y-auto rounded-none p-4"
        >
          <h2
            className="mb-3 text-glow-rose text-xl italic tracking-wider text-rose-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ❖ Backlog
          </h2>
          <div className="flex flex-col gap-3">
            {earlierMsgs.map((msg) => (
              <LogLine key={msg.id} message={msg} character={character} />
            ))}
          </div>
        </div>
      )}

      {/* VN dialogue box at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3 md:p-4">
        <div className="dialogue-box relative mx-auto max-w-5xl px-6 pb-4 pt-7">
          {/* Name plate */}
          {currentMsg && currentMsg.role === "assistant" && (
            <div className="name-plate absolute -top-4 left-6 flex items-center gap-2 px-4 py-1.5">
              <JP className="text-base font-medium text-text-primary">
                {character.kanji}
              </JP>
              <span
                className="text-base italic tracking-wider text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {character.name.toLowerCase()}
              </span>
            </div>
          )}
          {currentMsg && currentMsg.role === "user" && (
            <div className="absolute -top-4 left-6 flex items-center gap-2 border border-gold-400/60 bg-night-900 px-4 py-1.5">
              <span
                className="text-base italic tracking-wider text-gold-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                you
              </span>
            </div>
          )}

          {/* Dialogue text */}
          {currentMsg && (
            <div className="mb-4 min-h-[3em]">
              <p
                className="text-lg leading-relaxed text-text-primary md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {currentMsg.text}
              </p>
              {currentMsg.role === "assistant" && currentMsg.emotion && (
                <span className="mt-2 inline-block text-xs italic tracking-wider text-gold-400 opacity-70"
                      style={{ fontFamily: "var(--font-display)" }}>
                  ❖ {currentMsg.emotion}
                </span>
              )}
            </div>
          )}

          {/* Input form — VN choice prompt */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <span className="text-rose-400">▸</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you say?"
              className="flex-1 border-b border-rose-500/40 bg-transparent px-2 py-2 text-base italic text-text-primary placeholder:text-text-muted/70 focus:border-rose-300 focus:outline-none"
              style={{ fontFamily: "var(--font-display)" }}
            />
            <button
              type="submit"
              className="vn-choice px-5 py-2 text-sm italic tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Speak
            </button>
          </form>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between text-[10px] italic tracking-wider text-text-muted"
               style={{ fontFamily: "var(--font-display)" }}>
            <span>
              <JP className="not-italic text-rose-400">送信</JP> · Enter to send
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emotion-happy">●</span>
              <JP className="not-italic">{character.personality.jp}</JP> ·{" "}
              {character.personality.en} · {character.voice}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

function LogLine({
  message,
  character,
}: {
  message: Message
  character: ReturnType<typeof getCharacter>
}) {
  if (!character) return null
  const isUser = message.role === "user"
  return (
    <div className="border-l-2 border-rose-500/30 pl-3">
      <div className="mb-0.5 flex items-baseline gap-2 text-xs">
        <span
          className={`italic tracking-wider ${
            isUser ? "text-gold-300" : "text-rose-300"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {isUser ? "you" : character.name.toLowerCase()}
        </span>
        {!isUser && <JP className="text-rose-300/70">{character.kanji}</JP>}
      </div>
      <p className="text-sm leading-relaxed text-text-primary"
         style={{ fontFamily: "var(--font-display)" }}>
        {message.text}
      </p>
    </div>
  )
}
