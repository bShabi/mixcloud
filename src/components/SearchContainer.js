import React, { useImperativeHandle, useRef, forwardRef, useState, useEffect,Fragment } from 'react';
import useSearch from '../useHook/useSearch';
import useView from '../useHook/useView';
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

  useImperativeHandle(ref, () => ({
    setSearchTextAndRun: (searchTerm) => {
      setInput(searchTerm);
      search(searchTerm);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
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
  <ul className="results list">
    {results.map((user, idx) => (
      <li key={idx} className="result-item" onClick={() => handleSelect(user)}>
        <img
          src={user.pictures?.thumbnail}
          alt={user.name}
          width={30}
          height={30}
          style={{
            borderRadius: '50%',
            verticalAlign: 'middle',
            marginRight: '8px',
          }}
        />
        {user.user.name}
      </li>
    ))}
  </ul>
) : (
  <div className="results tile">
    {results.reduce((rows, user, idx) => {
      if (idx % 2 === 0) {
        rows.push([user]);
      } else {
        rows[rows.length - 1].push(user);
      }
      return rows;
    }, []).map((row, rowIndex) => (
      <div key={rowIndex} className="tile-row">
        {row.map((user, i) => (
          <li key={i} className="tile-item" onClick={() => handleSelect(user)}>
            <img
              src={user.pictures?.thumbnail}
              alt={user.name}
              width={30}
              height={30}
              style={{
                borderRadius: '50%',
                marginBottom: '4px',
              }}
            />
            <span>{user.user.name}</span>
          </li>
        ))}
      </div>
    ))}
  </div>
)}
  {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="search-footer">
        {hasMore && !loading && <i className="fas fa-arrow-right" onClick={loadMore}></i>}
        <button onClick={() => setViewMode('list')} title="List View">
            <i className="fas fa-list"></i>
        </button>
        <button onClick={() => setViewMode('tile')} title="Tile View">
            <i className="fas fa-th-large"></i>
        </button>
      </div>
    </Fragment>
  );
});

export default SearchContainer;
