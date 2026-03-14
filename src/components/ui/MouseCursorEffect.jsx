"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MouseCursorEffect() {
    const [particles, setParticles] = useState([]);

    // Magical Palette (Gold, Pink, Orange)
    const colors = [
        "#FFD700", // Gold
        "#FFB6C1", // LightPink
        "#FF69B4", // HotPink
        "#FFA500", // Orange
    ];

    const createParticle = (x, y, isBurst = false) => {
        const id = Math.random().toString(36).substr(2, 9);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * (isBurst ? 8 : 4) + 2;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * (isBurst ? 60 : 20) + (isBurst ? 20 : 5);
        const xDist = Math.cos(angle) * velocity;
        const yDist = Math.sin(angle) * velocity;
        const duration = Math.random() * 0.5 + 0.5;

        return {
            id,
            x,
            y,
            color,
            size,
            xDist,
            yDist,
            duration,
            isBurst
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            // 10% chance to spawn trail
            if (Math.random() > 0.9) {
                setParticles((prev) => {
                    const newParticle = createParticle(e.clientX, e.clientY, false);
                    return [...prev.slice(-20), newParticle];
                });
            }
        };

        const handleClick = (e) => {
            // Burst
            const burstCount = 6;
            const newParticles = [];
            for (let i = 0; i < burstCount; i++) {
                newParticles.push(createParticle(e.clientX, e.clientY, true));
            }
            setParticles((prev) => [...prev.slice(-40), ...newParticles]);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const removeParticle = (id) => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-[99999]">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{
                            x: p.x - p.size / 2,
                            y: p.y - p.size / 2,
                            opacity: 1,
                            scale: 0.5,
                        }}
                        animate={{
                            x: p.x + p.xDist,
                            y: p.y + p.yDist,
                            opacity: 0,
                            scale: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: p.duration, ease: "easeOut" }}
                        onAnimationComplete={() => removeParticle(p.id)}
                        style={{
                            position: "absolute",
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            borderRadius: "50%",
                            boxShadow: `0 0 ${p.size}px ${p.color}`,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
