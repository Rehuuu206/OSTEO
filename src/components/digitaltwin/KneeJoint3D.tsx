import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw, Eye, Info } from 'lucide-react';

interface KneeJoint3DProps {
  relativeLoadIndex: number; // 0 to 100
  medialStressIndex: number; // 0 to 100
  lateralStressIndex: number; // 0 to 100
  kneeFlexionDeg?: number; // e.g. 15 to 90 degrees
  showHeatmap?: boolean;
}

export const KneeJoint3D: React.FC<KneeJoint3DProps> = ({
  relativeLoadIndex,
  medialStressIndex,
  lateralStressIndex,
  kneeFlexionDeg = 25,
  showHeatmap = true
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const kneeGroupRef = useRef<THREE.Group | null>(null);
  const femurGroupRef = useRef<THREE.Group | null>(null);
  const tibiaGroupRef = useRef<THREE.Group | null>(null);
  const patellaMeshRef = useRef<THREE.Mesh | null>(null);
  const medialCartilageRef = useRef<THREE.Mesh | null>(null);
  const lateralCartilageRef = useRef<THREE.Mesh | null>(null);

  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [cameraDistance, setCameraDistance] = useState(14);
  const [autoRotate, setAutoRotate] = useState(false);

  // Compute stress color based on stress index
  const getStressColor = (stress: number): THREE.Color => {
    // 0 -> emerald green, 50 -> amber yellow, 100 -> ruby crimson
    if (stress < 45) {
      // green to yellow
      const t = stress / 45;
      return new THREE.Color().setRGB(0.1 + t * 0.8, 0.75 + t * 0.1, 0.25 * (1 - t));
    } else {
      // yellow to red
      const t = Math.min(1, (stress - 45) / 55);
      return new THREE.Color().setRGB(0.9 + t * 0.1, 0.85 * (1 - t), 0.15 * (1 - t));
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0xf8fafc); // Slate 50 clean clinical background

      // Camera
      const camera = new THREE.PerspectiveCamera(
        45,
        width / Math.max(1, height),
        0.1,
        1000
      );
      camera.position.set(0, 2, 14);
      cameraRef.current = camera;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;

      container.replaceChildren(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0xffffff, 0.9);
    mainDirectional.position.set(10, 20, 15);
    mainDirectional.castShadow = true;
    scene.add(mainDirectional);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.4); // soft medical cyan rim light
    rimLight.position.set(-10, -10, -10);
    scene.add(rimLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = -6.5;
    scene.add(gridHelper);

    // Master Knee Group
    const kneeGroup = new THREE.Group();
    scene.add(kneeGroup);
    kneeGroupRef.current = kneeGroup;

    // Materials
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.35,
      metalness: 0.1
    });

    // 1. FEMUR (Upper Joint Component)
    const femurGroup = new THREE.Group();
    femurGroup.position.y = 1.6;

    // Femoral Shaft
    const shaftGeom = new THREE.CylinderGeometry(0.85, 1.1, 5, 24);
    const shaftMesh = new THREE.Mesh(shaftGeom, boneMaterial);
    shaftMesh.position.y = 2.8;
    femurGroup.add(shaftMesh);

    // Medial Femoral Condyle
    const medialCondyleGeom = new THREE.SphereGeometry(1.2, 24, 24);
    medialCondyleGeom.scale(0.9, 1.2, 1.3);
    const medialCondyleMesh = new THREE.Mesh(medialCondyleGeom, boneMaterial);
    medialCondyleMesh.position.set(-1.1, 0.4, 0);
    femurGroup.add(medialCondyleMesh);

    // Lateral Femoral Condyle
    const lateralCondyleGeom = new THREE.SphereGeometry(1.15, 24, 24);
    lateralCondyleGeom.scale(0.88, 1.15, 1.25);
    const lateralCondyleMesh = new THREE.Mesh(lateralCondyleGeom, boneMaterial);
    lateralCondyleMesh.position.set(1.1, 0.4, 0);
    femurGroup.add(lateralCondyleMesh);

    // Femoral Trochlear Groove (Anterior)
    const trochlearGeom = new THREE.TorusGeometry(1.0, 0.3, 16, 24, Math.PI);
    const trochlearMesh = new THREE.Mesh(trochlearGeom, boneMaterial);
    trochlearMesh.position.set(0, 0.6, 0.7);
    trochlearMesh.rotation.x = Math.PI / 2;
    femurGroup.add(trochlearMesh);

    kneeGroup.add(femurGroup);
    femurGroupRef.current = femurGroup;

    // 2. TIBIA & FIBULA (Lower Joint Component)
    const tibiaGroup = new THREE.Group();
    tibiaGroup.position.y = -1.6;

    // Tibial Plateau (Medial & Lateral)
    const plateauGeom = new THREE.CylinderGeometry(2.3, 1.5, 1.2, 24);
    plateauGeom.scale(1.15, 1, 0.95);
    const plateauMesh = new THREE.Mesh(plateauGeom, boneMaterial);
    plateauMesh.position.y = 0.4;
    tibiaGroup.add(plateauMesh);

    // Tibial Shaft
    const tibiaShaftGeom = new THREE.CylinderGeometry(1.1, 0.75, 5.2, 24);
    const tibiaShaftMesh = new THREE.Mesh(tibiaShaftGeom, boneMaterial);
    tibiaShaftMesh.position.y = -2.6;
    tibiaGroup.add(tibiaShaftMesh);

    // Fibula (Lateral Head & Shaft)
    const fibulaGeom = new THREE.CylinderGeometry(0.35, 0.28, 4.8, 16);
    const fibulaMesh = new THREE.Mesh(fibulaGeom, boneMaterial);
    fibulaMesh.position.set(1.9, -1.8, -0.3);
    tibiaGroup.add(fibulaMesh);

    // Tibial Tuberosity (anterior projection)
    const tuberosityGeom = new THREE.BoxGeometry(0.8, 1.2, 0.6);
    const tuberosityMesh = new THREE.Mesh(tuberosityGeom, boneMaterial);
    tuberosityMesh.position.set(0, -0.4, 1.1);
    tibiaGroup.add(tuberosityMesh);

    kneeGroup.add(tibiaGroup);
    tibiaGroupRef.current = tibiaGroup;

    // 3. PATELLA (Kneecap)
    const patellaGeom = new THREE.SphereGeometry(0.8, 20, 20);
    patellaGeom.scale(1.1, 1.3, 0.55);
    const patellaMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.4,
      metalness: 0.1
    });
    const patellaMesh = new THREE.Mesh(patellaGeom, patellaMat);
    patellaMesh.position.set(0, 0.6, 2.0);
    kneeGroup.add(patellaMesh);
    patellaMeshRef.current = patellaMesh;

    // 4. CARTILAGE / MENISCUS (Medial & Lateral Articular Interfaces)
    // Medial Cartilage
    const medialCartilageGeom = new THREE.TorusGeometry(0.9, 0.22, 16, 32, Math.PI * 1.6);
    const medialCartilageMat = new THREE.MeshStandardMaterial({
      color: getStressColor(medialStressIndex),
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.95
    });
    const medialCartilageMesh = new THREE.Mesh(medialCartilageGeom, medialCartilageMat);
    medialCartilageMesh.rotation.x = Math.PI / 2;
    medialCartilageMesh.position.set(-1.15, -0.85, 0);
    kneeGroup.add(medialCartilageMesh);
    medialCartilageRef.current = medialCartilageMesh;

    // Lateral Cartilage
    const lateralCartilageGeom = new THREE.TorusGeometry(0.85, 0.22, 16, 32, Math.PI * 1.6);
    const lateralCartilageMat = new THREE.MeshStandardMaterial({
      color: getStressColor(lateralStressIndex),
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.95
    });
    const lateralCartilageMesh = new THREE.Mesh(lateralCartilageGeom, lateralCartilageMat);
    lateralCartilageMesh.rotation.x = Math.PI / 2;
    lateralCartilageMesh.position.set(1.15, -0.85, 0);
    kneeGroup.add(lateralCartilageMesh);
    lateralCartilageRef.current = lateralCartilageMesh;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && kneeGroupRef.current) {
        kneeGroupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !kneeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      kneeGroupRef.current.rotation.y += deltaX * 0.01;
      kneeGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomSpeed = 0.01;
      const newZ = Math.min(22, Math.max(7, cameraRef.current.position.z + e.deltaY * zoomSpeed));
      cameraRef.current.position.z = newZ;
      setCameraDistance(Math.round(newZ));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !kneeGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
      kneeGroupRef.current.rotation.y += deltaX * 0.01;
      kneeGroupRef.current.rotation.x += deltaY * 0.01;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
    } catch (err) {
      console.warn('ThreeJS WebGL context creation failed:', err);
      return () => {};
    }
  }, []);

  // Update colors & kinematics when props change
  useEffect(() => {
    if (medialCartilageRef.current) {
      const mat = medialCartilageRef.current.material as THREE.MeshStandardMaterial;
      if (showHeatmap) {
        mat.color = getStressColor(medialStressIndex);
        mat.emissive = getStressColor(medialStressIndex).clone().multiplyScalar(0.2);
      } else {
        mat.color = new THREE.Color(0x38bdf8);
        mat.emissive = new THREE.Color(0x000000);
      }
    }

    if (lateralCartilageRef.current) {
      const mat = lateralCartilageRef.current.material as THREE.MeshStandardMaterial;
      if (showHeatmap) {
        mat.color = getStressColor(lateralStressIndex);
        mat.emissive = getStressColor(lateralStressIndex).clone().multiplyScalar(0.2);
      } else {
        mat.color = new THREE.Color(0x38bdf8);
        mat.emissive = new THREE.Color(0x000000);
      }
    }

    // Kinematic flexion
    if (femurGroupRef.current) {
      const rad = (kneeFlexionDeg * Math.PI) / 180;
      femurGroupRef.current.rotation.x = rad * 0.5;
    }
  }, [medialStressIndex, lateralStressIndex, kneeFlexionDeg, showHeatmap]);

  const resetView = () => {
    if (kneeGroupRef.current && cameraRef.current) {
      kneeGroupRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.set(0, 2, 14);
      setCameraDistance(14);
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current) {
      const newZ = Math.min(22, Math.max(7, cameraRef.current.position.z + delta));
      cameraRef.current.position.z = newZ;
      setCameraDistance(Math.round(newZ));
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Floating Status / Heatmap Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700/60 text-white shadow-lg text-xs space-y-1.5 max-w-xs">
        <div className="flex items-center gap-2 font-semibold text-sky-400">
          <Eye className="w-4 h-4" />
          <span>Biomechanical Digital Twin</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Medial Stress:</span>
          <span className={`font-mono font-bold ${medialStressIndex > 65 ? 'text-red-400' : medialStressIndex > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {medialStressIndex} / 100
          </span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Lateral Stress:</span>
          <span className={`font-mono font-bold ${lateralStressIndex > 65 ? 'text-red-400' : lateralStressIndex > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {lateralStressIndex} / 100
          </span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Simulated Relative Load:</span>
          <span className="font-mono font-bold text-white">{relativeLoadIndex} / 100</span>
        </div>
      </div>

      {/* Heatmap Color Spectrum Legend */}
      <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700/60 text-white text-xs shadow-lg space-y-1.5">
        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Relative Stress Heatmap
        </div>
        <div className="w-32 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500" />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>Low (0)</span>
          <span>Moderate</span>
          <span>High (100)</span>
        </div>
      </div>

      {/* Bottom Floating Interactive Controls Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/70 shadow-2xl text-slate-300 text-xs">
        <button
          onClick={() => handleZoom(-1.5)}
          className="p-1.5 hover:text-white hover:bg-slate-800 rounded-full transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(1.5)}
          className="p-1.5 hover:text-white hover:bg-slate-800 rounded-full transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition ${autoRotate ? 'bg-sky-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span>{autoRotate ? 'Rotating' : 'Auto-Rotate'}</span>
        </button>
        <button
          onClick={resetView}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition"
          title="Reset View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Scientific Disclaimer Footer Label */}
      <div className="absolute bottom-1 right-3 z-10 text-[9px] text-slate-400/80 pointer-events-none flex items-center gap-1">
        <Info className="w-3 h-3" />
        <span>Simulated relative load visualization. Not direct invasive in-vivo measurement.</span>
      </div>
    </div>
  );
};
