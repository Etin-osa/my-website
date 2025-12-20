"use client";

import { useTransitionRouter } from "next-view-transitions";
import React from "react";

export default function Project() {
    const router = useTransitionRouter() 

    function slideInOut() {
        document.documentElement.animate(
            [
                { transform: 'translateY(0vh)' },
                { transform: 'translateY(-100vh)' },
            ],
            {
                duration: 700,
                easing: 'cubic-bezier(.07,.51,.18,.91)',
                pseudoElement: '::view-transition-old(root)',
            }
        )

        document.documentElement.animate(
            [
                { transform: 'translateY(100vh)' },
                { transform: 'translateY(0vh)', },
            ],
            {
                duration: 700,
                easing: 'cubic-bezier(.07,.51,.18,.91)',
                pseudoElement: '::view-transition-new(root)',
            }
        )
    }

    return (
        <main style={{ backgroundColor: 'black' }}>
            <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                <section style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#152980ff', borderRadius: '20px', color: 'white' }}>
                    <h1 style={{ fontSize: '6.5rem', fontWeight: 'bold', margin: 0 }}>Project page</h1>
                    <button onClick={() => router.push("/new", { onTransitionReady: slideInOut })} style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: 'white', color: '#152980ff' }}>
                        Go to New
                    </button>
                </section>
            </div>
        </main>
    )
}
