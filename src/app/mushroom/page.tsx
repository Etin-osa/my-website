'use client'

import React, { useMemo, useRef } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { FaArrowRight, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PiCaretDoubleUpFill } from "react-icons/pi";
import { PerspectiveCamera, Preload, View } from "@react-three/drei";

import './mushroom.scss';

export default function mushroom() {
    const refList = useRef<(HTMLElement | null)[]>([])
    const textures = useMemo(() => {
        const loadingManager = new THREE.LoadingManager(() => console.log("loading complete"))
        const textureLoader = new THREE.TextureLoader(loadingManager)

        if (typeof window !== "undefined") {
            const texture_blue = textureLoader.load("/images/naria.png")
        }

        // const texture_bw = textureLoader.load("/images/speaker_bw.jpg")
        // const texture_green = textureLoader.load("/images/speaker_green.jpg")
        // const texture_orange = textureLoader.load("/images/speaker_orange.jpg")
        // const texture_white = textureLoader.load("/images/speaker_white.jpg")

        // return [texture_bw, texture_blue, texture_green, texture_orange, texture_white]
        return []
    }, []) 

    return (
        <div className="app">
            <div className="absolute-icon">
                <PiCaretDoubleUpFill size={24} />
            </div>

            <nav>
                <ul>
                    <li>
                        <div>
                            <PiCaretDoubleUpFill size={24} />
                        </div>
                        <div className="nav-text">
                            <p>Home</p>
                            <p>Concept</p>
                            <p>Specs</p>
                        </div>
                    </li>

                    <li className="nav-link">
                        <a href="https://github.com/Etin-osa" target="blank">
                            <FaGithub color="#111111" size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/etin-osa02/" target="blank">
                            <FaLinkedin color="#111111" size={24} />
                        </a>
                        <a href="https://www.instagram.com/etin_osa02?igsh=MTZtY210b2NhM2Ji" target="blank">
                            <FaInstagram color="#111111" size={24} />
                        </a>
                    </li>
                </ul>
            </nav>

            <main>
                <section ref={el => { refList.current[0] = el}} className="home">
                    <div className='perspective'>
                        <div className="perspective-child">
                            <div className='top'><h1>mushroom</h1></div>
                            <div className='bottom'><h1>mushroom</h1></div>
                        </div>
                    </div>

                    <div className="home-body">
                        <p><span>$</span>129</p>
                        <div className="home-body__paragraph">
                            <p>Lorem ipsum dolor sit consectetur adipisicing elit. Deleniti minus sit molestiae, alias quia odio fugiat ab saepe beatae ratione.</p>
                            <div className="preorder-button">
                                <span>Preorder</span>
                                <FaArrowRight />
                            </div>
                        </div>
                    </div>

                    <View className="home-view">
                        <PerspectiveCamera makeDefault />
                        <GetSpeakers 
                            locations={[
                                { 
                                    position: [10, 18, 0],
                                    rotation: [0, 0, -0.18],
                                    texture: textures[0]
                                },
                                { 
                                    position: [10, 7, 0],
                                    rotation: [-0.14, 0.01, 0.19],
                                    texture: textures[2]
                                },
                                { 
                                    position: [15, -5, 0],
                                    rotation: [-0.39, 0.47, 0.03],
                                    texture: textures[1]
                                },
                                { 
                                    position: [5, -15, 0],
                                    rotation: [-0.34, 0.18, -0.07],
                                    texture: textures[3]
                                },
                                { 
                                    position: [10, -25, 0],
                                    rotation: [-0.33, -0.01, 0.06],
                                    texture: textures[4]
                                },
                            ]}
                        />
                    </View>
                </section>      

                <section ref={el => { refList.current[1] = el}}  className="concept">
                    <div className="concept-text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum cumque delectus, odit ipsum nihil obcaecati accusamus, magni dolores explicabo recusandae soluta?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis eveniet, ducimus repellendus vel unde earum doloremque sit iure itaque ad enim culpa alias modi quo tempora tenetur exercitationem nam!</p>
                    </div>
                    <div className='perspective'>
                        <div className="perspective-child">
                            <div className='top'><h1>concept</h1></div>
                            <div className='bottom'><h1>concept</h1></div>
                        </div>
                    </div>
                </section>  

                <section ref={el => { refList.current[2] = el}}  className="specs">
                    <div className="specs-info">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum cumque delectus, odit ipsum nihil obcaecati accusamus, magni dolores explicabo recusandae soluta?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis eveniet, ducimus repellendus vel unde earum doloremque sit iure itaque ad enim culpa alias modi quo tempora tenetur exercitationem nam!</p>
                        <div className="preorder-button">
                            <span>Preorder</span>
                            <FaArrowRight />
                        </div>
                    </div>

                    <div className="specs-detail">
                        <p>Specs</p>
                        <div className="specs-detail__info">
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                            </ul>
                        </div>
                    </div>
                </section> 

                <section className="image">
                    <div>{/* image 1 */}</div>
                    <div>{/* image 2 */}</div>
                    <div>{/* image 3 */}</div>
                </section> 

                <section ref={el => { refList.current[3] = el}}  className="preorder">
                    <div>Preorder now on kickstarter for <span>$129</span></div>
                    <div className="preorder-button">
                        <span>Preorder</span>
                        <FaArrowRight />
                    </div>
                    <h1>preorder</h1>
                </section>    
            </main>

            <footer>
                <div>Developed by</div>
                <div>
                    <h1>enogiomwanetinosafavour@gmail.com</h1>
                    <span>click to copy</span>
                </div>
                <div>
                    <FaGithub />
                    <FaLinkedin />
                    <FaInstagram />
                </div>
            </footer>

            <Canvas
                style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none' }}
                eventSource={typeof window !== 'undefined' ? document.getElementById('root') as HTMLDivElement : undefined}
            >
                <View.Port />
                <Preload all />
            </Canvas>
        </div>
    );
}

// https://codesandbox.io/p/sandbox/view-tracking-forked-gs7c66?file=%2Fsrc%2FApp.js%3A57%2C84
// https://codesandbox.io/p/sandbox/multiple-views-with-uniform-controls-r9w2ob?file=%2Fsrc%2FApp.js%3A29%2C9

const GetSpeakers = ({ locations }: {
    locations: { position: number[], rotation: number[], texture: THREE.Texture }[]
}) => {
    console.log(locations[0].texture)
    return (
        <></>
    )
}