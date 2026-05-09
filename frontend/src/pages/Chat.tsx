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
        <JP className="text-3xl font-black text-accent-red">見つかりません</JP>
        <h1
          className="mt-2 text-2xl font-black text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Character not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block font-bold text-accent-red underline"
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
    <main className="mx-auto flex h-[calc(100svh-65px)] max-w-7xl flex-col md:grid md:grid-cols-[1.4fr_1fr] md:gap-4 md:p-4">
      {/* Avatar panel */}
      <section className="manga-panel relative flex flex-col overflow-hidden">
        <div
          className="relative flex flex-1 overflow-hidden bg-paper-50"
          style={{ minHeight: "240px" }}
        >
          {/* Halftone background behind VRM */}
          <div className="halftone pointer-events-none absolute inset-0 opacity-50" />

          <VrmViewer
            url={`/vrm/${character.id}.vrm`}
            kanji={character.kanji}
            accentColor={character.accentColor}
            characterName={character.name}
          />

          {/* Top-left character info — manga style */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <Link
              to="/"
              className="manga-panel-sm bg-paper-50 px-2 py-1 text-[10px] font-black tracking-[0.15em] text-ink-900 hover:bg-ink-900 hover:text-paper-50"
            >
              ← BACK
            </Link>
            <div className="manga-panel-sm bg-paper-50 px-3 py-1.5">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-lg font-black tracking-[0.05em] text-ink-900 md:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {character.name}
                </span>
                <JP className="text-lg font-black text-accent-red">
                  {character.kanji}
                </JP>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <JP className="text-ink-700">{character.personality.jp}</JP>
                <span className="text-ink-400">·</span>
                <span className="text-ink-700">{character.personality.en}</span>
              </div>
            </div>
          </div>

          {/* Top-right online status */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 border-2 border-ink-900 bg-paper-50 px-2 py-0.5">
            <span className="h-2 w-2 rounded-full bg-accent-red" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-ink-900">
              ONLINE
            </span>
          </div>
        </div>

        {/* Emotion strip */}
        <div className="flex items-center justify-between border-t-[2.5px] border-ink-900 bg-paper-100 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <JP className="text-ink-700">感情</JP>
            <span className="text-ink-400">·</span>
            <span className="text-emotion-happy">happy</span>
            <span className="text-ink-400">·</span>
            <span className="text-ink-700">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] tracking-[0.15em] text-ink-500">
              VOICE
            </span>
            <span className="text-ink-700">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="manga-panel relative flex flex-1 flex-col overflow-hidden bg-paper-50">
        <div
          ref={scrollRef}
          className="halftone flex-1 overflow-y-auto px-4 py-6 md:px-6"
        >
          <div className="flex flex-col gap-6">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t-[2.5px] border-ink-900 bg-paper-100 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 border-2 border-ink-900 bg-paper-50 px-3 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="border-[2.5px] border-ink-900 bg-accent-red px-4 py-2.5 text-xs font-black tracking-[0.2em] text-paper-50 shadow-[3px_3px_0_0_var(--color-ink-900)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink-900)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SEND
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-[0.1em] text-ink-500">
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

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[80%] flex-col gap-1.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 text-sm font-medium leading-relaxed ${
            isUser ? "speech-bubble-me" : "speech-bubble-them"
          }`}
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span
            className="ml-2 -rotate-2 text-xs font-black tracking-[0.1em] text-accent-red"
            style={{ fontFamily: "var(--font-display)" }}
          >
            [{message.emotion.toUpperCase()}!]
          </span>
        )}
      </div>
    </div>
  )
}
