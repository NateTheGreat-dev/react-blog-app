import { useState, useEffect } from "react";

export default function Slideshow({ images, interval = 4000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval)
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="slideshow">
            <img src={images[index]} alt={`Slide ${index + 1}`} />
        </div>
    );
}