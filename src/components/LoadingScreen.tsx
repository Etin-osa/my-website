import { animate } from "motion";
import { useMotionValue, motion, useTransform, cubicBezier, easeInOut } from "motion/react";
import React, { useEffect } from "react";

const textStyle = {
    fontSize: "200px",
    color: "#E1E1E1",
    fontFamily: '"Inter", sans-serif',
    fontOpticalScaling: 'auto',
    fontWeight: 700,
}

export default function LoadingScreen({ setLoading }: { 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        let interval: any = null
    
        const controls = animate(count, 100, { duration: 0.1, ease: cubicBezier(0,.26,.05,.98) })

        controls.finished.then(() => {
            interval = setTimeout(() => {
                setLoading(false)
            }, 500);
        })

        return () => {
            controls.stop()
            clearTimeout(interval)
        }
    }, [])

    return (
        <motion.div 
            key="box"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: .1, ease: easeInOut } }}
            style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100vh", 
                width: "100vw", 
                backgroundColor: "#111111"
            }}
        >
            <motion.pre 
                className="loading-text"
                style={textStyle}
            >
                {rounded}
            </motion.pre>
        </motion.div>
    );
}
