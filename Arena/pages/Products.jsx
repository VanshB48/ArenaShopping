import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei';
import { useControls } from 'leva';
import Models from './models.json';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const [cache, setCache] = useState({});

  if (!cache[url]) {
    const annotations = [];
    scene.traverse((o) => {
      if (o.userData.prop) {
        annotations.push(
          <Html key={o.uuid} position={o.position} distanceFactor={5}>
            {/* Adjust distanceFactor as needed */}
            <div className="annotation">{o.userData.prop}</div>
          </Html>
        );
      }
    });
    console.log('Caching JSX for url ' + url);
    setCache({ ...cache, [url]: <primitive object={scene}>{annotations}</primitive> });
  }

  return cache[url];
}

export default function Products() {
  const { model } = useControls({
    model: { value: 'hammer', options: Object.keys(Models) }
  });

  const handleBack = () => {
    window.location.href = 'http://localhost:3000';
  };

  const handleStartAR = () => {
    console.log('Selected Model:', model);
    const selectedModelUrl = Models[model];
    console.log('Selected Model URL:', selectedModelUrl);
    const arWindow = window.open('http://localhost:5000/', '_blank');
    arWindow.postMessage({ modelUrl: selectedModelUrl }, 'http://localhost:5000');
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
          transition: 'background-color 0.3s'
        }}
        onClick={handleBack}
      >
        Back
      </button>
      <button
        style={{
          padding: '10px 20px',
          margin: '10px',
          fontSize: '18px',
          backgroundColor: '#f57c00',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onClick={handleStartAR}
      >
        Start AR for {model}
      </button>
      <div style={{ width: '100%', height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 }}>
          <Environment files="img/industrial_sunset_puresky_4k.hdr" background />
          <group scale={[12, 12, 12]}>
            <Model url={Models[model]} />
          </group>
          <OrbitControls autoRotate />
        </Canvas>
      </div>
      <span id="info">The {model.replace(/([A-Z])/g, ' $1').toLowerCase()} is selected.</span>
    </div>
  );
}
