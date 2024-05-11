import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Model } from './Shoe';

export default function ShoeCustomizer() {
  console.log("in app");
  
  const handleBack = () => {
    window.location.href = '/'; // Adjust the path as needed
  };

  return (
    <div style={{ width: '90vw', height: '90vh' }}>
      <button
  style={{
    padding: '10px 20px',
    margin: '10px',
    fontSize: '18px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }}
  onClick={handleBack}
>
  Back
</button>
      <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
        <Environment preset="forest" />
        <Model />
        <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}
