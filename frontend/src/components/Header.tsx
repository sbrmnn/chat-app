import { Link, useLocation } from "react-router"
import { JP } from "./JP"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", en: "Home", jp: "ホーム" },
    { to: "/about", en: "About", jp: "について" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-rose-500/30 bg-night-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-rose-400/60 bg-night-900 text-rose-400 transition-all group-hover:border-rose-300 group-hover:text-rose-300">
            <JP className="text-lg">話</JP>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-glow-rose text-xl tracking-wide text-rose-300"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              }}
            >
              chat-app
            </span>
            <JP className="text-[10px] tracking-wider text-text-secondary">
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
                className={`flex flex-col items-center px-4 py-1.5 text-[11px] tracking-[0.2em] transition-all ${
                  active
                    ? "text-glow-gold border-b border-gold-400 text-gold-300"
                    : "text-text-secondary hover:text-rose-300"
                }`}
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                <span>{item.en}</span>
                <JP className="text-[9px] not-italic opacity-70">{item.jp}</JP>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
