import React, {useState, useEffect, Suspense} from 'react';
import {useParams} from 'react-router-dom';
import {Canvas, useLoader} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {Environment, OrbitControls} from "@react-three/drei";
import 'example01.html'

    export default function Model() {
        const {id} = useParams();

        function getModel() {
            const request = new XMLHttpRequest();
            request.open("GET", `http://localhost:8000/api/models/${id}`, false); // false makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                const json = JSON.parse(request.responseText);
                console.log(request.responseText);
                console.log(json.model_path)
                return json.model_path;
            }
            return null;
        }


            return(
                <div>
                    <Canvas>
                        <Suspense fallback={null}>
                            <primitive object={useLoader(GLTFLoader, getModel()).scene} />
                            <OrbitControls/>
                        </Suspense>
                    </Canvas>
                </div>
            );
    }


