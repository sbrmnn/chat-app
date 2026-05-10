import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import {
  VRMLoaderPlugin,
  VRMUtils,
  type VRM,
} from "@pixiv/three-vrm"
import {
  VRMAnimationLoaderPlugin,
  createVRMAnimationClip,
  type VRMAnimation,
} from "@pixiv/three-vrm-animation"
import { JP } from "../JP"

type Props = {
  url: string
  kanji: string
  accentColor: string
  characterName: string
  /** Animation clip to play on loop. Defaults to "idle". */
  animation?: string
  /** Fires once when the VRM model has finished loading. */
  onReady?: () => void
  /**
   * Camera framing.
   * - "default": full body, slight downward angle (used in Chat).
   * - "portrait": tight on head + shoulders (used to capture avatars).
   */
  framing?: "default" | "portrait"
}

type LoadState = "loading" | "ready" | "error"

export function VrmViewer({
  url,
  kanji,
  accentColor,
  characterName,
  animation = "idle",
  onReady,
  framing = "default",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState<LoadState>("loading")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let frameId: number
    let vrm: VRM | undefined
    let mixer: THREE.AnimationMixer | undefined

    const scene = new THREE.Scene()
    const isPortrait = framing === "portrait"
    const camera = new THREE.PerspectiveCamera(
      isPortrait ? 26 : 30,
      container.clientWidth / container.clientHeight,
      0.1,
      20,
    )
    // Sensible defaults; refined after the VRM loads using the head bone.
    if (isPortrait) {
      camera.position.set(0, 1.45, 2.2)
      camera.lookAt(0, 1.45, 0)
    } else {
      camera.position.set(0, 1.3, 1.6)
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Lighting — warm afternoon Ghibli sunlight + sage rim
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.95))
    const key = new THREE.DirectionalLight(0xffe8b3, 0.75)
    key.position.set(1, 2, 1)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xa8c4a2, 0.4)
    rim.position.set(-1, 1, -1)
    scene.add(rim)

    const clock = new THREE.Clock()

    // Loader for both VRM and VRMA
    const loader = new GLTFLoader()
    loader.register((parser) => new VRMLoaderPlugin(parser))
    loader.register((parser) => new VRMAnimationLoaderPlugin(parser))

    async function loadAnimation(loadedVrm: VRM): Promise<void> {
      try {
        const gltf = await loader.loadAsync(`/animations/${animation}.vrma`)
        const animations = gltf.userData.vrmAnimations as
          | VRMAnimation[]
          | undefined
        if (!animations?.length) return
        const clip = createVRMAnimationClip(animations[0], loadedVrm)
        mixer = new THREE.AnimationMixer(loadedVrm.scene)
        mixer.clipAction(clip).play()
      } catch (err) {
        console.warn("Animation load failed, falling back to idle pose:", err)
      }
    }

    loader.load(
      url,
      async (gltf) => {
        if (disposed) return
        const loadedVrm = gltf.userData.vrm as VRM
        VRMUtils.removeUnnecessaryVertices(gltf.scene)
        VRMUtils.combineSkeletons(gltf.scene)

        // VRM 0.x faces +Z (away from camera); rotate 180° to face -Z.
        // VRM 1.0 already faces -Z. Detect via meta.metaVersion.
        const meta = loadedVrm.meta as unknown as Record<string, unknown> | null
        if (meta?.metaVersion === "0") {
          loadedVrm.scene.rotation.y = Math.PI
        }

        // Center the model. Use the head bone for X/Z (the body's true
        // centerline) — bbox center can be skewed by asymmetric hair, sleeves,
        // accessories, etc. Use bbox min.y to put feet at y=0.
        loadedVrm.scene.updateMatrixWorld(true)
        const head = loadedVrm.humanoid?.getNormalizedBoneNode("head")
        const headWorld = new THREE.Vector3()
        if (head) {
          head.getWorldPosition(headWorld)
          loadedVrm.scene.position.x -= headWorld.x
          loadedVrm.scene.position.z -= headWorld.z
        }
        const bounds = new THREE.Box3().setFromObject(loadedVrm.scene)
        if (!bounds.isEmpty()) {
          loadedVrm.scene.position.y -= bounds.min.y
        }
        loadedVrm.scene.updateMatrixWorld(true)

        scene.add(loadedVrm.scene)
        vrm = loadedVrm

        if (isPortrait) {
          if (head) {
            head.getWorldPosition(headWorld)
            // Aim slightly below the head bone so eyes sit in the upper third.
            const aimY = headWorld.y - 0.10
            // Pull the camera back so asymmetric hair/clothing has room to
            // breathe; cards will use object-position to align consistently.
            camera.position.set(0, aimY, 2.2)
            camera.lookAt(0, aimY, 0)
            camera.updateProjectionMatrix()
          }
        }

        setState("ready")
        onReady?.()
        await loadAnimation(loadedVrm)
      },
      (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100))
        }
      },
      (error) => {
        console.error("VRM load failed:", error)
        if (!disposed) setState("error")
      },
    )

    // Animation loop
    const animate = () => {
      const delta = clock.getDelta()
      mixer?.update(delta)
      vrm?.update(delta)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    // Resize
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      mixer?.stopAllAction()
      if (vrm) {
        VRMUtils.deepDispose(vrm.scene)
        scene.remove(vrm.scene)
      }
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [url, animation, framing])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 40%, ${accentColor}1f, transparent 70%)`,
      }}
    >
      {state !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-[180px] font-light leading-none opacity-30 md:text-[260px]"
            translate="no"
            lang="ja"
            style={{ color: accentColor }}
          >
            {kanji}
          </span>

          {state === "loading" && (
            <div className="absolute bottom-8 flex flex-col items-center gap-2">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cream-100">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "var(--color-sage-400)",
                  }}
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sage-600"
                   style={{ fontFamily: "var(--font-display)" }}>
                <JP className="not-italic">読み込み中</JP>
                <span className="opacity-50">·</span>
                <span>{progress}% ✿</span>
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="absolute bottom-8 flex flex-col items-center gap-1 text-center">
              <JP className="text-xs font-semibold text-rose-400">
                読み込みに失敗しました
              </JP>
              <span className="text-sm italic text-text-secondary"
                    style={{ fontFamily: "var(--font-display)" }}>
                couldn't load {characterName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
