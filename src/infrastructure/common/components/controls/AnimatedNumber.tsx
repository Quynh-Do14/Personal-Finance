import React, { useState, useEffect } from "react";
import '../../../../assets/styles/components/animation.css'
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.ceil(value / 100);
        const interval = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(start);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [value]);

    return <span className="animated-number">{displayValue.toLocaleString()} ₫</span>;
};

export default AnimatedNumber;