const ORDER = 4;
const SIDE = 1 << ORDER;
const VIEWBOX_SIZE = 100;
const MARGIN = 12;

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

function createPath() {
    const total = SIDE * SIDE;
    const drawable = VIEWBOX_SIZE - 2 * MARGIN;

    return Array.from({length: total}, (_, d) => {
        const [x, y] = d2xy(SIDE, d);
        const px = MARGIN + (x / (SIDE - 1)) * drawable;
        const py = MARGIN + (y / (SIDE - 1)) * drawable;
        return `${d === 0 ? "M" : "L"}${px.toFixed(2)} ${py.toFixed(2)}`;
    }).join(" ");
}

const PATH = createPath();

export function CubeLogo({
                             size = 34,
                             className = "",
                         }: {
    size?: number;
    className?: string;
}) {
    return (
        <svg
            aria-hidden
            width={size}
            height={size}
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className={className}
            fill="none"
        >
            <rect
                width={VIEWBOX_SIZE}
                height={VIEWBOX_SIZE}
                rx="3"
                fill="#ffffff"
            />
            <path
                d={PATH}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
            />
        </svg>
    );
}
