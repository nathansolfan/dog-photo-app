import { useEffect, useState } from 'react';
import './App.css';
import DogPicture from './components/DogPicture';
import Favorites from './components/Favorites';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('dog');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (photo) => {
    const updatedFavorites = [...favorites, photo];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.success('🐶 Your new favorite has been saved!', { autoClose: 3000 });
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
    toast.success('Favorites Cleared!', { autoClose: 3000 });
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <h1>Dog Photo App</h1>
      <div>
        {activeTab === 'favorites' ? (
          <>
            {favorites.length > 0 && (
              <button onClick={clearFavorites} style={{ marginLeft: '10px' }}>
                Clear Favorites
              </button>
            )}
            <button onClick={() => setActiveTab('dog')} style={{ marginLeft: '10px' }}>
              Fetch a New Friend!
            </button>
          </>
        ) : (
          <button onClick={() => setActiveTab('favorites')}>
            Favorites
          </button>
        )}
      </div>
      <div>
        {activeTab === 'dog' ? (
          <DogPicture addFavorite={addFavorite} />
        ) : (
          <Favorites favorites={favorites} />
        )}
      </div>
    </div>
  );
}

export default App;
