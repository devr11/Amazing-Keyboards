"use client";

import { Keyboard } from "@/components/Keyboard";
import { Keycap } from "@/components/Keycap";
import { useGSAP } from "@gsap/react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useControls } from "leva";
import { useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const keyboardGroupRef = useRef<THREE.Group>(null);
  const [lightIntensityScalar, setLightIntensityScalar] = useState(0);

  const scalingFactor = window.innerWidth <= 500 ? 0.5 : 1;

  useGSAP(() => {
    if (!keyboardGroupRef.current) return;

    const keyboard = keyboardGroupRef.current;

    gsap.to(
      {lightIntensityScalar},
      {lightIntensityScalar: 1,
        duration: 3.5,
        ease: "power2.inOut",
        delay: 0.5,
        onUpdate: function() {
          setLightIntensityScalar(this.targets()[0].lightIntensityScalar);
        }

      }
    )

    const tl = gsap.timeline({
      ease: "power2.inOut",
    });

    tl.to(keyboard.position, {
      x: 0,
      y: -0.5,
      z: 0.5,
      duration: 2,
    }).to(keyboard.rotation, {
      x: 1.4,
      y: 0,
      z: 0,
      duration: 1.8,
    }, "<")
    
    .to(keyboard.position, {
      x: 0.2,
      y: -0.5,
      z: 1.9,
      duration: 2,
      delay: 0.5,
    }).to(keyboard.rotation, {
      x: 1.4,
      y: .4,
      z: 0,
      duration: 2,
    }, "<")
  });

  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      <group scale={scalingFactor}>
        <group ref={keyboardGroupRef}>
          <Keyboard scale={9} />
        </group>

        <group>
          <Keycap position={[0, -0.4, 2.6]} rotation={[0, 2, 3]} texture={0} />
          <Keycap position={[-1.4, 0, 2.3]} rotation={[3, 2, 1]} texture={1} />
          <Keycap position={[-1.8, 1, 1.5]} rotation={[0, 1, 3]} texture={2} />
          <Keycap position={[0, 1, 1]} rotation={[0, 4, 2]} texture={3} />
          <Keycap position={[0.7, 0.9, 1.4]} rotation={[3, 2, 0]} texture={4} />
          <Keycap
            position={[1.3, -0.3, 2.3]}
            rotation={[1, 2, 0]}
            texture={5}
          />
          <Keycap position={[0, 1, 2]} rotation={[2, 2, 3]} texture={6} />
          <Keycap position={[-0.7, 0.6, 2]} rotation={[1, 4, 0]} texture={7} />
          <Keycap
            position={[-0.77, 0.1, 2.8]}
            rotation={[3, 2, 3]}
            texture={8}
          />
          <Keycap position={[2, 0, 1]} rotation={[0, 0, 3]} texture={7} />
        </group>
      </group>

      <Environment
        files={["/hdr/blue-studio.hdr"]}
        environmentIntensity={0.05 * lightIntensityScalar}
      />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30 * lightIntensityScalar}
        castShadow
        shadow-bias={-0.0002}
        shadow-normalBias={0.002}
        shadow-mapSize={1024}
      />
    </group>
  );
};

export default Scene;
