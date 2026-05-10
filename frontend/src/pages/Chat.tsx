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
        <JP className="text-2xl font-semibold text-text-secondary">
          見つかりません
        </JP>
        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Character not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block font-semibold text-accent-500 underline"
        >
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
    <main className="mx-auto flex h-[calc(100svh-92px)] max-w-7xl flex-col px-3 md:grid md:grid-cols-[1.4fr_1fr] md:gap-4 md:px-6 md:pb-6">
      {/* Avatar panel */}
      <section className="glass iridescent relative flex flex-col overflow-hidden">
        <div
          className="relative flex flex-1 overflow-hidden rounded-t-3xl"
          style={{
            minHeight: "240px",
            background: `radial-gradient(circle at 50% 40%, ${character.accentColor}33 0%, rgba(255, 255, 255, 0.3) 70%)`,
          }}
        >
          <VrmViewer
            url={`/vrm/${character.id}.vrm`}
            kanji={character.kanji}
            accentColor={character.accentColor}
            characterName={character.name}
          />

          {/* Top-left character info */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <Link
              to="/"
              className="glass-strong flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-text-primary hover:bg-white/80"
            >
              <span>←</span>
              <span>Back</span>
            </Link>
            <div className="glass-strong rounded-2xl px-3 py-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                  {character.name}
                </span>
                <JP className="text-lg font-semibold text-accent-500">
                  {character.kanji}
                </JP>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <JP className="text-text-secondary">{character.personality.jp}</JP>
                <span className="text-text-muted">·</span>
                <span className="text-text-secondary">{character.personality.en}</span>
              </div>
            </div>
          </div>

          {/* Online status */}
          <div className="glass-strong absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emotion-happy opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emotion-happy" />
            </span>
            <span className="text-[11px] font-semibold text-text-primary">Online</span>
          </div>
        </div>

        {/* Status strip */}
        <div className="flex items-center justify-between border-t border-white/40 px-4 py-2.5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <JP className="text-text-secondary">感情</JP>
            <span className="text-text-muted">·</span>
            <span className="font-semibold text-emotion-happy">Happy</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] font-semibold text-text-muted">Voice</span>
            <span className="text-text-secondary">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="glass iridescent relative flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
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
          className="border-t border-white/40 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="glass-subtle flex-1 rounded-full px-4 py-2.5 text-sm font-medium text-text-primary placeholder:text-text-muted focus:bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent-300/40"
            />
            <button
              type="submit"
              className="btn-primary rounded-full px-5 py-2.5 text-xs font-semibold tracking-tight"
            >
              Send
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-text-muted">
            <span>
              <JP>送信</JP> · Enter to send
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
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "btn-primary rounded-3xl rounded-br-md"
              : "glass-strong rounded-3xl rounded-bl-md text-text-primary"
          }`}
          style={
            !isUser
              ? { boxShadow: `0 4px 16px ${accentColor}22, inset 0 1px 0 0 rgba(255,255,255,0.6)` }
              : undefined
          }
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span className="ml-2 text-[10px] font-semibold text-text-muted">
            · {message.emotion}
          </span>
        )}
      </div>
    </div>
  )
}
