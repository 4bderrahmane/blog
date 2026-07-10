"use client";

import {useEffect, useRef} from "react";

// Masthead art — candidate: a Hilbert space-filling curve. One unbroken line
// recursively fills a square; here the pen draws it on once and leaves the
// completed mark in place. Under prefers-reduced-motion it renders the full
// curve immediately.
const ORDER = 5;
const SIDE = 1 << ORDER; // 32 → 1024 points

// Map a 1D index d to its (x, y) on a Hilbert curve of side n (power of two).
function d2xy(n: number, d: number): [number, number] {
    let t = d;
    let x = 0;
    let y = 0;
    for (let s = 1; s < n; s <<= 1) {
        const rx = 1 & (t >> 1);
        const ry = 1 & (t ^ rx);
        if (ry === 0) {
            if (rx === 1) {
                x = s - 1 - x;
                y = s - 1 - y;
            }
            const tmp = x;
            x = y;
            y = tmp;
        }
        x += s * rx;
        y += s * ry;
        t >>= 2;
    }
    return [x, y];
}

export function HeroArt({size = 190}: { size?: number }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const total = SIDE * SIDE;
        const pts: [number, number][] = [];
        for (let d = 0; d < total; d++) {
            const [x, y] = d2xy(SIDE, d);
            pts.push([x / (SIDE - 1), y / (SIDE - 1)]);
        }

        let width = 0;
        let height = 0;
        let m = 0;
        let idx = 0; // float progress along the curve
        let drawn = 0; // last integer index committed to canvas
        let complete = false;

        const P = (i: number): [number, number] => {
            const [nx, ny] = pts[i];
            return [m + nx * (width - 2 * m), m + ny * (height - 2 * m)];
        };
        const clearBg = () => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
        };
        const drawFullCurve = () => {
            clearBg();
            ctx.strokeStyle = "rgba(10, 10, 10, 0.7)";
            ctx.lineWidth = 1;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.beginPath();
            for (let i = 0; i < total; i++) {
                const [x, y] = P(i);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            m = Math.min(width, height) * 0.08;

            if (complete) {
                drawFullCurve();
                return;
            }

            idx = 0;
            drawn = 0;
            clearBg();
        };
        resize();

        if (reduced) {
            complete = true;
            drawFullCurve();
            return;
        }

        let raf = 0;
        const STEP = total / (5 * 60); // ~5s to draw the whole curve
        const frame = () => {
            idx = Math.min(total - 1, idx + STEP);
            const target = Math.floor(idx);
            if (target > drawn) {
                ctx.strokeStyle = "rgba(10, 10, 10, 0.92)";
                ctx.lineWidth = 1;
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.beginPath();
                const [sx, sy] = P(drawn);
                ctx.moveTo(sx, sy);
                for (let i = drawn + 1; i <= target; i++) {
                    const [x, y] = P(i);
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
                drawn = target;
            }

            if (drawn >= total - 1) {
                complete = true;
                return;
            }

            raf = requestAnimationFrame(frame);
        };

        window.addEventListener("resize", resize);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, [size]);

    return (
        <canvas
            ref={ref}
            aria-hidden
            style={{width: size, height: size, display: "block"}}
        />
    );
}
