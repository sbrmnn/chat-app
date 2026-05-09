import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-base-700/60 bg-base-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-gold-400/60 text-gold-400 transition-colors group-hover:border-gold-300 group-hover:text-gold-300">
            <JP className="text-lg">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium tracking-[0.2em] text-text-primary">
              CHAT-APP
            </span>
            <JP className="text-[10px] text-text-secondary">
              キャラクターチャット
            </JP>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center px-3 py-1.5 text-[11px] tracking-[0.2em] transition-colors ${
                  active
                    ? "text-gold-400"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>{item.en.toUpperCase()}</span>
                <JP className="text-[9px] opacity-60">{item.jp}</JP>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
