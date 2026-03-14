"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Container variants for staggered children animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

// Individual item animation variants
const itemVariants = {
    // Fade up animation
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    },
    // Fade in animation
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    },
    // Scale up animation
    scaleUp: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    },
    // Slide from left
    slideLeft: {
        hidden: { opacity: 0, x: -80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    },
    // Slide from right
    slideRight: {
        hidden: { opacity: 0, x: 80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    },
    // Blur reveal
    blur: {
        hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    },
    // Zoom in with bounce
    zoomBounce: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    },
    // Rotate in
    rotateIn: {
        hidden: { opacity: 0, rotate: -8, scale: 0.9 },
        visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    },
    // 3D flip
    flip: {
        hidden: { opacity: 0, rotateX: 60, y: 40 },
        visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    },
    // Pop in effect
    pop: {
        hidden: { opacity: 0, scale: 0.6, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    },
};

// Main container component that staggers all children
export const AnimatedContainer = ({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: once,
        amount: threshold,
        margin: "-50px 0px",
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Individual animated item component
export const AnimatedItem = ({
    children,
    variant = "fadeUp",
    className = "",
    delay = 0,
    custom,
}) => {
    const selectedVariant = itemVariants[variant] || itemVariants.fadeUp;

    // Create a modified variant with custom delay
    const modifiedVariant = {
        hidden: selectedVariant.hidden,
        visible: {
            ...selectedVariant.visible,
            transition: {
                ...selectedVariant.visible.transition,
                delay: delay,
            },
        },
    };

    return (
        <motion.div
            variants={modifiedVariant}
            className={className}
            style={{ willChange: "transform, opacity, filter" }}
        >
            {children}
        </motion.div>
    );
};

// Self-contained animated element (triggers on scroll independently)
export const AnimatedElement = ({
    children,
    variant = "fadeUp",
    className = "",
    delay = 0,
    threshold = 0.2,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: once,
        amount: threshold,
        margin: "-80px 0px",
    });

    const selectedVariant = itemVariants[variant] || itemVariants.fadeUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: selectedVariant.hidden,
                visible: {
                    ...selectedVariant.visible,
                    transition: {
                        ...selectedVariant.visible.transition,
                        delay: delay,
                    },
                },
            }}
            className={className}
            style={{ willChange: "transform, opacity, filter" }}
        >
            {children}
        </motion.div>
    );
};

// Grid/List stagger container - for cards and list items
export const StaggerContainer = ({
    children,
    className = "",
    staggerDelay = 0.08,
    threshold = 0.1,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: once,
        amount: threshold,
        margin: "-50px 0px",
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Staggered child item for grids
export const StaggerItem = ({
    children,
    variant = "fadeUp",
    className = "",
    index = 0,
}) => {
    const selectedVariant = itemVariants[variant] || itemVariants.fadeUp;

    return (
        <motion.div
            variants={selectedVariant}
            className={className}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
};

// Text reveal animation (character by character or word by word)
export const TextReveal = ({
    children,
    className = "",
    type = "words", // "words" or "chars"
    delay = 0,
    threshold = 0.3,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: threshold,
    });

    const text = typeof children === "string" ? children : "";
    const items = type === "words" ? text.split(" ") : text.split("");

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: type === "words" ? 0.08 : 0.03,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
            style={{ display: "inline-block" }}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            },
                        },
                    }}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {item}
                    {type === "words" && index < items.length - 1 ? " " : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Number counter animation
export const AnimatedCounter = ({
    value,
    duration = 2,
    className = "",
    suffix = "",
    prefix = "",
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        >
            {isInView && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {prefix}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {value}
                    </motion.span>
                    {suffix}
                </motion.span>
            )}
        </motion.span>
    );
};

export default {
    AnimatedContainer,
    AnimatedItem,
    AnimatedElement,
    StaggerContainer,
    StaggerItem,
    TextReveal,
    AnimatedCounter,
};
