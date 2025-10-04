import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

// Type definitions
type GLTFResult = GLTF & {
  nodes: {
    Single_Switch_Mesh_1: THREE.Mesh;
    Single_Switch_Mesh_2: THREE.Mesh;
    Single_Switch_Mesh_3: THREE.Mesh;
    Single_Switch_Mesh_4: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

export function Switch() {
  const { nodes } = useGLTF("/switch.gltf") as unknown as GLTFResult;

  return (
    <group scale={10} rotation={[Math.PI / 2, 0, 0]}>
      {/* Switch housing */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Single_Switch_Mesh_1.geometry}
      >
        <meshStandardMaterial color="#999999" roughness={0.7} />
      </mesh>

      {/* Gold contacts */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Single_Switch_Mesh_2.geometry}
      >
        <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} />
      </mesh>

      {/* Colored stem */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Single_Switch_Mesh_3.geometry}
      >
        <meshStandardMaterial color={"#cccccc"} roughness={0.7} />
      </mesh>

      {/* Switch base */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Single_Switch_Mesh_4.geometry}
      >
        <meshStandardMaterial color="#999999" roughness={0.7} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/switch.gltf");
