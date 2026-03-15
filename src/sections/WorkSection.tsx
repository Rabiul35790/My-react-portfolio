import { useLayoutEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { projects } from "../data/projects";

const ROWS = [
  { y: 1.5, scale: 0.9, opacity: 0.98, offsetDeg: 12 },
  { y: 0, scale: 1, opacity: 1, offsetDeg: 0 },
  { y: -1.5, scale: 0.9, opacity: 0.98, offsetDeg: 24 }
] as const;

const CARDS_PER_ROW = 8;

type PanelData = {
  href: string;
  title: string;
};

function buildPanelData(total: number) {
  const fromProjects = projects.map((project) => ({
    href: `/work/${project.id}`,
    image: project.gallery[0] || "/images/profile.png",
    title: project.title
  }));

  const list: { href: string; image: string; title: string }[] = [];
  for (let i = 0; i < total; i += 1) {
    const item = fromProjects[i % fromProjects.length];
    list.push(item);
  }
  return list;
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const plateRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const panelData = useMemo(() => buildPanelData(ROWS.length * CARDS_PER_ROW), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const plate = plateRef.current;

    if (!section || !wrapper || !plate) {
      return;
    }

    let disposed = false;
    let cleanupScene: (() => void) | null = null;

    const initScene = () => {
      if (cleanupScene || disposed) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      wrapper.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

      const ambient = new THREE.AmbientLight(0xffffff, 0.96);
      const dir = new THREE.DirectionalLight(0xffffff, 0.78);
      dir.position.set(4, 6, 8);
      scene.add(ambient, dir);

      const root = new THREE.Group();
      scene.add(root);

      const panelGroup = new THREE.Group();
      root.add(panelGroup);

      const loader = new THREE.TextureLoader();
      const textureCache = new Map<string, THREE.Texture>();
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const meshes: THREE.Mesh[] = [];

      const radius = 5.45;
      const cardW = 3;
      const cardH = 2;

      const getTexture = (url: string) => {
        const cached = textureCache.get(url);
        if (cached) {
          return cached;
        }

        const texture = loader.load(url);
        texture.colorSpace = THREE.SRGBColorSpace;
        textureCache.set(url, texture);
        return texture;
      };

      let imageIndex = 0;
      ROWS.forEach((row) => {
        for (let i = 0; i < CARDS_PER_ROW; i += 1) {
          const angle = (i / CARDS_PER_ROW) * Math.PI * 2 + THREE.MathUtils.degToRad(row.offsetDeg);
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          const panel = panelData[imageIndex % panelData.length];
          const texture = getTexture(panel.image);

          const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            roughness: 0.62,
            metalness: 0.02,
            transparent: true,
            opacity: row.opacity
          });

          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(cardW, cardH), material);
          mesh.position.set(x, row.y, z);
          mesh.scale.set(row.scale, row.scale, 1);
          mesh.lookAt(x * 2, row.y, z * 2);
          mesh.userData = { href: panel.href, title: panel.title } as PanelData;

          meshes.push(mesh);
          panelGroup.add(mesh);
          imageIndex += 1;
        }
      });

      const drum = new THREE.Mesh(
        new THREE.CylinderGeometry(radius - 0.08, radius - 0.08, 4.6, 64, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0x16181c,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.24
        })
      );
      root.add(drum);

      let baseYOffset = -0.28;
      let liftFactor = 0.56;

      const resize = () => {
        const w = wrapper.clientWidth;
        const h = wrapper.clientHeight;

        const isMobile = w < 768;
        const isTablet = w >= 768 && w < 1024;

        if (isMobile) {
          camera.fov = 50;
          camera.position.set(0, 0.02, 12.2);
          root.scale.set(1.08, 1.08, 1.08);
          baseYOffset = -0.14;
          liftFactor = 0.08;
        } else if (isTablet) {
          camera.fov = 47;
          camera.position.set(0, 0.06, 12.8);
          root.scale.set(0.92, 0.92, 0.92);
          baseYOffset = -0.38;
          liftFactor = 0.42;
        } else {
          camera.fov = 42;
          camera.position.set(0, 0.08, 12);
          root.scale.set(1, 1, 1);
          baseYOffset = -0.28;
          liftFactor = 0.56;
        }

        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      let scrollLift = 0;
      let autoRot = 0;
      let dragRot = 0;
      let targetRotY = 0;
      let targetLiftY = 0;
      let currentRotY = 0;
      let currentLiftY = 0;

      let isDragging = false;
      let downX = 0;
      let lastX = 0;
      let moved = false;

      const hidePlate = () => {
        plate.style.opacity = "0";
      };

      const updateHoverState = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
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
        const y = event.clientY - rect.top - 28;
        plate.textContent = data.title.toUpperCase();
        plate.style.transform = `translate(${x}px, ${y}px)`;
        plate.style.opacity = "1";

        return data;
      };

      const updateTargetsFromScroll = () => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh;
        const end = -rect.height;
        const progress = THREE.MathUtils.clamp((start - rect.top) / (start - end), 0, 1);
        scrollLift = progress * liftFactor;
      };

      const onPointerDown = (event: PointerEvent) => {
        isDragging = true;
        moved = false;
        downX = event.clientX;
        lastX = event.clientX;
        wrapper.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        const hit = updateHoverState(event);

        if (!isDragging) {
          return;
        }

        const dx = event.clientX - lastX;
        if (Math.abs(event.clientX - downX) > 4) {
          moved = true;
        }
        dragRot += dx * 0.008;
        lastX = event.clientX;

        if (!hit) {
          hidePlate();
        }
      };

      const onPointerUp = (event: PointerEvent) => {
        if (!isDragging) {
          return;
        }
        isDragging = false;
        wrapper.releasePointerCapture(event.pointerId);

        if (!moved) {
          const hit = updateHoverState(event);
          if (hit?.href) {
            navigate(hit.href);
          }
        }
      };

      const onPointerLeave = () => {
        wrapper.dataset.cursor = "interactive";
        hidePlate();
      };

      const isNearViewport = () => {
        const rect = section.getBoundingClientRect();
        return rect.bottom > -220 && rect.top < window.innerHeight + 220;
      };

      window.addEventListener("resize", resize);
      window.addEventListener("scroll", updateTargetsFromScroll, { passive: true });
      updateTargetsFromScroll();

      wrapper.addEventListener("pointerdown", onPointerDown);
      wrapper.addEventListener("pointermove", onPointerMove);
      wrapper.addEventListener("pointerup", onPointerUp);
      wrapper.addEventListener("pointercancel", onPointerUp);
      wrapper.addEventListener("pointerleave", onPointerLeave);

      let rafId = 0;
      const animate = () => {
        rafId = window.requestAnimationFrame(animate);

        autoRot += 0.0016;
        targetRotY = autoRot + dragRot;
        targetLiftY = scrollLift;

        currentRotY += (targetRotY - currentRotY) * 0.08;
        currentLiftY += (targetLiftY - currentLiftY) * 0.08;

        root.rotation.y = currentRotY;
        root.position.y = baseYOffset + currentLiftY;

        if (isNearViewport()) {
          renderer.render(scene, camera);
        }
      };
      animate();

      cleanupScene = () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", updateTargetsFromScroll);

        wrapper.removeEventListener("pointerdown", onPointerDown);
        wrapper.removeEventListener("pointermove", onPointerMove);
        wrapper.removeEventListener("pointerup", onPointerUp);
        wrapper.removeEventListener("pointercancel", onPointerUp);
        wrapper.removeEventListener("pointerleave", onPointerLeave);

        meshes.forEach((mesh) => {
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
        textureCache.forEach((texture) => texture.dispose());

        (drum.geometry as THREE.BufferGeometry).dispose();
        (drum.material as THREE.Material).dispose();

        renderer.dispose();
        if (wrapper.contains(renderer.domElement)) {
          wrapper.removeChild(renderer.domElement);
        }
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          initScene();
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(section);

    return () => {
      disposed = true;
      observer.disconnect();
      cleanupScene?.();
    };
  }, [navigate, panelData]);

  return (
    <section id="work" ref={sectionRef} className="work-three-theme">
      <div className="work-three-header">
        <p className="font-mono text-label text-primary">Selected Work</p>
        <p className="font-mono text-label text-text3">( {projects.length.toString().padStart(2, "0")} )</p>
      </div>
      <div ref={wrapperRef} className="work-three-wrapper" data-cursor="interactive" />
      <div ref={plateRef} className="work-three-plate" />
      <div className="work-three-vignette" aria-hidden />
    </section>
  );
}




