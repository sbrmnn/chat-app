import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b-2 border-pink-300/60 bg-sky-50/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="holo-shine flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg shadow-pink-500/30">
            <JP className="text-lg font-bold drop-shadow">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-xl text-pink-500"
              style={{ fontFamily: "var(--font-display)" }}
            >
              chat-app ✨
            </span>
            <JP className="text-[10px] font-medium text-lav-500">
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
                className={`flex flex-col items-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wider transition-all ${
                  active
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                    : "text-lav-500 hover:bg-pink-100 hover:text-pink-500"
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
