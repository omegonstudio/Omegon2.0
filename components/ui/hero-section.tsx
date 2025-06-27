import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Shape,
  ExtrudeGeometry,
  Group,
  Vector3
} from 'three';

type Vec3 = [number, number, number];

interface BoxProps {
  position: Vec3;
  rotation: Vec3;
}

const Box: React.FC<BoxProps> = ({ position, rotation }) => {
  const geometry = useMemo(() => {
    const shape = new Shape();
    const r = 1;
    const a = Math.PI * 0.5;

    shape.absarc(2, 2, r, a * 0, a * 1);
    shape.absarc(-2, 2, r, a * 1, a * 2);
    shape.absarc(-2, -2, r, a * 2, a * 3);
    shape.absarc(2, -2, r, a * 3, a * 4);

    const settings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 4,
    };

    const geo = new ExtrudeGeometry(shape, settings);
    geo.center();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation}>
      <meshStandardMaterial
        color="#232323"
        metalness={0.8}
        roughness={0.4}
        emissive="#111"
        flatShading={false}
      />
    </mesh>
  );
};

const AnimatedBoxes: React.FC = () => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const boxes: BoxProps[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        position: [(index - 6) * 1.5, 0, 0],
        rotation: [0, Math.PI / 2, 0],
      })),
    []
  );

  return (
    <group ref={groupRef}>
      {boxes.map((box, idx) => (
        <Box key={idx} {...box} />
      ))}
    </group>
  );
};

export const Scene: React.FC = () => {
  return (
    <div className="w-full h-full z-0">
      <Canvas camera={{ position: [0, 2, 20], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <AnimatedBoxes />
      </Canvas>
    </div>
  );
};
