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
        <JP className="text-2xl text-gold-400">見つかりません</JP>
        <h1 className="mt-2 text-xl text-text-primary">Character not found</h1>
        <Link to="/" className="mt-4 inline-block text-gold-400 underline">
          Return home
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
    // Stub: echo response. Real impl will hit /api/v1/chat/stream.
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
      <section className="relative flex flex-col border-b border-base-600 md:border md:border-base-600">
        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-gold-400/60 md:h-4 md:w-4" />
        <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-gold-400/60 md:h-4 md:w-4" />
        <span className="pointer-events-none absolute bottom-0 left-0 hidden h-4 w-4 border-b border-l border-gold-400/60 md:block" />
        <span className="pointer-events-none absolute bottom-0 right-0 hidden h-4 w-4 border-b border-r border-gold-400/60 md:block" />

        <div
          className="relative flex flex-1 overflow-hidden bg-gradient-to-b from-base-800 to-base-900"
          style={{ minHeight: "240px" }}
        >
          <VrmViewer
            url={`/vrm/${character.id}.vrm`}
            kanji={character.kanji}
            accentColor={character.accentColor}
            characterName={character.name}
          />

          {/* Top-left character info */}
          <div className="absolute left-4 top-4 flex flex-col gap-0.5">
            <Link
              to="/"
              className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary hover:text-gold-400"
            >
              ← BACK
            </Link>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-light tracking-[0.15em] text-text-primary md:text-xl">
                {character.name}
              </span>
              <JP className="text-lg text-gold-400">{character.kanji}</JP>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <JP>{character.personality.jp}</JP>
              <span className="text-text-muted">·</span>
              <span>{character.personality.en}</span>
            </div>
          </div>

          {/* Top-right online status */}
          <div className="absolute right-4 top-4 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            <span className="text-[10px] tracking-[0.2em] text-teal-400">
              ONLINE
            </span>
          </div>
        </div>

        {/* Emotion strip */}
        <div className="flex items-center justify-between border-t border-base-600 bg-base-800/50 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <JP className="text-text-secondary">感情</JP>
            <span className="text-text-muted">·</span>
            <span className="text-emotion-happy">happy</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] tracking-[0.2em] text-text-muted">
              VOICE
            </span>
            <span className="text-text-secondary">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="relative flex flex-1 flex-col overflow-hidden md:border md:border-base-600">
        <span className="pointer-events-none absolute left-0 top-0 hidden h-4 w-4 border-l border-t border-gold-400/60 md:block" />
        <span className="pointer-events-none absolute right-0 top-0 hidden h-4 w-4 border-r border-t border-gold-400/60 md:block" />
        <span className="pointer-events-none absolute bottom-0 left-0 hidden h-4 w-4 border-b border-l border-gold-400/60 md:block" />
        <span className="pointer-events-none absolute bottom-0 right-0 hidden h-4 w-4 border-b border-r border-gold-400/60 md:block" />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 md:px-6"
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                accentColor={character.accentColor}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-base-600 bg-base-800/40 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 border border-base-500 bg-base-900/60 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              className="border border-gold-400 bg-transparent px-4 py-2.5 text-xs tracking-[0.2em] text-gold-400 transition-colors hover:bg-gold-400 hover:text-base-900"
            >
              SEND
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] tracking-[0.15em] text-text-muted">
            <span>
              <JP>送信</JP> · ENTER to send
            </span>
            <span>50 / day · 0 used</span>
          </div>
        </form>
      </section>
    </main>
  )
}

function MessageBubble({
  message,
  accentColor,
}: {
  message: Message
  accentColor: string
}) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] flex flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "border border-base-500 bg-base-700/60 text-text-primary"
              : "border bg-base-800/60 text-text-primary"
          }`}
          style={
            !isUser
              ? { borderColor: `${accentColor}66` }
              : undefined
          }
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span className="text-[10px] tracking-[0.2em] text-text-muted">
            [ANIM: {message.emotion}]
          </span>
        )}
      </div>
    </div>
  )
}
