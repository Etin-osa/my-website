'use client';

import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import './home.scss'
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader, Vector2, DoubleSide, Mesh, Vector3 } from "three";

const carousel = [
    {
        title: "",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mMAAQAABQABoIJXOQAAAABJRU5ErkJggg=="
    },
    {
        title: "MUSE",
        src: "https://images.unsplash.com/photo-1508229273697-58d781b8012b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "HUGO",
        src: "https://images.unsplash.com/photo-1475870434835-a633fd526088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "MORE",
        src: "https://images.unsplash.com/photo-1504022462188-88f023db97bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

const vertexShader = `
    uniform sampler2D uTexture;
    uniform vec2 uOffset;
    varying vec2 vUv;

    #define M_PI 3.1415926535897932384626433832795

    vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
        position.x = position.x + (sin(uv.y * M_PI) * offset.x);
        position.y = position.y + (sin(uv.x * M_PI) * offset.y);
        return position;
    }

    void main() {
        vUv = uv;
        vec3 newPosition = deformationCurve(position, uv, uOffset);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
`
const fragmentShader = `
    uniform sampler2D uTexture;
    uniform vec2 uOffset;
    varying vec2 vUv;

    vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
        float r = texture2D(textureImage,uv + offset).r;
        vec2 gb = texture2D(textureImage,uv).gb;
        return vec3(r,gb);
    }   
        
    void main() {
        vec3 color = rgbShift(uTexture,vUv,uOffset);
        gl_FragColor = vec4(color,1.0);
    }
`

export default function Homepage() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([null, null, null]);
    const valuesRef = useRef({ target: 0, actual: 0 })
    const [position, setPosition] = useState(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const perspective = 1000;
    const ease = 0.075

    const lerp = (start: number, end: number, t: number) => {
        return start * (1 - t ) + end * t;
    }

    const distortImage = () => {
        if (!carouselRef.current) {
            return;
        }
        const { left } = carouselRef.current.getBoundingClientRect()
        valuesRef.current.target = left * 2
        valuesRef.current.actual = lerp(valuesRef.current.actual, valuesRef.current.target, ease)
    }
    
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translate3d(-${100 * position}vw, 0, 0)`
        }
    }, [position])

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        setPosition(1)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div>
            <div className="app-ui">
                <main>
                    <div ref={carouselRef} className="carousel">
                        {carousel.map((item, index) => (
                            <section key={index}>
                                <img 
                                    ref={el => { imageRefs.current[index] = el }}
                                    src={item.src} 
                                    className={index === position ? "enter" : "leave"} alt="" 
                                    onMouseMove={(e) => {
                                        let mouseX = (e.clientX / windowSize.width)

                                        if (windowSize.width > 1600) {
                                            mouseX = mouseX * 3000 - 1500
                                        } else if  (windowSize.width > 1300) {
                                            mouseX = mouseX * 1700 - 850
                                        } else {
                                            mouseX = mouseX * 1400 - 700
                                        }
                                        
                                        if (valuesRef.current.target === Infinity || valuesRef.current.actual === Infinity) {
                                            valuesRef.current.target = 0
                                            valuesRef.current.actual = 0
                                        }

                                        valuesRef.current.target += Math.floor(mouseX)
                                        valuesRef.current.actual = lerp(valuesRef.current.actual, valuesRef.current.target, ease)
                                    }}
                                />
                                <div><h1 className={index === position ? "enter" : "leave"}>{item.title}</h1></div>
                            </section>
                        ))}
                    </div>
                </main>

                <div className="buttons">
                    <div 
                        className="btn btn-left" 
                        onClick={() => {
                            if (position === 1) return;
                            setPosition(position - 1);
                        }}
                    >
                        <span className="material-symbols-outlined">
                            Left
                        </span>
                    </div>
                    <div 
                        className="btn btn-right" 
                        onClick={() => {
                            if (position === 3) return;
                            setPosition(position + 1);
                        }}
                    >
                        <span className="material-symbols-outlined">
                            Right
                        </span>
                    </div>
                </div>
            </div>

            <div className="canvas" style={{ position: 'absolute', top: '0', left: '0', zIndex: -2, height: '100%', width: '100%' }}>
                <Canvas>
                    <PerspectiveCamera 
                        fov={(180 * (2 * Math.atan(windowSize.height / 2 / perspective))) / Math.PI} 
                        aspect={windowSize.width / windowSize.height}
                        near={1}
                        far={perspective}
                        position={[0, 0, perspective]}
                        makeDefault
                    /> 
                    {imageRefs.current &&
                        <Planes 
                            imageRefs={imageRefs}
                            windowSize={windowSize}
                            distortImage={distortImage}
                            valuesRef={valuesRef}
                        />
                    }
                </Canvas>
            </div>
        </div>
    );
}

const Planes = ({ imageRefs, windowSize, valuesRef, distortImage }: {
    imageRefs: RefObject<(HTMLImageElement | null)[]>
    windowSize: { width: number, height: number }
    valuesRef: RefObject<{ target: number, actual: number }>
    distortImage: () => void
}) => {
    const meshRefs = useRef<(Mesh | null)[]>([null, null, null])
    const uniformList = useMemo(() => imageRefs.current.map((img) => ({
        uTexture: {
            value: new TextureLoader().load(img ? img.src : "")
        },
        uOffset: {
            value: new Vector2(0.0, 0.0)
        }
    })), [])

    const calculatePosition = (img: HTMLImageElement) => {
        const { width, height, top, left } = img.getBoundingClientRect();

        const offset = {
            x: left - windowSize.width / 2 + width / 2,
            y: -top + windowSize.height / 2 - height / 2
        }

        return new Vector3(offset.x, offset.y, 0)
    }

    const calculateScale = (img: HTMLImageElement) => {
        const { width, height } = img.getBoundingClientRect()
        return new Vector3(width, height, 1)
    }

    useFrame(() => {
        imageRefs.current.forEach((img, index) => {
            if (img === null || meshRefs.current[index] === null) {
                return
            }

            const { width, height, top, left } = img.getBoundingClientRect();
            distortImage()

            const offset = {
                x: left - windowSize.width / 2 + width / 2,
                y: -top + windowSize.height / 2 - height / 2
            }

            meshRefs.current[index].position.set(offset.x, offset.y, 0)
            meshRefs.current[index].scale.set(width, height, 1)

            uniformList[index].uOffset.value = new Vector2(
                -(valuesRef.current.target - valuesRef.current.actual) * 0.0003, offset.y * 0.0
            )
        })
    })

    return imageRefs.current.map((img, index) => index > 0 && (
        <mesh 
            key={index}
            ref={el => { meshRefs.current[index] = el }}
            position={calculatePosition(img as HTMLImageElement)}
            scale={calculateScale(img as HTMLImageElement)}
        >
            <planeGeometry args={[1, 1, 100, 100]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                side={DoubleSide}
                uniforms={uniformList[index]}
            />
        </mesh>
    ))
}