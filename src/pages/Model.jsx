import React, {useState, useEffect, Suspense} from 'react';
import {useParams} from 'react-router-dom';
import {Canvas, useLoader} from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {Environment, OrbitControls} from "@react-three/drei";

export default function Model() {
    const {id} = useParams();
    const [model, setModel] = useState();
    const [gltf, setGltf] = useState();

    useEffect(() => {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };
            fetch(`http://localhost:8000/api/models/${id}`, requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setModel(data)
                    setGltf(useLoader(GLTFLoader, model.model_path))
                });

    }, []);

    return(
        <>
            <div>
                {model? <div>
                            <p>{model.name}</p>
                            <p>{model.model_path}</p>
                                <div className="App">
                                    <Canvas>
                                        <Suspense fallback={null}>
                                            <primitive object={gltf.scene} />
                                            <OrbitControls />
                                        </Suspense>
                                    </Canvas>
                                </div>
                        </div>: null}
                Test
            </div>
        </>
    )

};
