import React from 'react';
import useSearch from '../useHook/useSearch';
const RecentSearchContainer = ({ onRecentClick }) => {
  const { recentSearches} = useSearch();

  const handleSearch = (searchTerm) => {
    // Trigger search with the selected recent search term
    onRecentClick(searchTerm);
  };
  return (
    <div className="recent-search">
      <h3>Recent Searches</h3>
        {recentSearches.length === 0 && <li>No recent search</li>}
      <ul>
        {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleSearch(search)}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchContainer;
