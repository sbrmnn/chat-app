import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink-900 bg-paper-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="manga-panel-sm flex h-10 w-10 items-center justify-center bg-accent-red text-paper-50">
            <JP className="text-xl font-bold">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-base font-black tracking-[0.05em] text-ink-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CHAT-APP
            </span>
            <JP className="text-[10px] font-bold text-ink-700">
              キャラクターチャット
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
                className={`flex flex-col items-center border-2 px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] transition-all ${
                  active
                    ? "border-ink-900 bg-ink-900 text-paper-50"
                    : "border-transparent text-ink-700 hover:border-ink-900 hover:bg-paper-200"
                }`}
              >
                <span>{item.en.toUpperCase()}</span>
                <JP className="text-[9px] opacity-80">{item.jp}</JP>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
