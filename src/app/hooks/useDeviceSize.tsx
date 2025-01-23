import { useState, useEffect } from 'react';

export default function useDeviceSize() {
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: viewportSize.width < 768,
        isTablet: viewportSize.width < 1024,
        isDesktop: viewportSize.width < 1300,
        isLargeDesktop: viewportSize.width >= 1300,
    }
}