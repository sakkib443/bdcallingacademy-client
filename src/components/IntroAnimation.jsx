"use client";

import { useState, useEffect, useRef } from "react";
import { LuBrain, LuCpu, LuNetwork, LuZap, LuSparkles, LuBot, LuCode, LuServer, LuGlobe, LuLayers, LuMonitor, LuWifi } from "react-icons/lu";

const IntroAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const hasCompletedRef = useRef(false);
    const progressIntervalRef = useRef(null);

    useEffect(() => {
        if (hasCompletedRef.current) return;

        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 300);
        const t3 = setTimeout(() => setPhase(3), 600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    useEffect(() => {
        if (phase < 3 || hasCompletedRef.current) return;

        let currentProgress = 0;

        progressIntervalRef.current = setInterval(() => {
            if (hasCompletedRef.current) {
                clearInterval(progressIntervalRef.current);
                return;
            }

            const speed = currentProgress < 30 ? 3 : currentProgress < 70 ? 2 : currentProgress < 95 ? 1 : 5;
            currentProgress += speed;

            if (currentProgress >= 100) {
                currentProgress = 100;
                setProgress(100);

                if (!hasCompletedRef.current) {
                    hasCompletedRef.current = true;
                    clearInterval(progressIntervalRef.current);

                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(() => {
                            onComplete && onComplete();
                        }, 500);
                    }, 300);
                }
            } else {
                setProgress(currentProgress);
            }
        }, 35);

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [phase, onComplete]);

    // Removed early return to allow fadeOut animation to play
    // if (isExiting && progress >= 100) {
    //     return null;
    // }

    // Orbiting icons data
    const orbitIcons = [
        { Icon: LuCpu, color: '#41bfb8', angle: 0 },
        { Icon: LuNetwork, color: '#F79952', angle: 60 },
        { Icon: LuCode, color: '#41bfb8', angle: 120 },
        { Icon: LuServer, color: '#F79952', angle: 180 },
        { Icon: LuGlobe, color: '#41bfb8', angle: 240 },
        { Icon: LuLayers, color: '#F79952', angle: 300 },
    ];

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ${isExiting ? 'animate-fadeOut' : ''}`}
            style={{
                background: 'radial-gradient(ellipse at center, #0d1a2d 0%, #060c14 100%)',
            }}
        >
            {/* Subtle Stars Background - No Flickering */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/30"
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            opacity: phase >= 1 ? 0.3 : 0,
                            transition: 'opacity 1s ease-in',
                        }}
                    />
                ))}
            </div>

            {/* AI Grid Network */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(65, 191, 184, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(65, 191, 184, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    transform: phase >= 1 ? 'perspective(500px) rotateX(60deg)' : 'perspective(500px) rotateX(90deg)',
                    transformOrigin: 'center top',
                    transition: 'transform 1s ease-out',
                }}
            />

            {/* Radial Glow - Smooth, no flicker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="absolute w-[500px] h-[500px] rounded-full transition-all duration-1000"
                    style={{
                        background: 'radial-gradient(circle, rgba(65, 191, 184, 0.12) 0%, transparent 60%)',
                        opacity: phase >= 2 ? 1 : 0,
                    }}
                />
                <div
                    className="absolute w-[350px] h-[350px] rounded-full transition-all duration-1000"
                    style={{
                        background: 'radial-gradient(circle, rgba(247, 153, 82, 0.08) 0%, transparent 60%)',
                        opacity: phase >= 2 ? 1 : 0,
                    }}
                />
            </div>

            {/* Floating Particles - Smooth movement */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-[#41bfb8]/50' : 'bg-[#F79952]/50'}`}
                        style={{
                            left: `${15 + (i % 4) * 20}%`,
                            top: `${20 + Math.floor(i / 4) * 25}%`,
                            opacity: phase >= 2 ? 0.5 : 0,
                            transition: 'opacity 0.8s ease-in',
                            animation: phase >= 2 ? `float-smooth ${8 + i}s ease-in-out infinite` : 'none',
                        }}
                    />
                ))}
            </div>

            {/* Neural Connection Lines - Smooth flow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: phase >= 2 ? 0.5 : 0, transition: 'opacity 0.8s' }}>
                <defs>
                    <linearGradient id="lineGradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#41bfb8" stopOpacity="0" />
                        <stop offset="50%" stopColor="#41bfb8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#41bfb8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F79952" stopOpacity="0" />
                        <stop offset="50%" stopColor="#F79952" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F79952" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Horizontal flowing lines - Slower, smoother */}
                {[...Array(3)].map((_, i) => (
                    <line
                        key={`h-line-${i}`}
                        x1="0%"
                        y1={`${30 + i * 20}%`}
                        x2="100%"
                        y2={`${30 + i * 20}%`}
                        stroke={i % 2 === 0 ? "url(#lineGradTeal)" : "url(#lineGradOrange)"}
                        strokeWidth="1"
                        style={{
                            strokeDasharray: '30,60',
                            animation: `data-flow-smooth ${8 + i * 2}s linear infinite`,
                        }}
                    />
                ))}

                {/* Radial lines from center - Static, no flicker */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const endX = 50 + Math.cos(angle) * 40;
                    const endY = 50 + Math.sin(angle) * 40;
                    return (
                        <line
                            key={`r-line-${i}`}
                            x1="50%"
                            y1="50%"
                            x2={`${endX}%`}
                            y2={`${endY}%`}
                            stroke={i % 2 === 0 ? "#41bfb8" : "#F79952"}
                            strokeWidth="0.5"
                            strokeOpacity="0.2"
                        />
                    );
                })}
            </svg>

            {/* Main Content */}
            <div className={`relative z-10 flex flex-col items-center px-4 transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>

                {/* Rings Container */}
                <div className="relative">
                    {/* Outer ring - Slow spin */}
                    <div
                        className={`absolute inset-0 -m-[105px] rounded-full border border-[#41bfb8]/20 transition-opacity duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            animation: phase >= 2 ? 'spin-very-slow 30s linear infinite' : 'none',
                        }}
                    />

                    {/* Middle ring - Opposite spin */}
                    <div
                        className={`absolute inset-0 -m-[65px] rounded-full border border-[#F79952]/20 transition-opacity duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            animation: phase >= 2 ? 'spin-very-slow 25s linear infinite reverse' : 'none',
                        }}
                    />

                    {/* Orbiting Icons Container - Rotates all icons */}
                    <div
                        className={`absolute transition-opacity duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            width: '266px',
                            height: '266px',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            animation: phase >= 2 ? 'orbit-rotate 15s linear infinite' : 'none',
                        }}
                    >
                        {orbitIcons.map(({ Icon, color, angle }, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const radius = 133;
                            return (
                                <div
                                    key={i}
                                    className="absolute w-7 h-7 rounded-md flex items-center justify-center"
                                    style={{
                                        left: `calc(50% + ${Math.cos(rad) * radius}px - 14px)`,
                                        top: `calc(50% + ${Math.sin(rad) * radius}px - 14px)`,
                                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                                        boxShadow: `0 0 12px ${color}40`,
                                        animation: phase >= 2 ? 'counter-rotate 15s linear infinite' : 'none',
                                    }}
                                >
                                    <Icon className="text-white text-sm" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Central Brain Container */}
                    <div className="relative">
                        {/* Soft glow behind */}
                        <div
                            className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#41bfb8]/20 to-[#F79952]/20 blur-xl transition-opacity duration-500"
                            style={{ opacity: phase >= 2 ? 1 : 0 }}
                        />

                        {/* Main brain circle */}
                        <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-[#41bfb8] via-[#26a69a] to-[#F79952]">
                            <div className="w-full h-full rounded-full bg-[#0d1a2d] flex items-center justify-center">
                                <LuBrain
                                    className={`text-4xl transition-colors duration-700 ${phase >= 2 ? 'text-[#41bfb8]' : 'text-gray-600'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academy Branding */}
                <div className={`mt-36 text-center transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <LuSparkles className="text-[#41bfb8] text-lg" />
                        <h1 className="text-3xl font-bold outfit tracking-wide">
                            <span className="text-[#41bfb8]">Bd</span>
                            <span className="text-[#F79952]">calling</span>
                            <span className="text-white"> Academy</span>
                        </h1>
                        <LuSparkles className="text-[#F79952] text-lg" />
                    </div>
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                        <LuMonitor className="text-[#41bfb8] text-xs" />
                        <span className="tracking-widest">AI-POWERED LEARNING PLATFORM</span>
                        <LuWifi className="text-[#F79952] text-xs" />
                    </p>
                </div>

                {/* Progress Section */}
                <div className={`mt-8 w-full max-w-sm transition-all duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>

                    {/* Percentage with Icon - No bounce */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <LuBot className="text-[#41bfb8] text-2xl" />
                        <span className="text-5xl font-bold outfit bg-gradient-to-r from-[#41bfb8] via-white to-[#F79952] bg-clip-text text-transparent">
                            {Math.min(progress, 100)}%
                        </span>
                        <LuZap className="text-[#F79952] text-2xl" />
                    </div>

                    {/* Status Text - No animations on emoji */}
                    <p className="text-gray-300 text-sm text-center mb-4 h-5 flex items-center justify-center gap-2">
                        {progress < 25 && <>⚡ Initializing AI Core Systems...</>}
                        {progress >= 25 && progress < 50 && <>🧠 Training Neural Networks...</>}
                        {progress >= 50 && progress < 75 && <>🚀 Loading Smart Modules...</>}
                        {progress >= 75 && progress < 100 && <>✨ Preparing Your Experience...</>}
                        {progress >= 100 && <>🎉 Welcome to the Future of Learning!</>}
                    </p>

                    {/* Progress Bar - Smooth fill */}
                    <div className="relative w-full h-3 bg-[#1a2a40] rounded-full overflow-hidden border border-[#41bfb8]/20">
                        {/* Progress fill - Smooth gradient */}
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, #41bfb8, #26a69a, #F79952)',
                                transition: 'width 0.15s ease-out',
                            }}
                        />
                    </div>

                    {/* Progress Milestones */}
                    <div className="flex justify-between mt-2 px-1">
                        {[0, 25, 50, 75, 100].map((milestone) => (
                            <div key={milestone} className="flex flex-col items-center">
                                <div
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${progress >= milestone
                                        ? 'bg-[#41bfb8]'
                                        : 'bg-gray-700'
                                        }`}
                                />
                                <span className={`text-[10px] mt-1 transition-colors duration-500 ${progress >= milestone ? 'text-[#41bfb8]' : 'text-gray-600'}`}>
                                    {milestone}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner Tech Decorations - Static, no animation */}
            <div className={`absolute top-4 left-4 transition-opacity duration-700 ${phase >= 2 ? 'opacity-60' : 'opacity-0'}`}>
                <div className="flex items-start gap-1">
                    <div className="w-10 h-[1px] bg-gradient-to-r from-[#41bfb8] to-transparent" />
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#41bfb8] to-transparent -mt-[1px] -ml-[1px]" />
                </div>
                <LuCode className="text-[#41bfb8]/30 text-sm mt-2" />
            </div>
            <div className={`absolute top-4 right-4 transition-opacity duration-700 ${phase >= 2 ? 'opacity-60' : 'opacity-0'}`}>
                <div className="flex items-start justify-end gap-1">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#F79952] to-transparent" />
                    <div className="w-10 h-[1px] bg-gradient-to-l from-[#F79952] to-transparent -ml-[1px]" />
                </div>
                <div className="flex justify-end mt-2">
                    <LuServer className="text-[#F79952]/30 text-sm" />
                </div>
            </div>
            <div className={`absolute bottom-4 left-4 transition-opacity duration-700 ${phase >= 2 ? 'opacity-60' : 'opacity-0'}`}>
                <LuNetwork className="text-[#F79952]/30 text-sm mb-2" />
                <div className="flex items-end gap-1">
                    <div className="w-[1px] h-10 bg-gradient-to-t from-[#F79952] to-transparent" />
                    <div className="w-10 h-[1px] bg-gradient-to-r from-[#F79952] to-transparent -ml-[1px] -mb-[1px]" />
                </div>
            </div>
            <div className={`absolute bottom-4 right-4 transition-opacity duration-700 ${phase >= 2 ? 'opacity-60' : 'opacity-0'}`}>
                <div className="flex justify-end mb-2">
                    <LuGlobe className="text-[#41bfb8]/30 text-sm" />
                </div>
                <div className="flex items-end justify-end gap-1">
                    <div className="w-10 h-[1px] bg-gradient-to-l from-[#41bfb8] to-transparent" />
                    <div className="w-[1px] h-10 bg-gradient-to-t from-[#41bfb8] to-transparent -ml-[1px] -mb-[1px]" />
                </div>
            </div>

            {/* Bottom tech text - Static */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-opacity duration-700 ${phase >= 3 ? 'opacity-50' : 'opacity-0'}`}>
                <span className="text-[10px] text-gray-500 tracking-widest">NEURAL_NET.v2.0</span>
                <span className="w-1 h-1 rounded-full bg-[#41bfb8]/50" />
                <span className="text-[10px] text-gray-500 tracking-widest">AI_CORE.ACTIVE</span>
                <span className="w-1 h-1 rounded-full bg-[#F79952]/50" />
                <span className="text-[10px] text-gray-500 tracking-widest">SYS.READY</span>
            </div>

            <style jsx>{`
                @keyframes float-smooth {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes data-flow-smooth {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -90; }
                }
                @keyframes spin-very-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes orbit-rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes counter-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes fadeOut {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(1.02); }
                }
                .animate-fadeOut {
                    animation: fadeOut 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default IntroAnimation;
