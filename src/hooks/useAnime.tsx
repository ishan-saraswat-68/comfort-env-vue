import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Custom hook for anime.js animations in React
 * Automatically cleans up animations on unmount
 */
export const useAnime = (
    callback: (el: HTMLElement) => any,
    dependencies: any[] = []
) => {
    const ref = useRef<HTMLElement>(null);
    const animationRef = useRef<any>(null);

    useEffect(() => {
        if (ref.current) {
            const result = callback(ref.current);
            if (result) {
                animationRef.current = result;
            }
        }

        return () => {
            if (animationRef.current && animationRef.current.pause) {
                animationRef.current.pause();
            }
        };
    }, dependencies);

    return ref;
};
