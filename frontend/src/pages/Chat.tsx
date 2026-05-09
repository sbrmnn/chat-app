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
        <JP className="text-2xl font-bold text-neon-red">見つかりません</JP>
        <h1
          className="glow-red mt-2 text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ERROR_404 :: TARGET_NOT_FOUND
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block font-mono text-neon-cyan underline hover:text-neon-cyan-glow"
        >
          {"<< return_home"}
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
      <section className="corner-brackets relative flex flex-col overflow-hidden border border-neon-red/40 bg-deep-900">
        <div className="relative flex flex-1 overflow-hidden" style={{ minHeight: "240px" }}>
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.04)_0px,rgba(0,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />

          <VrmViewer
            url={`/vrm/${character.id}.vrm`}
            kanji={character.kanji}
            accentColor={character.accentColor}
            characterName={character.name}
          />

          {/* Top-left character HUD */}
          <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
            <Link
              to="/"
              className="border border-neon-cyan/60 bg-deep-900/90 px-3 py-1 font-mono text-[10px] tracking-wider text-neon-cyan backdrop-blur hover:bg-neon-cyan hover:text-void"
            >
              {"<< BACK"}
            </Link>
            <div className="border border-neon-red/60 bg-deep-900/90 px-3 py-2 backdrop-blur">
              <div className="flex items-baseline gap-2">
                <span
                  className="glow-red text-2xl tracking-[0.05em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {character.name}
                </span>
                <JP className="glow-cyan text-2xl">{character.kanji}</JP>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neon-cyan">{">"}</span>
                <JP className="text-neon-magenta">{character.personality.jp}</JP>
                <span className="text-text-muted">::</span>
                <span className="text-text-primary">{character.personality.en}</span>
              </div>
            </div>
          </div>

          {/* Top-right HUD */}
          <div className="absolute right-3 top-3 z-20 flex flex-col items-end gap-1 font-mono text-[10px]">
            <span className="border border-neon-cyan bg-deep-900/90 px-2 py-0.5 text-neon-cyan">
              SUBJECT.{character.id.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 border border-neon-red bg-deep-900/90 px-2 py-0.5 text-neon-red">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-red shadow-[0_0_4px_rgba(255,0,60,1)]" />
              CONNECTED
            </span>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-neon-red/40 bg-deep-800 px-4 py-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <JP className="text-neon-magenta">感情</JP>
            <span className="text-text-muted">::</span>
            <span className="glow-cyan">happy</span>
            <span className="text-text-muted">::</span>
            <span className="text-text-secondary">idle</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-text-muted">VOICE_PROFILE</span>
            <span className="text-neon-cyan">{character.voice}</span>
          </div>
        </div>
      </section>

      {/* Chat panel */}
      <section className="corner-brackets relative flex flex-1 flex-col overflow-hidden border border-neon-cyan/40 bg-deep-900">
        <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4 md:px-6">
          {/* Scanlines */}
          <div className="pointer-events-none fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.02)_0px,rgba(0,255,255,0.02)_1px,transparent_1px,transparent_3px)]" />

          <div className="relative flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-neon-cyan/40 bg-deep-800 p-3 md:p-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-neon-cyan">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter_message..."
              className="flex-1 border border-neon-cyan/40 bg-deep-900 px-3 py-2.5 font-mono text-sm text-neon-cyan placeholder:text-text-muted focus:border-neon-cyan focus:outline-none focus:shadow-[0_0_8px_rgba(0,255,255,0.4)]"
            />
            <button
              type="submit"
              className="neon-box-red glow-red bg-deep-900 px-4 py-2.5 text-xs tracking-[0.2em] transition-all hover:bg-neon-red hover:text-void"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TRANSMIT
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-wider text-text-muted">
            <span>
              <JP className="text-neon-magenta">送信</JP> :: ENTER_TO_SEND
            </span>
            <span className="text-neon-cyan">QUOTA: 50/DAY :: USED: 0</span>
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
          className={`px-4 py-2.5 font-mono text-sm leading-relaxed ${
            isUser
              ? "border border-neon-cyan/60 bg-deep-800 text-text-primary shadow-[0_0_8px_rgba(0,255,255,0.2)]"
              : "border border-neon-red/60 bg-deep-800 text-text-primary shadow-[0_0_8px_rgba(255,0,60,0.2)]"
          }`}
        >
          {!isUser && <span className="mr-2 text-neon-red">{">> "}</span>}
          {message.text}
        </div>
        {!isUser && message.emotion && (
          <span className="ml-2 font-mono text-[10px] tracking-wider text-neon-magenta">
            [EMOTION::{message.emotion.toUpperCase()}]
          </span>
        )}
      </div>
    </div>
  )
}
