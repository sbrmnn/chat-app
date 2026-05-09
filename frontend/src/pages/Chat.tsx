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
        <JP className="text-3xl font-bold text-orange-400">見つかりません</JP>
        <h1
          className="mt-2 text-3xl text-brown-800"
          style={{ fontFamily: "var(--font-display)" }}
        >
          character not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block font-bold text-orange-400 underline hover:text-orange-500"
        >
          return home →
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
      <section className="vintage-card relative flex flex-col overflow-hidden">
        <div
          className="grain relative flex flex-1 overflow-hidden"
          style={{
            minHeight: "240px",
            background: `linear-gradient(180deg, ${character.accentColor}22 0%, var(--color-cream-50) 100%)`,
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
              className="border-2 border-brown-700 bg-cream-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-brown-700 hover:bg-brown-700 hover:text-cream-50"
            >
              ← BACK
            </Link>
            <div className="border-2 border-brown-700 bg-cream-50 px-3 py-2 shadow-[2px_2px_0_0_var(--color-mustard-400)]">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl text-brown-800 md:text-3xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {character.name}
                </span>
                <JP className="text-xl font-bold text-orange-400">
                  {character.kanji}
                </JP>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <JP className="text-orange-400">{character.personality.jp}</JP>
                <span className="text-brown-600">·</span>
                <span className="italic text-brown-700">
                  {character.personality.en}
                </span>
              </div>
            </div>
          </div>

          {/* Online stamp */}
          <div className="vintage-seal absolute right-4 top-4 -rotate-12 px-3 py-0.5 text-[10px] font-bold tracking-[0.15em]">
            ONLINE
          </div>
        </div>

        {/* Status strip */}
        <div className="flex items-center justify-between border-t-2 border-brown-600 bg-cream-200 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <JP className="text-orange-400">感情</JP>
            <span className="text-brown-600">·</span>
            <span className="text-emotion-happy">happy</span>
            <span className="text-brown-600">·</span>
            <span className="text-brown-700">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] tracking-[0.15em] text-brown-600">
              VOICE
            </span>
            <span className="italic text-brown-700">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="vintage-card relative flex flex-1 flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="grain flex-1 overflow-y-auto bg-cream-50 px-4 py-6 md:px-6"
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t-2 border-brown-600 bg-cream-200 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="お話しください..."
              className="flex-1 border-2 border-brown-600 bg-cream-50 px-3 py-2.5 text-sm text-brown-800 placeholder:italic placeholder:text-brown-600/60 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="border-2 border-brown-700 bg-brown-700 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-cream-50 shadow-[2px_2px_0_0_var(--color-mustard-400)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[4px_4px_0_0_var(--color-mustard-400)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SEND
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-[0.1em] text-brown-600">
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
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "border-2 border-brown-700 bg-brown-700 text-cream-50"
              : "border-2 border-brown-600 bg-cream-100 text-brown-800 shadow-[2px_2px_0_0_var(--color-mustard-400)]"
          }`}
        >
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span className="ml-2 text-[10px] font-bold italic tracking-wider text-orange-400">
            ❀ {message.emotion}
          </span>
        )}
      </div>
    </div>
  )
}
