import React from 'react';

const UserTileView = ({ results, handleSelect }) => {
  return (
    <ul className="results tile-grid">
      {results.map((user, i) => (
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
    </ul>
  );
};


  export default UserTileView;
