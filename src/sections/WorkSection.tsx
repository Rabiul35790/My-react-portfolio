import { useLayoutEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { projects } from "../data/projects";

// ─── Arrangement config ───────────────────────────────────────────────────────
// Switch ARRANGEMENT to "helix" | "diamond" | "wave" to change the layout.
const ARRANGEMENT = "helix" as "helix" | "diamond" | "wave";

// Helix settings
const HELIX_TOTAL       = 24;
const HELIX_ROTATIONS   = 2;       // full loops around the Y axis
const HELIX_RADIUS_BASE = 5.0;
const HELIX_V_SPREAD    = 5.2;     // total vertical height of the spiral
const HELIX_CARD_W      = 2.6;
const HELIX_CARD_H      = 1.72;

// Diamond stagger settings  (4 rings, alternating angular offset)
const DIAMOND_RINGS = [
  { y:  2.4, count: 5, offset: 0,    radius: 3.8, scale: 0.80 },
  { y:  0.8, count: 8, offset: 0.39, radius: 5.2, scale: 0.96 },
  { y: -0.8, count: 8, offset: 0,    radius: 5.2, scale: 0.96 },
  { y: -2.4, count: 5, offset: 0.39, radius: 3.8, scale: 0.80 },
] as const;
const DIAMOND_CARD_W = 2.5;
const DIAMOND_CARD_H = 1.65;

// Phase wave settings
const WAVE_ROWS    = 3;
const WAVE_PER_ROW = 8;
const WAVE_RADIUS  = 5.0;
const WAVE_CARD_W  = 2.6;
const WAVE_CARD_H  = 1.72;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function totalCards() {
  if (ARRANGEMENT === "helix")   return HELIX_TOTAL;
  if (ARRANGEMENT === "diamond") return DIAMOND_RINGS.reduce((s, r) => s + r.count, 0);
  return WAVE_ROWS * WAVE_PER_ROW;
}

type PanelData = { href: string; title: string };

function buildPanelData(total: number) {
  const fromProjects = projects.map((p) => ({
    href:  `/work/${p.id}`,
    image: p.gallery[0] || "/images/profile.png",
    title: p.title,
  }));
  return Array.from({ length: total }, (_, i) => fromProjects[i % fromProjects.length]);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const plateRef   = useRef<HTMLDivElement | null>(null);
  const navigate   = useNavigate();

  const panelData = useMemo(() => buildPanelData(totalCards()), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const plate   = plateRef.current;
    if (!section || !wrapper || !plate) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace    = THREE.SRGBColorSpace;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    wrapper.appendChild(renderer.domElement);

    // ── Scene & camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

    const ambient = new THREE.AmbientLight(0xffffff, 0.96);
    const dir     = new THREE.DirectionalLight(0xffffff, 0.78);
    dir.position.set(4, 6, 8);
    scene.add(ambient, dir);

    const root       = new THREE.Group();
    const panelGroup = new THREE.Group();
    root.add(panelGroup);
    scene.add(root);

    // ── Texture loader ────────────────────────────────────────────────────────
    const loader       = new THREE.TextureLoader();
    const textureCache = new Map<string, THREE.Texture>();
    const meshes: THREE.Mesh[] = [];

    const getTexture = (url: string) => {
      const cached = textureCache.get(url);
      if (cached) return cached;
      const t = loader.load(url);
      t.colorSpace = THREE.SRGBColorSpace;
      textureCache.set(url, t);
      return t;
    };

    const makeMaterial = (image: string, opacity: number) =>
      new THREE.MeshStandardMaterial({
        map:         getTexture(image),
        side:        THREE.DoubleSide,
        roughness:   0.62,
        metalness:   0.02,
        transparent: true,
        opacity,
      });

    // ── Build card arrangement ────────────────────────────────────────────────
    if (ARRANGEMENT === "helix") {
      // True helix — each card at a unique (angle, y, radius) position.
      // Radius breathes with sin so the helix bulges at the equator.
      // Opacity and scale taper toward the poles for natural depth.
      for (let i = 0; i < HELIX_TOTAL; i++) {
        const t     = i / HELIX_TOTAL;
        const angle = t * Math.PI * 2 * HELIX_ROTATIONS;
        const y     = (t - 0.5) * HELIX_V_SPREAD;
        const r     = HELIX_RADIUS_BASE * (0.72 + 0.28 * Math.sin(t * Math.PI));

        const x = Math.sin(angle) * r;
        const z = Math.cos(angle) * r;

        const poleBlend = Math.sin(t * Math.PI);          // 0 at poles, 1 at equator
        const opacity   = 0.65 + 0.35 * poleBlend;
        const scale     = 0.72 + 0.28 * poleBlend;

        const panel = panelData[i];
        const mesh  = new THREE.Mesh(
          new THREE.PlaneGeometry(HELIX_CARD_W, HELIX_CARD_H),
          makeMaterial(panel.image, opacity)
        );
        mesh.position.set(x, y, z);
        mesh.scale.setScalar(scale);
        mesh.lookAt(x * 2, y, z * 2);
        mesh.userData = { href: panel.href, title: panel.title } as PanelData;

        meshes.push(mesh);
        panelGroup.add(mesh);
      }

    } else if (ARRANGEMENT === "diamond") {
      // Four rings: two outer (8 cards) flanked by two inner (5 cards),
      // with alternating angular offsets creating interlocked diamond columns.
      let idx = 0;
      DIAMOND_RINGS.forEach((ring) => {
        for (let i = 0; i < ring.count; i++) {
          const angle   = (i / ring.count) * Math.PI * 2 + ring.offset;
          const x       = Math.sin(angle) * ring.radius;
          const z       = Math.cos(angle) * ring.radius;
          const opacity = ring.scale * 0.98 + 0.02;

          const panel = panelData[idx % panelData.length];
          const mesh  = new THREE.Mesh(
            new THREE.PlaneGeometry(DIAMOND_CARD_W, DIAMOND_CARD_H),
            makeMaterial(panel.image, opacity)
          );
          mesh.position.set(x, ring.y, z);
          mesh.scale.setScalar(ring.scale);
          mesh.lookAt(x * 2, ring.y, z * 2);
          mesh.userData = { href: panel.href, title: panel.title } as PanelData;

          meshes.push(mesh);
          panelGroup.add(mesh);
          idx++;
        }
      });

    } else {
      // Phase wave — 3 rows, each card's Y lifted by a sinusoidal phase offset
      // so the rows ripple like a wave rather than sitting flat.
      for (let r = 0; r < WAVE_ROWS; r++) {
        for (let i = 0; i < WAVE_PER_ROW; i++) {
          const angle  = (i / WAVE_PER_ROW) * Math.PI * 2 + r * Math.PI * 0.18;
          const phase  = (i / WAVE_PER_ROW) * Math.PI * 2;
          const waveY  = Math.sin(phase + r * 1.2) * 1.5;
          const baseY  = (r - 1) * 1.9;
          const y      = baseY + waveY;

          const x = Math.sin(angle) * WAVE_RADIUS;
          const z = Math.cos(angle) * WAVE_RADIUS;

          const panel = panelData[r * WAVE_PER_ROW + i];
          const mesh  = new THREE.Mesh(
            new THREE.PlaneGeometry(WAVE_CARD_W, WAVE_CARD_H),
            makeMaterial(panel.image, 0.94)
          );
          mesh.position.set(x, y, z);
          mesh.lookAt(x * 2, y, z * 2);
          // Subtle tilt per card — makes the wave feel organic
          mesh.rotateZ(Math.sin(phase) * 0.12);
          mesh.userData = { href: panel.href, title: panel.title } as PanelData;

          meshes.push(mesh);
          panelGroup.add(mesh);
        }
      }
    }

    // ── Inner drum (subtle dark cylinder for depth) ───────────────────────────
    const drum = new THREE.Mesh(
      new THREE.CylinderGeometry(HELIX_RADIUS_BASE - 0.08, HELIX_RADIUS_BASE - 0.08, 6.0, 64, 1, true),
      new THREE.MeshBasicMaterial({
        color:       0x16181c,
        side:        THREE.BackSide,
        transparent: true,
        opacity:     0.22,
      })
    );
    root.add(drum);

    // ── Responsive resize ─────────────────────────────────────────────────────
    let baseYOffset = -0.28;
    let liftFactor  = 0.56;

    const resize = () => {
      const w = Math.max(wrapper.clientWidth,  320);
      const h = Math.max(wrapper.clientHeight, 240);

      if (w < 768) {
        camera.fov = 50;
        camera.position.set(0, 0.02, 13.5);
        root.scale.set(1.06, 1.06, 1.06);
        baseYOffset = -0.14;
        liftFactor  = 0.08;
      } else if (w < 1024) {
        camera.fov = 47;
        camera.position.set(0, 0.06, 14.0);
        root.scale.set(0.90, 0.90, 0.90);
        baseYOffset = -0.38;
        liftFactor  = 0.42;
      } else {
        camera.fov = 42;
        camera.position.set(0, 0.08, 13.0);
        root.scale.set(1, 1, 1);
        baseYOffset = -0.28;
        liftFactor  = 0.56;
      }

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    requestAnimationFrame(resize);

    // ── Scroll / drag / hover state ───────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer   = new THREE.Vector2();

    let scrollLift  = 0;
    let autoRot     = 0;
    let dragRot     = 0;
    let currentRotY = 0;
    let currentLiftY = 0;

    let isDragging = false;
    let downX      = 0;
    let lastX      = 0;
    let moved      = false;

    const hidePlate = () => { plate.style.opacity = "0"; };

    const updateHoverState = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left)  / rect.width)  * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];

      if (!hit) {
        wrapper.dataset.cursor = "interactive";
        hidePlate();
        return null;
      }

      const data = hit.object.userData as PanelData;
      wrapper.dataset.cursor = "project";

      const x = event.clientX - rect.left + 14;
      const y = event.clientY - rect.top  - 28;
      plate.textContent       = data.title.toUpperCase();
      plate.style.transform   = `translate(${x}px, ${y}px)`;
      plate.style.opacity     = "1";

      return data;
    };

    const updateTargetsFromScroll = () => {
      const rect     = section.getBoundingClientRect();
      const vh       = window.innerHeight;
      const start    = vh;
      const end      = -rect.height;
      const progress = THREE.MathUtils.clamp((start - rect.top) / (start - end), 0, 1);
      scrollLift     = progress * liftFactor;
    };

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      moved      = false;
      downX      = event.clientX;
      lastX      = event.clientX;
      wrapper.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const hit = updateHoverState(event);
      if (!isDragging) return;

      const dx = event.clientX - lastX;
      if (Math.abs(event.clientX - downX) > 4) moved = true;
      dragRot += dx * 0.008;
      lastX    = event.clientX;
      if (!hit) hidePlate();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.releasePointerCapture(event.pointerId);

      if (!moved) {
        const hit = updateHoverState(event);
        if (hit?.href) navigate(hit.href);
      }
    };

    const onPointerLeave = () => {
      wrapper.dataset.cursor = "interactive";
      hidePlate();
    };

    // ── Event listeners ───────────────────────────────────────────────────────
    window.addEventListener("resize",  resize);
    window.addEventListener("scroll",  updateTargetsFromScroll, { passive: true });
    updateTargetsFromScroll();

    wrapper.addEventListener("pointerdown",   onPointerDown);
    wrapper.addEventListener("pointermove",   onPointerMove);
    wrapper.addEventListener("pointerup",     onPointerUp);
    wrapper.addEventListener("pointercancel", onPointerUp);
    wrapper.addEventListener("pointerleave",  onPointerLeave);

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId = 0;
    const animate = () => {
      rafId = window.requestAnimationFrame(animate);

      autoRot += 0.0016;
      const targetRotY  = autoRot + dragRot;
      const targetLiftY = scrollLift;

      currentRotY  += (targetRotY  - currentRotY)  * 0.08;
      currentLiftY += (targetLiftY - currentLiftY) * 0.08;

      root.rotation.y = currentRotY;
      root.position.y = baseYOffset + currentLiftY;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize",  resize);
      window.removeEventListener("scroll",  updateTargetsFromScroll);

      wrapper.removeEventListener("pointerdown",   onPointerDown);
      wrapper.removeEventListener("pointermove",   onPointerMove);
      wrapper.removeEventListener("pointerup",     onPointerUp);
      wrapper.removeEventListener("pointercancel", onPointerUp);
      wrapper.removeEventListener("pointerleave",  onPointerLeave);

      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      textureCache.forEach((texture) => texture.dispose());

      (drum.geometry as THREE.BufferGeometry).dispose();
      (drum.material  as THREE.Material).dispose();

      renderer.dispose();
      if (wrapper.contains(renderer.domElement)) {
        wrapper.removeChild(renderer.domElement);
      }
    };
  }, [navigate, panelData]);

  return (
    <section id="work" ref={sectionRef} className="work-three-theme">
      <div className="work-three-header">
        <p className="font-mono text-label text-primary">Selected Work</p>
        <p className="font-mono text-label text-text3">
          ({projects.length.toString().padStart(2, "0")})
        </p>
      </div>
      <div ref={wrapperRef} className="work-three-wrapper" data-cursor="interactive" />
      <div ref={plateRef}   className="work-three-plate" />
      <div className="work-three-vignette" aria-hidden />
    </section>
  );
}