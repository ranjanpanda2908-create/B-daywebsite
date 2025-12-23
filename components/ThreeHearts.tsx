
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export const ThreeHearts = forwardRef((props, ref) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const heartsRef = useRef<THREE.Mesh[]>([]);
    
    useImperativeHandle(ref, () => ({
        triggerFinale() {
            heartsRef.current.forEach(heart => {
                gsap.to(heart.position, {
                    x: (Math.random() - 0.5) * 30,
                    y: 20 + Math.random() * 10,
                    z: (Math.random() - 0.5) * 20,
                    duration: 4,
                    ease: 'power2.inOut',
                });
                gsap.to(heart.rotation, {
                    x: Math.random() * Math.PI * 4,
                    y: Math.random() * Math.PI * 4,
                    z: Math.random() * Math.PI * 4,
                    duration: 4,
                    ease: 'power2.inOut',
                });
                if (heart.material instanceof THREE.MeshStandardMaterial) {
                    gsap.to(heart.material, {
                        opacity: 0,
                        duration: 4,
                        ease: 'power2.inOut',
                    });
                }
            });
        }
    }));

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        const heartShape = new THREE.Shape();
        heartShape.moveTo(2.5, 2.5);
        heartShape.bezierCurveTo(2.5, 2.5, 2, 0, 0, 0);
        heartShape.bezierCurveTo(-3, 0, -3, 3.5, -3, 3.5);
        heartShape.bezierCurveTo(-3, 5.5, -1, 7.7, 2.5, 9.5);
        heartShape.bezierCurveTo(6, 7.7, 8, 5.5, 8, 3.5);
        heartShape.bezierCurveTo(8, 3.5, 8, 0, 5, 0);
        heartShape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);

        const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.5, bevelThickness: 0.5 };
        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        const colors = [0xff0055, 0xff4477, 0xff6699, 0xdd2255];
        
        for (let i = 0; i < 25; i++) {
            const material = new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                metalness: 0.5,
                roughness: 0.6,
                transparent: true,
                opacity: 0.8,
            });
            const heart = new THREE.Mesh(geometry, material);
            
            heart.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 10 - 5
            );
            
            heart.scale.setScalar(0.1 + Math.random() * 0.15);
            heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            
            scene.add(heart);
            heartsRef.current.push(heart);
        }

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            heartsRef.current.forEach((heart, i) => {
                heart.rotation.y += 0.001;
                heart.position.y += Math.sin(elapsedTime + i) * 0.01;
            });

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
});
