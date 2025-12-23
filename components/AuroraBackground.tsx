
import React from 'react';

export const AuroraBackground: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
            <div className="relative w-full h-full">
                {/* Pink */}
                <div className="absolute top-1/4 left-1/4 w-[50vmin] h-[50vmin] bg-[radial-gradient(circle_at_center,_hsla(333,70%,55%,.4)_0,transparent_100%)] animate-aurora [--tw-translate-x-0:-50vw] [--tw-translate-y-0:-50vh] [--tw-translate-x-1:50vw] [--tw-translate-y-1:50vh] [--tw-translate-x-2:-50vw] [--tw-translate-y-2:50vh]"></div>
                {/* Purple */}
                <div className="absolute top-1/2 left-3/4 w-[60vmin] h-[60vmin] bg-[radial-gradient(circle_at_center,_hsla(282,82%,54%,.3)_0,transparent_100%)] animate-aurora animation-delay-3000ms [--tw-translate-x-0:50vw] [--tw-translate-y-0:50vh] [--tw-translate-x-1:-50vw] [--tw-translate-y-1:-50vh] [--tw-translate-x-2:50vw] [--tw-translate-y-2:-50vh]"></div>
                {/* Blue */}
                <div className="absolute top-3/4 left-1/4 w-[50vmin] h-[50vmin] bg-[radial-gradient(circle_at_center,_hsla(210,89%,60%,.3)_0,transparent_100%)] animate-aurora animation-delay-6000ms [--tw-translate-x-0:50vw] [--tw-translate-y-0:-50vh] [--tw-translate-x-1:-50vw] [--tw-translate-y-1:50vh] [--tw-translate-x-2:50vw] [--tw-translate-y-2:50vh]"></div>
                {/* Gold */}
                <div className="absolute top-1/4 left-3/4 w-[40vmin] h-[40vmin] bg-[radial-gradient(circle_at_center,_hsla(35,90%,60%,.3)_0,transparent_100%)] animate-aurora animation-delay-9000ms [--tw-translate-x-0:-20vw] [--tw-translate-y-0:30vh] [--tw-translate-x-1:20vw] [--tw-translate-y-1:-30vh] [--tw-translate-x-2:-20vw] [--tw-translate-y-2:30vh]"></div>
            </div>
        </div>
    );
};
