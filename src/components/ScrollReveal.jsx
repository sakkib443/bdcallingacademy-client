"use client";

import { motion } from "framer-motion";

// Animation variants with smooth transitions
const allVariants = {
    slideUp: {
        hidden: { opacity: 0, y: 80 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    },
    slideDown: {
        hidden: { opacity: 0, y: -80 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: (delay) => ({
            opacity: 1,
            transition: {
                duration: 1,
                delay: delay,
                ease: "easeInOut",
            },
        }),
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: (delay) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: delay,
                ease: [0.34, 1.56, 0.64, 1],
            },
        }),
    },
    slideLeft: {
        hidden: { opacity: 0, x: -100 },
        visible: (delay) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    },
    slideRight: {
        hidden: { opacity: 0, x: 100 },
        visible: (delay) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    },
    rotateIn: {
        hidden: { opacity: 0, rotate: -10, scale: 0.9 },
        visible: (delay) => ({
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
        visible: (delay) => ({
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.9,
                delay: delay,
                ease: "easeOut",
            },
        }),
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: (delay) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.34, 1.56, 0.64, 1],
            },
        }),
    },
    flipUp: {
        hidden: { opacity: 0, rotateX: 90 },
        visible: (delay) => ({
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: "easeOut",
            },
        }),
    },
};

const ScrollReveal = ({
    children,
    variant = "slideUp",
    className = "",
    delay = 0,
    threshold = 0.1,
    once = true,
}) => {
    const selectedVariant = allVariants[variant] || allVariants.slideUp;

    return (
        <motion.div
            variants={selectedVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: once, amount: threshold, margin: "-100px" }}
            custom={delay}
            className={className}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
