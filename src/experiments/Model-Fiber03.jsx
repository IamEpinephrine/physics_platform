import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
function MyRotatingBox() {
    const myMesh = useRef(null);
    const [active, setActive] = useState(false);

    useFrame((state, delta ) => {
        myMesh.current.rotation.x += delta;
        myMesh.current.rotation.y += delta;
    });

    return (
        <mesh
            onClick={() => setActive(!active)}
            ref={myMesh}
        >
            <cubeGeometry />
            <meshPhongMaterial color="royalblue" />
        </mesh>
    );
}

export default function ModelFiber03() {
    return (
        <div style={{ width: window.innerWidth + "px", height: window.innerHeight + "px" }}>
            <Canvas style={{ background: 'black' }}>
                <MyRotatingBox />
                <ambientLight intensity={0.1} />
                <directionalLight />
            </Canvas>
        </div>
    );
}
