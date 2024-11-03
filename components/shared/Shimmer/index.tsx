"use client"

import { CSSProperties } from "react";

interface Props {
    width: number;
    height: number;
    isRounded?: boolean;
    customStyle?: string;
}

const Shimmer: React.FC<Props> = ({ width, height, isRounded, customStyle }) => {
    return <div role="status" className={`animate-pulse h-[${height}px] w-[${width}px] overflow-hidden ${customStyle}`}>
        <div style={{height, width}} className={`h-[${height}px] w-[${width}px] bg-gray-300 ${isRounded ? "rounded-full" : ""}`}></div>
    </div>
}

export default Shimmer;