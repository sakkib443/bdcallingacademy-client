"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const VideoModal = ({ selectedVideo, onClose, bengaliClass = "" }) => {
    const [mounted, setMounted] = useState(false);
    const [portalContainer, setPortalContainer] = useState(null);

    useEffect(() => {
        // Create or get portal container
        let container = document.getElementById("video-modal-portal");
        if (!container) {
            container = document.createElement("div");
            container.id = "video-modal-portal";
            document.body.appendChild(container);
        }
        setPortalContainer(container);
        setMounted(true);

        return () => {
            // Cleanup portal container on unmount
            if (container && container.parentNode && !container.hasChildNodes()) {
                container.parentNode.removeChild(container);
            }
        };
    }, []);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedVideo) {
            // Save current scroll position
            const scrollY = window.scrollY;

            // Lock body scroll
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
            }
        }

        return () => {
            // Cleanup on unmount
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
            }
        };
    }, [selectedVideo]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && selectedVideo) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [selectedVideo, onClose]);

    if (!mounted || !selectedVideo || !portalContainer) return null;

    const modalContent = (
        <div
            id="video-modal-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.92)",
                backdropFilter: "blur(8px)",
                zIndex: 999999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box",
            }}
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "900px",
                    maxHeight: "90vh",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "-50px",
                        right: "0",
                        width: "44px",
                        height: "44px",
                        backgroundColor: "rgba(255,255,255,0.15)",
                        border: "none",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                >
                    <HiXMark style={{ width: "28px", height: "28px", color: "white", pointerEvents: "none" }} />
                </button>

                {/* Video */}
                <div
                    style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        backgroundColor: "black",
                    }}
                >
                    <div style={{ aspectRatio: "16/9", width: "100%" }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            style={{ width: "100%", height: "100%", display: "block" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, portalContainer);
};

export default VideoModal;

