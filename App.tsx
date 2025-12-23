
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { AuroraBackground } from './components/AuroraBackground';
import { ThreeHearts } from './components/ThreeHearts';
import { ProgressBar } from './components/ProgressBar';
import { StepCard } from './components/StepCard';
import { type StepContent, STEPS_DATA } from './constants';

// Make confetti global
declare global {
  interface Window {
    confetti: any;
  }
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFinale, setIsFinale] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<{ triggerFinale: () => void }>(null);

  const handleNextStep = useCallback(() => {
    if (isTransitioning || currentStep >= STEPS_DATA.length - 1) return;

    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }
    });

    tl.to(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.4,
      ease: 'power3.in'
    });
  }, [currentStep, isTransitioning]);

  const handleFinale = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsFinale(true);
    
    gsap.to('.celebrate-btn', { opacity: 0, duration: 0.5, onComplete: () => {
       gsap.to('.celebrate-btn', { display: 'none' });
    }});

    setTimeout(() => {
      gsap.fromTo('.final-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }, 500);
    
    setTimeout(() => {
      if (heartsRef.current) {
        heartsRef.current.triggerFinale();
      }
      runConfetti();
    }, 1000);

  }, [isTransitioning]);

  useEffect(() => {
    if (cardRef.current && !isFinale) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, scale: 0.95, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [currentStep, isFinale]);

  const runConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Emoji confetti
    const emoji = ['❤️', '💖', '✨'];
    const shootEmoji = () => {
        if (Date.now() > animationEnd) return;
        window.confetti({
            particleCount: 3,
            startVelocity: 60,
            spread: 180,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            shapes: ['text'],
            text: emoji[Math.floor(Math.random() * emoji.length)],
            scalar: 2 + Math.random() * 2
        });
        setTimeout(shootEmoji, 200 + Math.random() * 300);
    };
    shootEmoji();
  };

  const stepData: StepContent = STEPS_DATA[currentStep];

  return (
    <main className="relative w-full h-screen flex items-center justify-center p-4 sm:p-8 font-sans text-gray-200">
      <AuroraBackground />
      <ThreeHearts ref={heartsRef} />
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <ProgressBar currentStep={currentStep} totalSteps={STEPS_DATA.length} />
        
        <div ref={cardRef} className="w-full">
            <StepCard stepData={stepData} onNext={currentStep === STEPS_DATA.length - 1 ? handleFinale : handleNextStep} isFinale={isFinale}/>
        </div>
      </div>
    </main>
  );
};

export default App;