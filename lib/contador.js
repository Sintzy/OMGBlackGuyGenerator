"use client";

import { useState, useEffect } from "react";

export default function Contador() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(0);

    useEffect(() => {
        async function fetchCount() {
            const res = await fetch("/api/contador");
            const data = await res.json();
            setTarget(data.total);
        }

        fetchCount();
    }, []);

    useEffect(() => {
        if (target === 0) return;

        let start = 0;
        const end = target;
        const duration = 1000;
        const steps = 60;
        const increment = end / steps;
        const intervalTime = duration / steps;

        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(counter);
            }
            setCount(Math.floor(start));
        }, intervalTime);

        return () => clearInterval(counter);
    }, [target]);

    return (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 border border-dashed border-gray-600 p-6 text-center rounded-xl bg-gray-800 glass w-[90%] max-w-xl shadow-xl z-40">
            <p className="text-3xl font-extrabold text-white">
                {count.toLocaleString()}{" "}
                <span className="text-lg font-medium text-gray-300">generated images</span>
            </p>
        </div>
    );

}