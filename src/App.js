import React,{useRef} from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer';
import RecentSearchContainer from './components/RecentSearchContainer';
import ResultContainer from './components/ResultContainer';

function App() {
    const searchRef = useRef();

  const handleRecentClick = (searchTerm) => {
    if (searchRef.current) {
      searchRef.current.setSearchTextAndRun(searchTerm);
    }
  };

  return (
    <div className="container">
      
      {/* Left: Search */}
      <div className="column search-section">
      <SearchContainer ref={searchRef} />
      </div>

      {/* Center: Result */}
      <div className="column result">
        <ResultContainer/>
      </div>

      {/* Right: Recent Searches */}
      <div className="column recent">
        <RecentSearchContainer onRecentClick={handleRecentClick} />
      </div>

    </div>
  );
}

export default App;
