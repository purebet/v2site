// components/CustomCursor.jsx
'use client';

import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [trailPositions, setTrailPositions] = useState(Array(10).fill({ x: 0, y: 200 }));
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCurrentPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setTrailPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions.pop();
        newPositions.unshift(currentPosition);
        return newPositions;
      });
    }, 0); // Adjust the interval for smoother or more delayed trailing

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [currentPosition]);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: `${currentPosition.x}px`, top: `${currentPosition.y}px` }}
      />
      {trailPositions.map((position, index) => (
        <div
          key={index}
          className="trail-image"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
