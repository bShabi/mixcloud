import React, { useImperativeHandle, useRef, forwardRef, useState, useEffect,Fragment } from 'react';
import useSearch from '../useHook/useSearch';
import useView from '../useHook/useView';
import UserListView from '../utils/UserListView';
import UserTileView from '../utils/UserTileView';

const SearchContainer = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [input, setInput] = useState('');
  const {
    results,
    loading,
    error,
    hasMore,
    search,
    loadMore,
    restResult,
    selectArtist
  } = useSearch();
  const {viewMode,setViewMode} = useView();

  useEffect(() => { 
      if (input.length === 0) 
      restResult();
  }, [input,restResult]);


  const handleSearch = () => {
    if(input.trim() === '') 
      return;
    search(input);
  };

  const handleSelect = (user) => {
    selectArtist(user);
  };
  const setSearchTextAndRun = (searchTerm) => {
    setInput(searchTerm);
    search(searchTerm);
  };

  useImperativeHandle(ref, () => ({
    setSearchTextAndRun,
  }));

  return (
    <Fragment> 
      <div className="search-box">
        <input
         className="search-input"
          type="text"
          placeholder="Search artist..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        />
        <button onClick={handleSearch} disabled={loading}>Search</button>
      </div>
  {loading ? (
    <p>Loading...</p>
  ) : viewMode === 'list' ? (
    <UserListView results={results} handleSelect={handleSelect} />
  ) : (
    <UserTileView results={results} handleSelect={handleSelect} />  
  )}
  {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="search-footer">
        {hasMore && !loading && <i className="fas fa-arrow-right" onClick={loadMore}></i>}
        <button
          onClick={() => setViewMode('list')}
          title="List View"
          className={viewMode === 'list' ? 'active' : ''}>
          <i className="fas fa-list"></i>
        </button>

        <button
          onClick={() => setViewMode('tile')}
          title="Tile View"
          className={viewMode === 'tile' ? 'active' : ''}>
          <i className="fas fa-th-large"></i>
        </button>
      </div>
    </Fragment>
  );
});

export default SearchContainer;
