import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useEffect, useState } from "react";
import React, { useRef } from 'react';
import * as THREE from "three";

export default function ModelFiber04() {
    const [count, setCount] = useState(0);
    const handleOnClick = () => {
        setCount((count) => count + 1);
    };

    return (
        <div>
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                onClick={handleOnClick}
            >
                <PerspectiveCamera position={[0, 10, 10]} makeDefault />
                <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.5} makeDefault />
                <Lighting />
                <Physics>
                    {Array(50)
                        .fill()
                        .map((element, index) => (
                            <Cube
                                props={{ position: [0, 5 * index, 0] }}
                                key={index}
                                handler={handleOnClick}
                            />
                        ))}
                    <Plane />
                    <Shoot count={count} />
                </Physics>
            </Canvas>
        </div>
    );
}

function Cube({ props, handler }) {
    const [ref] = useBox(() => ({ mass: 1, ...props }));
    useFrame(() => {});
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
        </mesh>
    );
}

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial />
        </mesh>
    );
}

function Lighting() {
    return (
        <spotLight
            castShadow
            color={"#ffe692"}
            position={[30, 30, 30]}
            intensity={1}
            distance={100}
            angle={(Math.PI / 2) * 0.25}
            penumbra={1}
            decay={0.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
    );
}

function Shoot({ count }) {
    const { position } = useThree((state) => state.camera);
    const { x, y } = useThree((state) => state.pointer);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (count > 0) {
            const shootVelocity = 200;
            const v3 = new THREE.Vector3();
            const endPoint = new THREE.Vector3(0, 0, 0);
            const direction = v3.subVectors(endPoint, position).normalize();
            const vel = direction.multiplyScalar(shootVelocity);
            //console.log(count, position, vel);
            setItems((state) => [
                ...state,
                {
                    position: [position.x, position.y, position.z],
                    velocity: [vel.x, vel.y, vel.z]
                }
            ]);
        }
    }, [count, position, x, y]);

    return items.map((element, index) => <Bullet key={index} props={element} />);
}

function Bullet({ props }) {
    const [ref] = useSphere(() => ({
        mass: 1,
        ...props
    }));

    const vertexShader = `
  //	Simplex 3D Noise 
  //	by Ian McEwan, Ashima Arts
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;
  
  // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  
  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;
  
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
  
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
  
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
  
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
  
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
  
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
  
  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  varying vec2 vUv;
  varying float noise;
  uniform float time;

  void main() {
    vUv = uv;
    noise = snoise(position * 5.0 + time * 0.25);
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
    const fragmentShader = `
  varying vec2 vUv;
  varying float noise;
  void main() {
    vec3 flame = vec3(0.8, 0.2, 0.2);
    vec3 color = max(flame, noise);
    gl_FragColor = vec4(color, 1.0);
  }
`;
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    useFrame(() => {
        ref.current.material.uniforms.time.value += 0.01;
    });

    return (
        <mesh ref={ref} castShadow material={material}>
            <sphereGeometry args={[1, 64, 32]} />
        </mesh>
    );
}
