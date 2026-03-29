import React, { useState } from 'react';

export const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Escribe el nombre de una ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
        className="search-input"
      />
      <button type="submit" disabled={isLoading} className="search-button">
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
};
