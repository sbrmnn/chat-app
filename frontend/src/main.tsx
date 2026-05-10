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
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="float text-3xl">☁</span>
        <JP className="text-sm font-semibold text-rose-400">読み込み中</JP>
        <span
          className="text-3xl text-sage-600"
          style={{ fontFamily: "var(--font-display)" }}
        >
          loading...
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
