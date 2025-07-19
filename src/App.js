import React,{useRef} from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer';
import RecentSearchContainer from './components/RecentSearchContainer';
import PlayerContainer from './components/PlayerContainer';

function App() {
    const searchRef = useRef();

  const handleRecentClick = (searchTerm) => {
    if (searchRef.current) {
      searchRef.current.setSearchTextAndRun(searchTerm);
    }
  };

  return (
    <div className="container">
      
      <div className="column search-section">
      <SearchContainer ref={searchRef} />
      </div>

      <div className="column result">
        <PlayerContainer/>
      </div>

      <div className="column recent">
        <RecentSearchContainer onRecentClick={handleRecentClick} />
      </div>

    </div>
  );
}

export default App;
