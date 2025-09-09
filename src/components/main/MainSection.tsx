import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import './main.scss'

const carousel = [
    {
        title: "",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mMAAQAABQABoIJXOQAAAABJRU5ErkJggg=="
    },
    {
        title: "REPSOL",
        src: "/images/repsol.png"
    },
    {
        title: "NARIA",
        src: "/images/naria.png"
    },
]

const vertexShader = `
    uniform sampler2D uTexture;
    uniform vec2 uOffset;
    uniform float uTime;
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
        float animationSpeed = newPosition.x + (uTime * 0.2);
        newPosition.y += sin(animationSpeed * 8.0) * 0.02;
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

export default function MainSection({ setCurrentNumber, handleMouseLinkInteractions, mouseRef }: { 
    setCurrentNumber: React.Dispatch<React.SetStateAction<number>>
    mouseRef: RefObject<HTMLDivElement | null> 
    handleMouseLinkInteractions: (enterorleave: "enter" | "leave") => void
}) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLTableSectionElement | null>(null)
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

    const handleImageMouseEvent = (clientX: number) => {
        let mouseX = (clientX / windowSize.width)

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

        if (mouseRef.current && windowSize.width > 1000) {
            mouseRef.current.style.backgroundColor = 'transparent'
            mouseRef.current.style.width = '150px'
            mouseRef.current.style.height = '150px',
            mouseRef.current.style.border = 'none',
            mouseRef.current.style.zIndex = '2',
            mouseRef.current.style.pointerEvents = 'none'
            mouseRef.current.innerHTML = `<span>VISIT WEBSITE</span>`
        }
    }

    const goToWebsite = () => {        
        if (position === 1) {
            window.open("https://bdabarcelona.naria.digital/#/", "blank")
        }

        if (position === 2) {
            window.open(
                "https://www.repsol.es/particulares/buscador/#q=repsol&t=particulares&numberOfResults=12",
                "blank"
            )
        }
    }

    useEffect(() => {
        if (carouselRef.current && sectionRef.current) {
            carouselRef.current.style.transform = `
                translate3d(-${sectionRef.current.clientWidth * position}px, 0, 0)
            `
        }
    }, [position, windowSize])

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
        <main>
            <div className="images">
                <div ref={carouselRef} className="carousel">
                    {carousel.map((item, index) => (
                        <section 
                            key={index}
                            ref={sectionRef}
                        >
                            <motion.img
                                ref={el => { imageRefs.current[index] = el }}
                                src={item.src} 
                                className={index === position ? "enter" : "leave"} alt="" 
                                onMouseMove={(e) => handleImageMouseEvent(e.clientX)}
                                onTouchMove={(e) => handleImageMouseEvent(e.touches[0].clientX)}
                                onMouseLeave={() => handleMouseLinkInteractions("leave")}
                                onClick={goToWebsite}
                            />
                            <div><h1 className={index === position ? "enter" : "leave"}>{item.title}</h1></div>
                        </section>
                    ))}
                </div>
            </div>

            <div className="go-to" onClick={goToWebsite}><span>VISIT WEBSITE</span></div>

            <AnimatePresence>
                {position > 1 &&
                    <motion.div 
                        key="left"
                        className="arrows arrow-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 4.0 }  }}
                        exit={{ opacity: 0, transition: { duration: 1.0 } }}
                        onClick={() => {
                            if (position === 1) return;
                            const newPosition = position - 1
                            setPosition(newPosition);
                            setCurrentNumber(newPosition)
                        }}
                        onMouseMove={() => handleMouseLinkInteractions("enter")}
                        onMouseLeave={() => handleMouseLinkInteractions("leave")}
                    >
                        <Image 
                            src={"/images/arrow.svg"} 
                            width={20} 
                            height={20} alt=""
                        />
                    </motion.div>
                }

                {position < 2 &&
                    <motion.div
                        key="right"
                        className="arrows arrow-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 4.0 }  }}
                        exit={{ opacity: 0, transition: { duration: 1.0 },  }} 
                        onClick={() => {
                            if (position === 2) return;
                            const newPosition = position + 1
                            setPosition(newPosition);
                            setCurrentNumber(newPosition)
                        }}
                        onMouseMove={() => handleMouseLinkInteractions("enter")}
                        onMouseLeave={() => handleMouseLinkInteractions("leave")}
                    >
                        <Image src={"/images/arrow.svg"} width={20} height={20} alt="" />
                    </motion.div>
                }
            </AnimatePresence>

            <div className="canvas" style={{ position: 'absolute', top: '0', left: '0', height: '100%', width: '100%' }}>
                <Canvas>
                    <PerspectiveCamera 
                        fov={(180 * (2 * Math.atan(windowSize.height / 2 / perspective))) / Math.PI} 
                        aspect={windowSize.width / windowSize.height}
                        near={1}
                        far={perspective}
                        position={[0, 0, perspective]}
                        makeDefault
                    /> 
                    {imageRefs.current.map((imageRef, index) => index > 0 && imageRef !== null &&
                        <Plane 
                            key={index}
                            imageRef={imageRef}
                            windowSize={windowSize}
                            distortImage={distortImage}
                            valuesRef={valuesRef}
                        />
                    )}
                </Canvas>
            </div>
        </main>
    );
}

const Plane = ({ imageRef, windowSize, distortImage, valuesRef }: {
    imageRef: HTMLImageElement
    windowSize: { width: number, height: number }
    distortImage: () => void
    valuesRef: RefObject<{ target: number, actual: number }>
}) => {
    const ref = useRef<THREE.Mesh | null>(null)
    const uniforms = useMemo(() => ({
        uTexture: {
            value: new THREE.TextureLoader().load(imageRef.src)
        },
        uOffset: {
            value: new THREE.Vector2(0.0, 0.0)
        },
        uTime: {
            value: 0
        }
    }), [])
    const { width, height, top, left } = imageRef.getBoundingClientRect();
    
    useFrame(({ clock }) => {
        if (ref.current === null) {
            return
        }

        const { width, height, top, left } = imageRef.getBoundingClientRect();
        distortImage()
        

        const offset = {
            x: left - windowSize.width / 2 + width / 2,
            y: -top + windowSize.height / 2 - height / 2
        }

        ref.current.position.set(offset.x, offset.y, 0)
        ref.current.scale.set(width, height, 1)

        uniforms.uOffset.value = new THREE.Vector2(
            -(valuesRef.current.target - valuesRef.current.actual) * 0.0003, offset.y * 0.0
        )
        uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <mesh
            ref={ref}
            position={[
                left - windowSize.width / 2 + width / 2, 
                -top + windowSize.height / 2 - height / 2,
                0
            ]}
            scale={[width, height, 1]}
        >
            <planeGeometry args={[1, 1, 100, 100]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                side={THREE.DoubleSide}
                uniforms={uniforms}
            />
        </mesh>
    )
}