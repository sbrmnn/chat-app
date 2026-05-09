import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b-2 border-brown-600 bg-cream-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="vintage-seal flex h-11 w-11 items-center justify-center">
            <JP className="text-xl font-bold">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-2xl text-brown-700"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              chat-app
            </span>
            <JP className="text-[10px] font-bold text-orange-400">
              キャラクター喫茶
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
                className={`flex flex-col items-center border-2 px-4 py-1 text-[11px] font-bold tracking-[0.1em] transition-all ${
                  active
                    ? "border-brown-600 bg-mustard-400 text-brown-800"
                    : "border-transparent text-brown-700 hover:border-brown-600 hover:bg-cream-200"
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
