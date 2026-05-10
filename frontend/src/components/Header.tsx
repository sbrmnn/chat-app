import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="glass sticky top-0 z-50 mx-3 mt-3 rounded-2xl">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="btn-primary flex h-10 w-10 items-center justify-center rounded-2xl">
            <JP className="text-lg font-semibold">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-text-primary">
              chat-app
            </span>
            <JP className="text-[10px] font-medium text-text-secondary">
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
                className={`flex flex-col items-center rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wide transition-all ${
                  active
                    ? "btn-primary"
                    : "text-text-secondary hover:bg-white/40 hover:text-text-primary"
                }`}
              >
                <span>{item.en}</span>
                <JP className="text-[9px] opacity-80">{item.jp}</JP>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
