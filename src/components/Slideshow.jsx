import { useState, useEffect } from "react";

//Simple slideshow for images.

export default function Slideshow({ images, interval = 4000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        //Setting the timer.
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval)
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        //Images will be taken from homepage, placed in an index.
        <div className="slideshow">
            <img src={images[index]} alt={`Slide ${index + 1}`} />
        </div>
    );
}