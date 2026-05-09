import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-neon-red/40 bg-deep-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="neon-box-red flex h-9 w-9 items-center justify-center bg-deep-900">
            <JP className="glow-red text-lg">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="glow-red text-xl tracking-[0.15em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CHAT-APP
            </span>
            <JP className="font-mono text-[10px] text-neon-cyan">
              キャラクターチャット.exe
            </JP>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] transition-all ${
                  active
                    ? "neon-box-cyan glow-cyan bg-deep-800"
                    : "text-text-secondary hover:text-neon-cyan"
                }`}
              >
                <span>[{item.en.toUpperCase()}]</span>
                <JP className="text-[9px] opacity-70">{item.jp}</JP>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
