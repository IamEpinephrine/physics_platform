import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Cube(props) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  );
}

function ModelFiber01() {
  return (
    <div style={{ width: window.innerWidth + "px", height: window.innerHeight + "px" }}>
      <Canvas style={{ background: 'black' }}>
        <Cube />
      </Canvas>
    </div>
  );
}

export default ModelFiber01;
