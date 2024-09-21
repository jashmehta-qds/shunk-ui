"use client"

import { colors } from "@/constants/colors";
import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

const AnimatedStar: React.FC = () => {
    const [selected, setSelected] = useState(false);
    return <div>
        {!selected ? <IoStarOutline color={colors.clrIndigo} onClick={() => setSelected(true)} /> :
            <IoStar onClick={() => setSelected(false)} className={`text-transparent stroke-current stroke-2 text-indigo-60 animate-fillStar`} />}
    </div>
}

export default AnimatedStar;