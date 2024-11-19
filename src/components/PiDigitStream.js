// src/components/PiDigitStream.js
import React, { useEffect, useRef } from 'react';

export const PiDigitStream = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // PI digits string - extend as needed
    const PI_DIGITS = "3.14159265358979323846264338327950288419716939937510";
    
    let particles = [];
    const particleCount = 100;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 0.5 + Math.random() * 1.5;
        this.digit = PI_DIGITS[Math.floor(Math.random() * PI_DIGITS.length)];
        this.size = 10 + Math.random() * 10;
        this.opacity = Math.random() * 0.5;
      }
      
      update() {
        this.y += this.speed;
        this.opacity -= 0.002;
        
        if (this.y > canvas.height || this.opacity <= 0) {
          this.reset();
          this.y = -10;
        }
      }
      
      draw() {
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = `rgba(64, 156, 255, ${this.opacity})`;
        ctx.fillText(this.digit, this.x, this.y);
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
    />
  );
};

export default PiDigitStream;