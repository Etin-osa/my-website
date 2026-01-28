"use client";

import React, { useEffect, useRef } from 'react';

export default function MagneticDotsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let dots: Dot[] = [];
        const mouse = { x: -1000, y: -1000 };
        
        const spacing = 15;
        const radius = 200;
        const pullStrength = 0.12;
        const dotSize = 1.5;
        const baseColor = 'rgba(255, 255, 255, 0.06)';

        class Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;
            color: string;
            
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.color = baseColor;
            }

            update() {
                const dx = mouse.x - this.originX;
                const dy = mouse.y - this.originY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let targetX = this.originX;
                let targetY = this.originY;

                if (distance < radius) {
                    const factor = (radius - distance) / radius;
                    
                    const pull = factor * pullStrength * 100;
                    const angle = Math.atan2(dy, dx);
                    
                    targetX = this.originX + Math.cos(angle) * pull;
                    targetY = this.originY + Math.sin(angle) * pull;

                    const opacity = 0.06 + (0.65 * factor);
                    this.color = `rgba(255, 255, 255, ${opacity})`;
                } else {
                    this.color = baseColor;
                }

                this.x += (targetX - this.x) * 0.1;
                this.y += (targetY - this.y) * 0.1;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = this.color;
                context.beginPath();
                context.arc(this.x, this.y, dotSize, 0, Math.PI * 2);
                context.fill();
            }
        }

        const handleResize = () => {
            const rect = container.getBoundingClientRect();

            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            
            ctx.scale(dpr, dpr);
            
            dots = [];
            for (let x = 0; x < rect.width; x += spacing) {
                for (let y = 0; y < rect.height; y += spacing) {
                    dots.push(new Dot(x + spacing/2, y + spacing/2));
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            dots.forEach(dot => {
                dot.update();
                dot.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                overflow: 'hidden',
                borderRadius: 'inherit'
            }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ 
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }} 
            />
        </div>
    );
}
