import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import ShoeCustomizer from '../pages/ShoeCustomizer';
import Products from '../pages/Products';

const Root = () => {
  const [showApp, setShowApp] = useState(false);

  return (
    <div>
      {showApp === false && <center><h2>Arena Shopping</h2></center>}
      <StrictMode>
        <div className="app-container">
          {!showApp && (
            <div className="button-container">
              <button className="app-button" onClick={() => setShowApp(true)}>
                Shoe Customizer
              </button>
              <button className="app-button" onClick={() => setShowApp('products')}>
                Products
              </button>
            </div>
          )}
          {showApp === 'products' && (
            <div className="app-content">
              <Products />
            </div>
          )}
          {showApp === true && (
            <div className="app-content">
              <ShoeCustomizer />
            </div>
          )}
        </div>
      </StrictMode>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
