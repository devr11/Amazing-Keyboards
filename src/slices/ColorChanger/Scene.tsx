import { Keyboard } from "@/components/Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo } from "react";
import * as THREE from "three";

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
}

export function Scene({ selectedTextureId, onAnimationComplete }: SceneProps) {

  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

  const materials = useMemo(() => {
    const materialMap: { [key:string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((texture, index) => {
      const tex = Array.isArray(textures)
    })
  })
  
  return (
    <Stage environment={"city"} intensity={0.05} shadows="contact">

    <group>
      <Keyboard />
    </group>
    </Stage>
  )
}