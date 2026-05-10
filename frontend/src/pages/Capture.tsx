import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { VrmViewer } from "../components/vrm/VrmViewer"
import { getCharacter } from "../data/characters"

/**
 * Internal capture page: renders a single character's VRM full-screen
 * with no UI. Used by `scripts/capture-avatars.mjs` (Playwright) to
 * generate static portrait JPEGs that the home page uses.
 *
 * When the VRM has loaded, sets `document.documentElement.dataset.captureReady`
 * to "true". Playwright waits for that signal before screenshotting.
 */
export function Capture() {
  const { id } = useParams<{ id: string }>()
  const character = id ? getCharacter(id) : undefined
  const [readyDelay, setReadyDelay] = useState(false)

  // Tiny delay after onReady so the first render frame paints before screenshot.
  useEffect(() => {
    if (!readyDelay) return
    const t = setTimeout(() => {
      document.documentElement.dataset.captureReady = "true"
    }, 600)
    return () => clearTimeout(t)
  }, [readyDelay])

  if (!character) return <div>Character not found.</div>

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#faf3e0",
      }}
    >
      <VrmViewer
        url={`/vrm/${character.id}.vrm`}
        kanji={character.kanji}
        accentColor={character.accentColor}
        characterName={character.name}
        framing="portrait"
        onReady={() => setReadyDelay(true)}
      />
    </div>
  )
}
