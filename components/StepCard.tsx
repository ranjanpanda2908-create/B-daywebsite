
import React, { useRef, useEffect } from 'react';
import { type StepContent } from '../constants';
import { gsap } from 'gsap';

interface StepCardProps {
    stepData: StepContent;
    onNext: () => void;
    isFinale: boolean;
}

const Polaroid: React.FC<{ image: string, caption: string }> = ({ image, caption }) => {
    const polaroidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = polaroidRef.current;
        if (!el) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - left - width / 2) / (width / 2);
            const y = (clientY - top - height / 2) / (height / 2);

            gsap.to(el, {
                rotationY: x * 10,
                rotationX: -y * 10,
                transformPerspective: 1000,
                ease: "power1.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                ease: "power1.out"
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (el) {
                el.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={polaroidRef} className="relative w-48 sm:w-64 bg-white p-3 pb-12 rounded-md shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <img src={image} alt="Shared memory" className="w-full h-auto" />
            <p className="absolute bottom-3 left-3 right-3 text-center text-gray-800 font-serif text-sm">{caption}</p>
        </div>
    );
};

export const StepCard: React.FC<StepCardProps> = ({ stepData, onNext, isFinale }) => {
    const { icon, headline, paragraph, buttonText, bentoGrid, memory, finalMessage } = stepData;

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-center flex flex-col items-center">
            {icon && <div className="text-5xl sm:text-6xl mb-4 animate-pulse-glow">{icon}</div>}
            
            <h1 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-300 via-white to-pink-200 text-transparent bg-clip-text mb-4">
                {headline}
            </h1>

            {paragraph && <p className="text-gray-300 mb-8 max-w-prose">{paragraph}</p>}

            {bentoGrid && (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-left">
                    {bentoGrid.map((item, index) => (
                        <div key={index} className={`bg-white/5 p-4 rounded-xl border border-white/10 ${item.className}`}>
                            <h3 className="font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.text}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {memory && (
                <div className="mb-8 flex justify-center">
                    <Polaroid image={memory.image} caption={memory.caption} />
                </div>
            )}
            
            {isFinale && finalMessage && (
                 <p className="final-text opacity-0 text-2xl font-bold text-white mb-8">{finalMessage}</p>
            )}

            <button
                onClick={onNext}
                className="celebrate-btn relative inline-block px-10 py-3 font-bold text-white rounded-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 active:scale-95 shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]"
            >
                {buttonText}
            </button>
        </div>
    );
};
