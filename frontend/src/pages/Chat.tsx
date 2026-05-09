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
        <JP className="text-3xl font-black text-pink-500">見つかりません</JP>
        <h1
          className="mt-2 text-3xl text-pink-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          character not found
        </h1>
        <Link to="/" className="mt-4 inline-block font-bold text-pink-500 underline">
          return home ♡
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
      <section className="holo-card relative flex flex-col overflow-hidden">
        <div
          className="relative flex flex-1 overflow-hidden"
          style={{
            minHeight: "240px",
            background: `linear-gradient(135deg, ${character.accentColor}33 0%, #fde4f4 50%, #b3f0ff33 100%)`,
          }}
        >
          {/* Floating sparkles */}
          <span className="pointer-events-none absolute left-8 top-12 text-2xl animate-pulse">✨</span>
          <span className="pointer-events-none absolute right-12 top-20 text-xl animate-pulse [animation-delay:0.7s]">⭐</span>
          <span className="pointer-events-none absolute bottom-20 left-16 text-lg animate-pulse [animation-delay:1.2s]">💖</span>

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
              className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-pink-500 shadow-md backdrop-blur hover:bg-pink-500 hover:text-white"
            >
              ← BACK
            </Link>
            <div className="rounded-2xl bg-white/90 px-3 py-2 shadow-md backdrop-blur">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl text-pink-500 md:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {character.name.toLowerCase()}
                </span>
                <JP className="text-lg font-bold text-lav-500">
                  {character.kanji}
                </JP>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <JP className="text-pink-500">{character.personality.jp}</JP>
                <span className="text-text-muted">·</span>
                <span className="text-text-secondary">{character.personality.en}</span>
              </div>
            </div>
          </div>

          {/* Online sticker */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border-2 border-cyan-400 bg-white px-3 py-1 shadow-md">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <span className="text-[10px] font-bold tracking-wider text-cyan-500">
              ONLINE
            </span>
          </div>
        </div>

        {/* Emotion strip */}
        <div className="flex items-center justify-between border-t-2 border-pink-200 bg-white/70 px-4 py-2 text-xs font-bold backdrop-blur">
          <div className="flex items-center gap-2">
            <JP className="text-pink-500">感情</JP>
            <span className="text-text-muted">·</span>
            <span className="text-emotion-happy">happy ♡</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] tracking-wider text-text-muted">VOICE</span>
            <span className="text-text-secondary">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="holo-card relative flex flex-1 flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-white/40 px-4 py-6 backdrop-blur md:px-6"
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
          className="border-t-2 border-pink-200 bg-white/80 p-3 backdrop-blur md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="say something cute..."
              className="flex-1 rounded-full border-2 border-pink-200 bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
            />
            <button
              type="submit"
              className="btn-pastel px-5 py-2.5 text-sm font-bold tracking-wide"
            >
              send ♡
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-wider text-text-muted">
            <span>
              <JP>送信</JP> · enter to send
            </span>
            <span>50 / day · 0 used ✨</span>
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
          className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-3xl rounded-br-sm bg-gradient-to-br from-pink-500 to-lav-400 text-white"
              : "rounded-3xl rounded-bl-sm bg-white/90 text-text-primary backdrop-blur"
          }`}
          style={
            !isUser
              ? { boxShadow: `0 4px 12px ${accentColor}33` }
              : undefined
          }
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span className="ml-2 text-xs font-bold text-pink-500">
            ♡ {message.emotion}
          </span>
        )}
      </div>
    </div>
  )
}
