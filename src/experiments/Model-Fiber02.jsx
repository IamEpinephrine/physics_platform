import React, {useRef, useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Circle(props) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    meshRef.current.position.x += delta;
  });

  return (
    <mesh
        onCLick={() => alert('Hello!')}
      ref={meshRef}>
      <circleGeometry />
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  );
}

function ModelFiber01() {
  return (
    <div style={{ width: window.innerWidth + "px", height: window.innerHeight + "px" }}>
      <Canvas style={{ background: 'black' }}>
        <Circle />
      </Canvas>
    </div>
  );
}

export default ModelFiber01;
