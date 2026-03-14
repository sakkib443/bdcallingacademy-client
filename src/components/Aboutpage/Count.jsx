"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import { LuUsers, LuBookOpen, LuAward, LuBriefcase, LuGraduationCap, LuTrendingUp } from "react-icons/lu";

const Count = () => {
    const [counters, setCounters] = useState([]);

    useEffect(() => {
        fetch("/Data/Count.json")
            .then(res => res.json())
            .then(data => setCounters(data))
            .catch(err => console.error("Failed to load count.json", err));
    }, []);

    const getIconComponent = (iconName) => {
        return FaIcons[iconName] || HiIcons[iconName] || FaIcons.FaRegQuestionCircle;
    };

    const AnimatedCounter = ({ target, suffix = "" }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const parsedTarget = Number(target);
            if (isNaN(parsedTarget)) return;

            let start = 0;
            const duration = 2000;
            const increment = Math.ceil(parsedTarget / 60);
            const stepTime = Math.floor(duration / (parsedTarget / increment));

            const counter = setInterval(() => {
                start += increment;
                if (start >= parsedTarget) {
                    setCount(parsedTarget);
                    clearInterval(counter);
                } else {
                    setCount(start);
                }
            }, stepTime);

            return () => clearInterval(counter);
        }, [target]);

        return <span>{count.toLocaleString()}{suffix}</span>;
    };

    // Colors for each stat
    const colors = ['#41bfb8', '#F79952', '#8B5CF6', '#EC4899', '#10B981', '#3B82F6'];

    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 lg:px-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {counters.map((item, index) => {
                        const Icon = getIconComponent(item?.icon);
                        const color = colors[index % colors.length];

                        return (
                            <div
                                key={index}
                                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-md p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${color}15` }}
                                >
                                    <Icon className="text-2xl" style={{ color: color }} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 outfit">
                                    <AnimatedCounter target={item?.count} suffix={item?.suffix || ""} />
                                </h2>
                                <p className="text-sm text-gray-500 work mt-1">{item?.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Count;
