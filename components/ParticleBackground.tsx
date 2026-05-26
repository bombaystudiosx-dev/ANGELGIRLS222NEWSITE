/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleConfig, ActiveColor } from '../types';

interface ParticleBackgroundProps {
  config: ParticleConfig;
}

export default function ParticleBackground({ config }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const configRef = useRef<ParticleConfig>(config);

  // Sync config changes without destroying the full canvas if possible
  useEffect(() => {
    configRef.current = config;
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.color = new THREE.Color(getHexColor(config.color));
    }
  }, [config]);

  // Helper to resolve theme hexadecimal colors
  function getHexColor(color: ActiveColor): string {
    switch (color) {
      case 'CRIMSON':
        return '#FF2E88';
      case 'CYBER_CYAN':
        return '#0ad6ff';
      case 'NEON_LIME':
        return '#39ff14';
      case 'CHROME_WHITE':
        return '#ffffff';
      default:
        return '#FF2E88';
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#07070A', 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 45);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Programmatically generate a glowing circular particle texture
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    }

    // 3. Create Particle Mesh
    const count = 3500;
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const waveSpeeds = new Float32Array(count);
    const radialDistance = new Float32Array(count);

    const widthXZ = 110;
    const depthXZ = 110;

    for (let i = 0; i < count; i++) {
      // Coordinate scatter inside plane
      const x = (Math.random() - 0.5) * widthXZ;
      const z = (Math.random() - 0.5) * depthXZ;
      const y = (Math.random() - 0.5) * 6; // Minor depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Unique properties
      waveSpeeds[i] = 0.5 + Math.random() * 1.5;
      radialDistance[i] = Math.sqrt(x * x + z * z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: createCircleTexture(),
      color: new THREE.Color(getHexColor(configRef.current.color)),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // 4. Mouse Coordinates Projection
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);

    const handleMouseMove = (event: MouseEvent) => {
      // Map screen coords to normalized [-1, 1] range
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Scroll Handler (for Camera and Mesh rotation effects)
    let lastScrollY = window.scrollY;
    let scrollMultiplier = 0.01;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 6. Handle Window Resizing with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    });
    resizeObserver.observe(containerRef.current);

    // 7. Core Logic & Render Animation Loop (120FPS targets)
    const clock = new THREE.Clock();

    const animate = () => {
      const activeConfig = configRef.current;
      const elapsedTime = clock.getElapsedTime() * activeConfig.speed;
      const delta = clock.getDelta();

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Project Mouse normalized coordinate into 3D plane
      const mouse3D = new THREE.Vector3(
        mouse.x * 35,
        -5, // Projected grid height
        -mouse.y * 35
      );

      // Check camera & scene adjustments based on scrolling progress
      const scrollProgress = lastScrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      
      // Dynamic camera orbit elevation on scroll
      camera.position.y = 12 + scrollProgress * 15;
      camera.position.z = 40 - scrollProgress * 12;
      camera.lookAt(0, -3, 0);

      // Subtle rotation to make space feel alive
      points.rotation.y = elapsedTime * 0.03 + lastScrollY * 0.0003;

      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttribute.array as Float32Array;

      // Mathematical field solvers based on active config state
      for (let i = 0; i < count; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        const x = initialPositions[xIdx];
        const y = initialPositions[yIdx];
        const z = initialPositions[zIdx];

        let targetY = 0;

        switch (activeConfig.mode) {
          case 'WAVES':
            // Overlapping mathematical sine waves forming an undulating plane
            targetY =
              Math.sin(x * 0.1 + elapsedTime * waveSpeeds[i]) * 4 +
              Math.cos(z * 0.08 + elapsedTime * 0.8) * 3;
            break;

          case 'VORTEX': {
            // Spiral coordinates surrounding the central Y-Axis vertex
            const speed = elapsedTime * 0.5 * waveSpeeds[i];
            const dist = radialDistance[i];
            const angle = Math.atan2(z, x) + (2.0 / (dist * 0.15 + 1)) * speed;
            const newX = Math.cos(angle) * dist;
            const newZ = Math.sin(angle) * dist;
            
            posArray[xIdx] = newX;
            posArray[zIdx] = newZ;
            
            targetY = Math.sin(dist * 0.2 - elapsedTime * 2) * (1.5 + dist * 0.05);
            break;
          }

          case 'CHAOS':
            // High frequency multi-sine wave intersections generating space static
            targetY =
              Math.sin(x * 0.25 + z * 0.25 + elapsedTime * 2.5) * 4 +
              Math.sin(x * 0.05 - elapsedTime * 0.8) * 3 +
              Math.cos(z * 0.15 + elapsedTime * 1.5) * 2;
            break;

          case 'TURBULENCE': {
            // Low frequency organic turbulence grid
            const angle = elapsedTime + x * 0.03;
            targetY =
              Math.sin(x * 0.06 + Math.cos(z * 0.05) + elapsedTime) * 5 +
              Math.sin(z * 0.08 - Math.sin(x * 0.04) + elapsedTime) * 4;
            break;
          }
        }

        // Apply mouse distortion physics
        if (activeConfig.mouseEffect !== 'NONE') {
          const currentX = posArray[xIdx];
          const currentZ = posArray[zIdx];

          // Compute 2D horizontal distance from particle to virtual mouse point
          const dx = currentX - mouse3D.x;
          const dz = currentZ - mouse3D.z;
          const distToMouse = Math.sqrt(dx * dx + dz * dz);

          const maxDist = 20; // Radius of repulsion field
          if (distToMouse < maxDist) {
            const force = (1.0 - distToMouse / maxDist) * activeConfig.repelForce;

            if (activeConfig.mouseEffect === 'REPEL') {
              // Push particles outwards along mouse radial vector
              posArray[xIdx] += (dx / distToMouse) * force * 1.5;
              posArray[zIdx] += (dz / distToMouse) * force * 1.5;
              targetY -= force * 3; // Depress particle heights
            } else if (activeConfig.mouseEffect === 'ATTRACT') {
              // Pull particles inwards towards mouse center
              posArray[xIdx] -= (dx / distToMouse) * force * 1.5;
              posArray[zIdx] -= (dz / distToMouse) * force * 1.5;
              targetY += force * 3;
            } else if (activeConfig.mouseEffect === 'VORTEX') {
              // Spin particles in a tangential vector around the cursor target
              const angle = Math.atan2(dz, dx) + 0.15 * force;
              posArray[xIdx] = mouse3D.x + Math.cos(angle) * distToMouse;
              posArray[zIdx] = mouse3D.z + Math.sin(angle) * distToMouse;
              targetY += force * 2;
            }
          } else if (activeConfig.mode !== 'VORTEX') {
            // Gently spring back to planar rest position
            posArray[xIdx] += (x - currentX) * 0.03;
            posArray[zIdx] += (z - currentZ) * 0.03;
          }
        } else if (activeConfig.mode !== 'VORTEX') {
          posArray[xIdx] += (x - posArray[xIdx]) * 0.03;
          posArray[zIdx] += (z - posArray[zIdx]) * 0.03;
        }

        // Smoothly interpolate heights (Y coordinate)
        posArray[yIdx] += (targetY - posArray[yIdx]) * 0.08;
      }

      posAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(animate);
    };

    let requestId = requestAnimationFrame(animate);

    // 8. Clean up listeners & dispose ThreeJS objects
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(requestId);

      if (rendererRef.current && rendererRef.current.domElement) {
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }

      // Explicitly dispose memory arrays
      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="webgl-canvas-container"
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden select-none pointer-events-none"
    />
  );
}
