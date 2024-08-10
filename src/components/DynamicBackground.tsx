
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const ColorChangingSphere = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.z = time * 0.1;

    const hue = (Math.sin(time * 0.1) + 1) / 2;
    materialRef.current.color.setHSL(hue, 0.5, 0.5);
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshPhongMaterial ref={materialRef} />
    </Sphere>
  );
};

const DynamicBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ColorChangingSphere />
      </Canvas>
    </div>
  );
};

export default DynamicBackground;
