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
  }, [messages])

  if (!character) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <JP className="text-2xl font-semibold text-rose-400">見つかりません</JP>
        <h1
          className="mt-2 text-4xl text-sage-600"
          style={{ fontFamily: "var(--font-display)" }}
        >
          friend not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block text-xl text-sage-500 underline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          back home ✿
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

  return (
    <main className="mx-auto flex h-[calc(100svh-65px)] max-w-7xl flex-col md:grid md:grid-cols-[1.4fr_1fr] md:gap-4 md:p-4">
      {/* Avatar panel */}
      <section className="watercolor-card relative flex flex-col overflow-hidden">
        <div
          className="relative flex flex-1 overflow-hidden rounded-t-2xl"
          style={{
            minHeight: "240px",
            background: `radial-gradient(ellipse at 50% 35%, ${character.accentColor}33 0%, var(--color-cream-50) 75%)`,
          }}
        >
          {/* Sky band */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-sky-300/30 to-transparent" />

          {/* Drifting clouds */}
          <span className="pointer-events-none absolute left-12 top-10 text-4xl text-cream-50 float">
            ☁
          </span>
          <span
            className="pointer-events-none absolute right-16 top-6 text-3xl text-cream-50 float"
            style={{ animationDelay: "1.5s" }}
          >
            ☁
          </span>

          <VrmViewer
            url={`/vrm/${character.id}.vrm`}
            kanji={character.kanji}
            accentColor={character.accentColor}
            characterName={character.name}
          />

          {/* Top-left character info */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            <Link
              to="/"
              className="rounded-full border border-sage-300 bg-cream-50/90 px-3 py-1 text-sm font-semibold text-sage-600 backdrop-blur hover:bg-sage-300 hover:text-cream-50"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.1em" }}
            >
              ← home
            </Link>
            <div className="rounded-2xl border border-sage-300 bg-cream-50/90 px-3 py-2 backdrop-blur">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl text-sage-600"
                  style={{ fontFamily: "var(--font-display)", lineHeight: "1" }}
                >
                  {character.name.toLowerCase()}
                </span>
                <JP className="text-lg font-semibold text-rose-400">
                  {character.kanji}
                </JP>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <JP className="font-semibold text-sage-500">
                  {character.personality.jp}
                </JP>
                <span className="text-text-muted">·</span>
                <span className="text-text-secondary">
                  {character.personality.en}
                </span>
              </div>
            </div>
          </div>

          {/* Online */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-sage-400 bg-cream-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-sage-500" />
            <span className="text-[10px] font-semibold tracking-wide text-sage-600">
              online
            </span>
          </div>
        </div>

        {/* Status strip */}
        <div className="flex items-center justify-between border-t border-dashed border-sage-300 bg-cream-50/60 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <JP className="font-semibold text-rose-400">感情</JP>
            <span className="text-text-muted">·</span>
            <span className="font-semibold text-emotion-happy">happy ✿</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] font-semibold tracking-wide text-text-muted">
              voice
            </span>
            <span className="text-text-secondary">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="watercolor-card-pink relative flex flex-1 flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 md:px-6"
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-dashed border-rose-300 bg-cream-50/60 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="say something..."
              className="flex-1 rounded-full border border-sage-300 bg-cream-50 px-4 py-2.5 text-sm text-text-primary placeholder:italic placeholder:text-text-muted focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300/40"
              style={{ fontFamily: "var(--font-sans)" }}
            />
            <button
              type="submit"
              className="btn-earthy px-5 py-2.5 text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              send ✿
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-semibold tracking-wide text-text-muted">
            <span>
              <JP className="text-rose-400">送信</JP> · enter to send
            </span>
            <span>50 / day · 0 used</span>
          </div>
        </form>
      </section>
    </main>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-3xl rounded-br-[6px] bg-sage-300 text-cream-50"
              : "rounded-3xl rounded-bl-[6px] border border-sky-300 bg-sky-200/60 text-text-primary"
          }`}
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span
            className="ml-2 text-sm text-rose-400"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ✿ {message.emotion}
          </span>
        )}
      </div>
    </div>
  )
}
