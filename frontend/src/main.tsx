import { lazy, StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import { Header } from "./components/Header"
import { JP } from "./components/JP"
import { Home } from "./pages/Home"
import "./index.css"

const Chat = lazy(() =>
  import("./pages/Chat").then((m) => ({ default: m.Chat })),
)

function ChatLoading() {
  return (
    <div className="flex h-[calc(100svh-65px)] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <JP className="font-mono text-sm text-neon-cyan">読み込み中...</JP>
        <span
          className="glow-red text-2xl tracking-[0.3em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LOADING<span className="cursor-blink" />
        </span>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat/:id"
          element={
            <Suspense fallback={<ChatLoading />}>
              <Chat />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
