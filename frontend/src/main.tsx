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
        <JP className="text-base font-black text-accent-red">読み込み中</JP>
        <span
          className="text-xs font-black tracking-[0.25em] text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LOADING
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
