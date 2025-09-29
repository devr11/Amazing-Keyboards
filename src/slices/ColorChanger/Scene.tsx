import { Keyboard } from "@/components/Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

export function Scene({ selectedTextureId, onAnimationComplete }: SceneProps) {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {

    if (!keyboardRef.current) return;

    const keyboard = keyboardRef.current;

    const tl = gsap.timeline({
      onComplete: ()=>{
        onAnimationComplete()
      }
    });

    tl.to(keyboard.position, {
      y: 0.3,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => setCurrentTextureId(selectedTextureId),
    });
    tl.to(keyboard.position, {
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.4)",
    });
  }, [selectedTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((texture, index) => {
      const tex = Array.isArray(textures) ? textures[index] : textures;

      if (tex) {
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;

        materialMap[texture.id] = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.7,
        });
      }
    });

    return materialMap;
  }, [textures]);

  const currentKnobColor =
    KEYCAP_TEXTURES.find((t) => t.id === selectedTextureId)?.knobColor ||
    "#e24818";

  return (
    <Stage environment={"city"} intensity={0.05} shadows="contact">
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
}
